import type { Database } from './database'

// Database table types
export type Empresa = Database['public']['Tables']['empresas']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Categoria = Database['public']['Tables']['categorias']['Row']
export type Produto = Database['public']['Tables']['produtos']['Row']
export type Cliente = Database['public']['Tables']['clientes']['Row']
export type Venda = Database['public']['Tables']['vendas']['Row']
export type VendaItem = Database['public']['Tables']['venda_itens']['Row']
export type EstoqueMovimentacao = Database['public']['Tables']['estoque_movimentacoes']['Row']

// Insert types
export type EmpresaInsert = Database['public']['Tables']['empresas']['Insert']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type CategoriaInsert = Database['public']['Tables']['categorias']['Insert']
export type ProdutoInsert = Database['public']['Tables']['produtos']['Insert']
export type ClienteInsert = Database['public']['Tables']['clientes']['Insert']
export type VendaInsert = Database['public']['Tables']['vendas']['Insert']
export type VendaItemInsert = Database['public']['Tables']['venda_itens']['Insert']

// Update types
export type EmpresaUpdate = Database['public']['Tables']['empresas']['Update']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type CategoriaUpdate = Database['public']['Tables']['categorias']['Update']
export type ProdutoUpdate = Database['public']['Tables']['produtos']['Update']
export type ClienteUpdate = Database['public']['Tables']['clientes']['Update']
export type VendaUpdate = Database['public']['Tables']['vendas']['Update']

// Enum types
export type UserNivel = Database['public']['Enums']['user_nivel']
export type VendaStatus = Database['public']['Enums']['venda_status']
export type PagamentoTipo = Database['public']['Enums']['pagamento_tipo']

// Extended types with relationships
export interface ProdutoWithCategoria extends Produto {
  categoria?: Categoria
}

export interface VendaWithItems extends Venda {
  venda_itens: VendaItem[]
  cliente?: Cliente
  vendedor: Profile
}

export interface VendaWithDetails extends Venda {
  venda_itens: (VendaItem & { produto?: Produto })[]
  cliente?: Cliente
  vendedor: Profile
}

// Cart item type for POS
export interface CartItem {
  produto: Produto
  quantidade: number
  subtotal: number
}

// Dashboard analytics types
export interface DashboardStats {
  vendasHoje: number
  vendasMes: number
  faturamentoHoje: number
  faturamentoMes: number
  produtosBaixoEstoque: number
  clientesTotal: number
}

export interface VendaPorDia {
  data: string
  vendas: number
  faturamento: number
}

export interface ProdutoMaisVendido {
  produto_id: string
  produto_nome: string
  quantidade_vendida: number
  faturamento: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  nome: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProdutoForm {
  nome: string
  descricao?: string
  codigo_barras?: string
  marca?: string
  categoria_id?: string
  preco: number
  custo?: number
  estoque: number
  estoque_minimo?: number
  unidade: string
  ativo: boolean
}

export interface ClienteForm {
  nome: string
  email?: string
  cpf_cnpj?: string
  telefone?: string
  endereco?: {
    cep?: string
    rua?: string
    numero?: string
    complemento?: string
    bairro?: string
    cidade?: string
    estado?: string
  }
  observacoes?: string
}

export interface VendaForm {
  cliente_id?: string
  forma_pagamento: PagamentoTipo
  desconto?: number
  observacoes?: string
  itens: {
    produto_id: string
    quantidade: number
    preco: number
  }[]
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  totalPages: number
}

// Filter and sorting types
export interface TableFilters {
  search?: string
  categoria_id?: string
  ativo?: boolean
  dateFrom?: string
  dateTo?: string
}

export interface TableSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface TablePagination {
  page: number
  limit: number
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
  badge?: number
}

// Modal types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

// Error types
export interface AppError {
  message: string
  code?: string
  details?: any
}

export interface FieldError {
  field: string
  message: string
}