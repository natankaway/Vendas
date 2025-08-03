import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, CubeIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

// Mock data - in real app this would come from Supabase
const mockProdutos = [
  {
    id: '1',
    nome: 'Smartphone XYZ',
    marca: 'TechBrand',
    categoria: 'Eletrônicos',
    preco: 899.99,
    estoque: 15,
    estoque_minimo: 5,
    ativo: true
  },
  {
    id: '2',
    nome: 'Camiseta Básica',
    marca: 'FashionBrand',
    categoria: 'Roupas',
    preco: 39.90,
    estoque: 50,
    estoque_minimo: 10,
    ativo: true
  },
  {
    id: '3',
    nome: 'Fone de Ouvido Bluetooth',
    marca: 'AudioBrand',
    categoria: 'Eletrônicos',
    preco: 159.90,
    estoque: 25,
    estoque_minimo: 5,
    ativo: true
  },
  {
    id: '4',
    nome: 'Notebook Gamer',
    marca: 'GamerBrand',
    categoria: 'Eletrônicos',
    preco: 2499.99,
    estoque: 8,
    estoque_minimo: 2,
    ativo: true
  },
  {
    id: '5',
    nome: 'Produto Estoque Baixo',
    marca: 'TestBrand',
    categoria: 'Teste',
    preco: 29.90,
    estoque: 2,
    estoque_minimo: 10,
    ativo: true
  }
]

export function ProdutosPage() {
  const [produtos] = useState(mockProdutos)
  const [search, setSearch] = useState('')
  const [loading] = useState(false)

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(search.toLowerCase()) ||
    produto.marca.toLowerCase().includes(search.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(search.toLowerCase())
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getEstoqueStatus = (estoque: number, estoqueMinimo: number) => {
    if (estoque <= estoqueMinimo) {
      return { text: 'Baixo', color: 'text-danger-600 bg-danger-100' }
    } else if (estoque <= estoqueMinimo * 2) {
      return { text: 'Médio', color: 'text-warning-600 bg-warning-100' }
    } else {
      return { text: 'Alto', color: 'text-success-600 bg-success-100' }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produtos</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie o catálogo de produtos da sua loja
          </p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total de Produtos</CardDescription>
            <CardTitle className="text-2xl">{produtos.length}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Produtos Ativos</CardDescription>
            <CardTitle className="text-2xl">
              {produtos.filter(p => p.ativo).length}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Estoque Baixo</CardDescription>
            <CardTitle className="text-2xl text-danger-600">
              {produtos.filter(p => p.estoque <= p.estoque_minimo).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>
            {filteredProdutos.length} produtos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProdutos.map((produto) => {
                  const estoqueStatus = getEstoqueStatus(produto.estoque, produto.estoque_minimo)
                  
                  return (
                    <tr key={produto.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {produto.nome}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {produto.marca}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {produto.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatPrice(produto.preco)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {produto.estoque} un.
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Mín: {produto.estoque_minimo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${estoqueStatus.color}`}>
                          {estoqueStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredProdutos.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <CubeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
              <p className="text-sm">
                {search 
                  ? 'Tente ajustar os termos da busca'
                  : 'Comece adicionando seu primeiro produto'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}