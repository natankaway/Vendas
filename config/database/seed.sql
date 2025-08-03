-- Seed data for testing
-- Este arquivo deve ser executado após a criação do schema e policies

-- Criar empresa de teste
INSERT INTO empresas (id, nome, cnpj, configuracoes) VALUES 
('11111111-1111-1111-1111-111111111111', 'Empresa Teste', '12.345.678/0001-90', '{"prefixo_venda": "VEN"}');

-- Criar categorias de produtos
INSERT INTO categorias (id, nome, descricao, empresa_id) VALUES
('22222222-2222-2222-2222-222222222222', 'Eletrônicos', 'Produtos eletrônicos em geral', '11111111-1111-1111-1111-111111111111'),
('33333333-3333-3333-3333-333333333333', 'Roupas', 'Vestuário e acessórios', '11111111-1111-1111-1111-111111111111'),
('44444444-4444-4444-4444-444444444444', 'Casa e Jardim', 'Produtos para casa e jardim', '11111111-1111-1111-1111-111111111111'),
('55555555-5555-5555-5555-555555555555', 'Livros', 'Livros e materiais educativos', '11111111-1111-1111-1111-111111111111'),
('66666666-6666-6666-6666-666666666666', 'Esportes', 'Artigos esportivos', '11111111-1111-1111-1111-111111111111');

-- Criar produtos de teste
INSERT INTO produtos (id, nome, descricao, codigo_barras, marca, categoria_id, preco, custo, estoque, estoque_minimo, unidade, ativo, empresa_id) VALUES
('77777777-7777-7777-7777-777777777777', 'Smartphone XYZ', 'Smartphone Android 128GB', '7891234567890', 'TechBrand', '22222222-2222-2222-2222-222222222222', 899.99, 650.00, 15, 5, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('88888888-8888-8888-8888-888888888888', 'Camiseta Básica', 'Camiseta 100% algodão', '7891234567891', 'FashionBrand', '33333333-3333-3333-3333-333333333333', 39.90, 25.00, 50, 10, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('99999999-9999-9999-9999-999999999999', 'Fone de Ouvido Bluetooth', 'Fone wireless com cancelamento de ruído', '7891234567892', 'AudioBrand', '22222222-2222-2222-2222-222222222222', 159.90, 89.90, 25, 5, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Livro de JavaScript', 'Guia completo de JavaScript moderno', '9788534567890', 'EditTech', '55555555-5555-5555-5555-555555555555', 79.90, 45.00, 30, 5, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Tênis de Corrida', 'Tênis para corrida com amortecimento', '7891234567893', 'SportBrand', '66666666-6666-6666-6666-666666666666', 299.90, 180.00, 20, 3, 'PAR', true, '11111111-1111-1111-1111-111111111111'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Vaso Decorativo', 'Vaso de cerâmica para decoração', '7891234567894', 'HomeBrand', '44444444-4444-4444-4444-444444444444', 45.90, 22.00, 12, 2, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Notebook Gamer', 'Notebook para jogos com placa dedicada', '7891234567895', 'GamerBrand', '22222222-2222-2222-2222-222222222222', 2499.99, 1800.00, 8, 2, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Jaqueta Jeans', 'Jaqueta jeans unissex', '7891234567896', 'FashionBrand', '33333333-3333-3333-3333-333333333333', 89.90, 55.00, 18, 3, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Bola de Futebol', 'Bola oficial de futebol', '7891234567897', 'SportBrand', '66666666-6666-6666-6666-666666666666', 79.90, 45.00, 35, 5, 'UN', true, '11111111-1111-1111-1111-111111111111'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Mouse Gamer RGB', 'Mouse óptico com LED RGB', '7891234567898', 'TechBrand', '22222222-2222-2222-2222-222222222222', 129.90, 75.00, 40, 8, 'UN', true, '11111111-1111-1111-1111-111111111111');

-- Criar alguns produtos com estoque baixo para teste de alertas
INSERT INTO produtos (id, nome, descricao, preco, custo, estoque, estoque_minimo, categoria_id, empresa_id) VALUES
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Produto Estoque Baixo 1', 'Produto para teste de alerta', 29.90, 15.00, 2, 10, '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Produto Estoque Baixo 2', 'Produto para teste de alerta', 49.90, 25.00, 1, 5, '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111'),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Produto Estoque Baixo 3', 'Produto para teste de alerta', 19.90, 10.00, 3, 15, '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111');

-- Criar clientes de teste
INSERT INTO clientes (id, nome, email, cpf_cnpj, telefone, endereco, empresa_id) VALUES
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'João Silva', 'joao@email.com', '12345678901', '(11) 99999-1234', '{"cep": "01234-567", "rua": "Rua das Flores", "numero": "123", "bairro": "Centro", "cidade": "São Paulo", "estado": "SP"}', '11111111-1111-1111-1111-111111111111'),
('llllllll-llll-llll-llll-llllllllllll', 'Maria Santos', 'maria@email.com', '12345678902', '(11) 99999-5678', '{"cep": "01234-568", "rua": "Av. Paulista", "numero": "456", "bairro": "Bela Vista", "cidade": "São Paulo", "estado": "SP"}', '11111111-1111-1111-1111-111111111111'),
('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'Carlos Oliveira', 'carlos@email.com', '12345678903', '(11) 99999-9012', '{"cep": "01234-569", "rua": "Rua Augusta", "numero": "789", "bairro": "Consolação", "cidade": "São Paulo", "estado": "SP"}', '11111111-1111-1111-1111-111111111111'),
('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'Ana Costa', 'ana@email.com', '12345678904', '(11) 99999-3456', '{"cep": "01234-570", "rua": "Rua da Consolação", "numero": "321", "bairro": "República", "cidade": "São Paulo", "estado": "SP"}', '11111111-1111-1111-1111-111111111111'),
('oooooooo-oooo-oooo-oooo-oooooooooooo', 'Pedro Ferreira', 'pedro@email.com', '12345678905', '(11) 99999-7890', '{"cep": "01234-571", "rua": "Rua 25 de Março", "numero": "654", "bairro": "Centro", "cidade": "São Paulo", "estado": "SP"}', '11111111-1111-1111-1111-111111111111');

-- Nota: Para criar vendas de teste, primeiro seria necessário ter usuários criados no sistema de autenticação
-- As vendas serão criadas quando usuários reais começarem a usar o sistema

-- Comentários para guia de uso:
-- 1. Este arquivo deve ser executado após a criação do schema.sql e policies.sql
-- 2. Os IDs são fixos para facilitar testes
-- 3. A empresa de teste tem ID '11111111-1111-1111-1111-111111111111'
-- 4. Para criar vendas de teste, os usuários precisam estar autenticados
-- 5. Os produtos incluem alguns com estoque baixo para testar alertas