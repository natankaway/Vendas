-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_nivel AS ENUM ('Administrador', 'Funcionário');
CREATE TYPE venda_status AS ENUM ('em_andamento', 'finalizada', 'cancelada');
CREATE TYPE pagamento_tipo AS ENUM ('dinheiro', 'cartao_debito', 'cartao_credito', 'pix', 'outros');

-- Empresas (Multi-tenant support)
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  logo_url TEXT,
  configuracoes JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  nivel user_nivel NOT NULL DEFAULT 'Funcionário',
  cargo TEXT,
  telefone TEXT,
  empresa_id UUID REFERENCES empresas(id),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categorias de produtos
CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  descricao TEXT,
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Produtos
CREATE TABLE produtos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  descricao TEXT,
  codigo_barras TEXT,
  marca TEXT,
  categoria_id UUID REFERENCES categorias(id),
  preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
  custo DECIMAL(10,2) DEFAULT 0 CHECK (custo >= 0),
  estoque INTEGER DEFAULT 0 CHECK (estoque >= 0),
  estoque_minimo INTEGER DEFAULT 0,
  unidade TEXT DEFAULT 'UN',
  imagem_url TEXT,
  ativo BOOLEAN DEFAULT true,
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  email TEXT,
  cpf_cnpj TEXT,
  telefone TEXT,
  endereco JSONB DEFAULT '{}',
  observacoes TEXT,
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendas
CREATE TABLE vendas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero_venda TEXT NOT NULL,
  cliente_id UUID REFERENCES clientes(id),
  vendedor_id UUID REFERENCES profiles(id) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  desconto DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  forma_pagamento pagamento_tipo NOT NULL,
  status venda_status DEFAULT 'finalizada',
  observacoes TEXT,
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Itens de venda
CREATE TABLE venda_itens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venda_id UUID REFERENCES vendas(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES produtos(id),
  produto_nome TEXT NOT NULL, -- Snapshot do nome na hora da venda
  produto_preco DECIMAL(10,2) NOT NULL, -- Snapshot do preço na hora da venda
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Movimentações de estoque
CREATE TABLE estoque_movimentacoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id UUID REFERENCES produtos(id),
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida', 'ajuste')),
  quantidade INTEGER NOT NULL,
  quantidade_anterior INTEGER NOT NULL,
  quantidade_nova INTEGER NOT NULL,
  motivo TEXT,
  usuario_id UUID REFERENCES profiles(id),
  venda_id UUID REFERENCES vendas(id), -- Quando aplicável
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs de auditoria
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tabela TEXT NOT NULL,
  operacao TEXT NOT NULL CHECK (operacao IN ('INSERT', 'UPDATE', 'DELETE')),
  registro_id UUID NOT NULL,
  dados_antigos JSONB,
  dados_novos JSONB,
  usuario_id UUID REFERENCES profiles(id),
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices para melhor performance
CREATE INDEX idx_produtos_empresa ON produtos(empresa_id);
CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_vendas_empresa ON vendas(empresa_id);
CREATE INDEX idx_vendas_vendedor ON vendas(vendedor_id);
CREATE INDEX idx_vendas_data ON vendas(created_at);
CREATE INDEX idx_venda_itens_venda ON venda_itens(venda_id);
CREATE INDEX idx_venda_itens_produto ON venda_itens(produto_id);
CREATE INDEX idx_clientes_empresa ON clientes(empresa_id);
CREATE INDEX idx_estoque_movimentacoes_produto ON estoque_movimentacoes(produto_id);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_empresas_updated_at BEFORE UPDATE ON empresas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendas_updated_at BEFORE UPDATE ON vendas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para gerar número de venda automaticamente
CREATE OR REPLACE FUNCTION generate_numero_venda()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
    empresa_prefix TEXT;
BEGIN
    -- Busca o próximo número para a empresa
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_venda FROM '[0-9]+$') AS INTEGER)), 0) + 1
    INTO next_number
    FROM vendas 
    WHERE empresa_id = NEW.empresa_id;
    
    -- Busca o prefixo da empresa ou usa padrão
    SELECT COALESCE(configuracoes->>'prefixo_venda', 'VEN')
    INTO empresa_prefix
    FROM empresas 
    WHERE id = NEW.empresa_id;
    
    -- Gera o número da venda
    NEW.numero_venda = empresa_prefix || '-' || LPAD(next_number::TEXT, 6, '0');
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_numero_venda_trigger 
    BEFORE INSERT ON vendas 
    FOR EACH ROW 
    WHEN (NEW.numero_venda IS NULL OR NEW.numero_venda = '')
    EXECUTE FUNCTION generate_numero_venda();

-- Trigger para movimentação de estoque nas vendas
CREATE OR REPLACE FUNCTION handle_venda_estoque()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Reduz estoque quando item é adicionado
        UPDATE produtos 
        SET estoque = estoque - NEW.quantidade
        WHERE id = NEW.produto_id;
        
        -- Registra movimentação
        INSERT INTO estoque_movimentacoes (
            produto_id, tipo, quantidade, quantidade_anterior, quantidade_nova, 
            motivo, venda_id, empresa_id
        )
        SELECT 
            NEW.produto_id, 'saida', NEW.quantidade, 
            p.estoque + NEW.quantidade, p.estoque,
            'Venda #' || v.numero_venda,
            NEW.venda_id, v.empresa_id
        FROM produtos p, vendas v
        WHERE p.id = NEW.produto_id AND v.id = NEW.venda_id;
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER handle_venda_estoque_trigger 
    AFTER INSERT ON venda_itens 
    FOR EACH ROW 
    EXECUTE FUNCTION handle_venda_estoque();