# Sistema de Vendas Modernizado

## 🚀 Visão Geral

Sistema de vendas moderno construído com **React + TypeScript** e **Supabase**, oferecendo uma solução completa para gestão de vendas, produtos, clientes e relatórios.

### ✨ Principais Características

- **🔄 Backend Moderno**: Migração completa do Firebase para Supabase
- **🎨 UI/UX Moderna**: Interface responsiva com Tailwind CSS e componentes reutilizáveis
- **🔐 Autenticação Robusta**: Sistema de auth com RLS (Row Level Security)
- **📊 Dashboard Analytics**: Métricas em tempo real e relatórios
- **🛒 PDV Completo**: Sistema de Ponto de Venda intuitivo
- **📱 PWA Ready**: Aplicação Progressive Web App
- **🌙 Dark Mode**: Suporte a tema escuro/claro
- **📱 Responsivo**: Design mobile-first

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca para UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool moderna
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Hot Toast** - Notificações
- **Heroicons** - Ícones
- **Recharts** - Gráficos

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Edge Functions
  - Storage

### Funcionalidades Implementadas

#### ✅ Sistema de Autenticação
- Login/Logout seguro
- Registro de novos usuários
- Contexto de autenticação
- Proteção de rotas
- Recuperação de senha

#### ✅ Dashboard
- Estatísticas de vendas em tempo real
- Cards de métricas principais
- Produtos com estoque baixo
- Vendas recentes
- Produtos mais vendidos

#### ✅ Gestão de Produtos
- Listagem completa de produtos
- Sistema de busca e filtros
- Indicadores de estoque
- Status de disponibilidade
- Categorização

#### ✅ Ponto de Venda (PDV)
- Interface intuitiva para vendas
- Carrinho de compras
- Múltiplas formas de pagamento
- Controle de estoque em tempo real
- Finalização de vendas

#### ✅ UI/UX
- Design system consistente
- Componentes reutilizáveis (Button, Input, Card)
- Layout responsivo com sidebar
- Tema escuro/claro
- Loading states e animações

## 🗄️ Arquitetura do Banco

### Tabelas Principais

- **empresas** - Multi-tenant support
- **profiles** - Perfis de usuários
- **categorias** - Categorias de produtos
- **produtos** - Catálogo de produtos
- **clientes** - Base de clientes
- **vendas** - Transações de vendas
- **venda_itens** - Itens das vendas
- **estoque_movimentacoes** - Histórico de estoque

### Recursos de Segurança

- **Row Level Security (RLS)** - Isolamento por empresa
- **Triggers** - Automação de processos
- **Functions** - Lógica de negócio no banco
- **Policies** - Controle granular de acesso

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório
```bash
git clone https://github.com/natankaway/Vendas.git
cd Vendas
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute os scripts SQL na seguinte ordem:
   - `config/database/schema.sql`
   - `config/database/policies.sql` 
   - `config/database/seed.sql` (opcional, para dados de teste)

### 4. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

Edite o `.env.local` com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 5. Execute o projeto
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:5173`

### 6. Build para produção
```bash
npm run build
npm run preview
```

## 📱 Funcionalidades por Página

### 🏠 Dashboard
- Visão geral das vendas
- Métricas do dia e mês
- Alertas de estoque baixo
- Ranking de produtos

### 🛒 Vendas (PDV)
- Interface de ponto de venda
- Busca de produtos
- Carrinho interativo
- Formas de pagamento
- Finalização de vendas

### 📦 Produtos
- Catálogo completo
- Sistema de busca
- Indicadores visuais de estoque
- Ações de edição (em desenvolvimento)

### 👥 Clientes (Planejado)
- Cadastro de clientes
- Histórico de compras
- Dados de contato

### 📊 Relatórios (Planejado)
- Relatórios de vendas
- Análise de performance
- Exportação de dados

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
npm run format       # Formatação de código
```

## 🎨 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Button, Input, Card)
│   ├── forms/           # Formulários específicos
│   ├── charts/          # Componentes de gráficos
│   └── layout/          # Componentes de layout
├── hooks/               # Custom hooks
├── services/            # Serviços (Supabase, API)
├── utils/               # Funções utilitárias
├── types/               # Definições TypeScript
├── contexts/            # Contextos React
├── pages/               # Páginas/Views
├── styles/              # Estilos globais
└── tests/               # Testes

config/
├── supabase.ts          # Configuração Supabase
└── database/            # Scripts de banco
    ├── schema.sql       # Schema do banco
    ├── policies.sql     # Políticas RLS
    └── seed.sql         # Dados iniciais
```

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Gestão completa de produtos (CRUD)
- [ ] Módulo de clientes
- [ ] Relatórios avançados
- [ ] Configurações da empresa
- [ ] Sistema de notificações
- [ ] Integração com impressoras
- [ ] App mobile (React Native)
- [ ] API REST para integrações

### Melhorias Técnicas
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Monitoramento de performance
- [ ] Internacionalização (i18n)
- [ ] Cache inteligente
- [ ] Offline support

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📞 Suporte

Para dúvidas e suporte, entre em contato:
- GitHub Issues: [https://github.com/natankaway/Vendas/issues](https://github.com/natankaway/Vendas/issues)

---

**Desenvolvido com ❤️ usando React, TypeScript e Supabase**
