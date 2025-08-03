export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      empresas: {
        Row: {
          id: string
          nome: string
          cnpj: string | null
          logo_url: string | null
          configuracoes: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          cnpj?: string | null
          logo_url?: string | null
          configuracoes?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          cnpj?: string | null
          logo_url?: string | null
          configuracoes?: Json
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          nome: string
          email: string
          nivel: 'Administrador' | 'Funcionário'
          cargo: string | null
          telefone: string | null
          empresa_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nome: string
          email: string
          nivel?: 'Administrador' | 'Funcionário'
          cargo?: string | null
          telefone?: string | null
          empresa_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          email?: string
          nivel?: 'Administrador' | 'Funcionário'
          cargo?: string | null
          telefone?: string | null
          empresa_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categorias: {
        Row: {
          id: string
          nome: string
          descricao: string | null
          empresa_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string | null
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string | null
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      produtos: {
        Row: {
          id: string
          nome: string
          descricao: string | null
          codigo_barras: string | null
          marca: string | null
          categoria_id: string | null
          preco: number
          custo: number
          estoque: number
          estoque_minimo: number
          unidade: string
          imagem_url: string | null
          ativo: boolean
          empresa_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string | null
          codigo_barras?: string | null
          marca?: string | null
          categoria_id?: string | null
          preco: number
          custo?: number
          estoque?: number
          estoque_minimo?: number
          unidade?: string
          imagem_url?: string | null
          ativo?: boolean
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string | null
          codigo_barras?: string | null
          marca?: string | null
          categoria_id?: string | null
          preco?: number
          custo?: number
          estoque?: number
          estoque_minimo?: number
          unidade?: string
          imagem_url?: string | null
          ativo?: boolean
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clientes: {
        Row: {
          id: string
          nome: string
          email: string | null
          cpf_cnpj: string | null
          telefone: string | null
          endereco: Json
          observacoes: string | null
          empresa_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          email?: string | null
          cpf_cnpj?: string | null
          telefone?: string | null
          endereco?: Json
          observacoes?: string | null
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          email?: string | null
          cpf_cnpj?: string | null
          telefone?: string | null
          endereco?: Json
          observacoes?: string | null
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vendas: {
        Row: {
          id: string
          numero_venda: string
          cliente_id: string | null
          vendedor_id: string
          subtotal: number
          desconto: number
          total: number
          forma_pagamento: 'dinheiro' | 'cartao_debito' | 'cartao_credito' | 'pix' | 'outros'
          status: 'em_andamento' | 'finalizada' | 'cancelada'
          observacoes: string | null
          empresa_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          numero_venda?: string
          cliente_id?: string | null
          vendedor_id: string
          subtotal?: number
          desconto?: number
          total: number
          forma_pagamento: 'dinheiro' | 'cartao_debito' | 'cartao_credito' | 'pix' | 'outros'
          status?: 'em_andamento' | 'finalizada' | 'cancelada'
          observacoes?: string | null
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          numero_venda?: string
          cliente_id?: string | null
          vendedor_id?: string
          subtotal?: number
          desconto?: number
          total?: number
          forma_pagamento?: 'dinheiro' | 'cartao_debito' | 'cartao_credito' | 'pix' | 'outros'
          status?: 'em_andamento' | 'finalizada' | 'cancelada'
          observacoes?: string | null
          empresa_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      venda_itens: {
        Row: {
          id: string
          venda_id: string | null
          produto_id: string | null
          produto_nome: string
          produto_preco: number
          quantidade: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          venda_id?: string | null
          produto_id?: string | null
          produto_nome: string
          produto_preco: number
          quantidade: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          venda_id?: string | null
          produto_id?: string | null
          produto_nome?: string
          produto_preco?: number
          quantidade?: number
          subtotal?: number
          created_at?: string
        }
      }
      estoque_movimentacoes: {
        Row: {
          id: string
          produto_id: string | null
          tipo: string
          quantidade: number
          quantidade_anterior: number
          quantidade_nova: number
          motivo: string | null
          usuario_id: string | null
          venda_id: string | null
          empresa_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          produto_id?: string | null
          tipo: string
          quantidade: number
          quantidade_anterior: number
          quantidade_nova: number
          motivo?: string | null
          usuario_id?: string | null
          venda_id?: string | null
          empresa_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          produto_id?: string | null
          tipo?: string
          quantidade?: number
          quantidade_anterior?: number
          quantidade_nova?: number
          motivo?: string | null
          usuario_id?: string | null
          venda_id?: string | null
          empresa_id?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          tabela: string
          operacao: string
          registro_id: string
          dados_antigos: Json | null
          dados_novos: Json | null
          usuario_id: string | null
          empresa_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tabela: string
          operacao: string
          registro_id: string
          dados_antigos?: Json | null
          dados_novos?: Json | null
          usuario_id?: string | null
          empresa_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tabela?: string
          operacao?: string
          registro_id?: string
          dados_antigos?: Json | null
          dados_novos?: Json | null
          usuario_id?: string | null
          empresa_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_nivel: 'Administrador' | 'Funcionário'
      venda_status: 'em_andamento' | 'finalizada' | 'cancelada'
      pagamento_tipo: 'dinheiro' | 'cartao_debito' | 'cartao_credito' | 'pix' | 'outros'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}