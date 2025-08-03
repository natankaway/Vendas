import { useState } from 'react'
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  ShoppingCartIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import type { CartItem } from '../types'
import toast from 'react-hot-toast'

// Mock products data
const mockProdutos = [
  {
    id: '1',
    nome: 'Smartphone XYZ',
    marca: 'TechBrand',
    preco: 899.99,
    estoque: 15,
    unidade: 'UN',
    ativo: true
  },
  {
    id: '2',
    nome: 'Camiseta Básica',
    marca: 'FashionBrand',
    preco: 39.90,
    estoque: 50,
    unidade: 'UN',
    ativo: true
  },
  {
    id: '3',
    nome: 'Fone de Ouvido',
    marca: 'AudioBrand',
    preco: 159.90,
    estoque: 25,
    unidade: 'UN',
    ativo: true
  },
  {
    id: '4',
    nome: 'Mouse Gamer',
    marca: 'TechBrand',
    preco: 129.90,
    estoque: 40,
    unidade: 'UN',
    ativo: true
  }
]

export function VendasPage() {
  const [produtos] = useState(mockProdutos)
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string>('dinheiro')

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(search.toLowerCase()) ||
    produto.marca.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (produto: typeof mockProdutos[0]) => {
    const existingItem = cart.find(item => item.produto.id === produto.id)
    
    if (existingItem) {
      if (existingItem.quantidade >= produto.estoque) {
        toast.error('Estoque insuficiente')
        return
      }
      
      setCart(prev => prev.map(item =>
        item.produto.id === produto.id
          ? { 
              ...item, 
              quantidade: item.quantidade + 1,
              subtotal: (item.quantidade + 1) * item.produto.preco
            }
          : item
      ))
    } else {
      const newItem: CartItem = {
        produto,
        quantidade: 1,
        subtotal: produto.preco
      }
      setCart(prev => [...prev, newItem])
    }
    
    toast.success(`${produto.nome} adicionado ao carrinho`)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const produto = produtos.find(p => p.id === productId)
    if (!produto) return

    if (quantity > produto.estoque) {
      toast.error('Estoque insuficiente')
      return
    }

    setCart(prev => prev.map(item =>
      item.produto.id === productId
        ? {
            ...item,
            quantidade: quantity,
            subtotal: quantity * item.produto.preco
          }
        : item
    ))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.produto.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0)
  }

  const handleFinalizeSale = () => {
    if (cart.length === 0) {
      toast.error('Adicione produtos ao carrinho')
      return
    }

    // Simulate sale completion
    toast.success('Venda finalizada com sucesso!')
    clearCart()
    setSearch('')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const paymentMethods = [
    { id: 'dinheiro', name: 'Dinheiro', icon: '💰' },
    { id: 'cartao_debito', name: 'Cartão Débito', icon: '💳' },
    { id: 'cartao_credito', name: 'Cartão Crédito', icon: '💳' },
    { id: 'pix', name: 'PIX', icon: '📱' },
  ]

  return (
    <div className="h-full flex gap-6">
      {/* Left Panel - Products */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ponto de Venda</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Selecione os produtos para adicionar à venda
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProdutos.map((produto) => (
            <Card key={produto.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {produto.nome}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {produto.marca}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-primary-600">
                        {formatPrice(produto.preco)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Estoque: {produto.estoque}
                      </p>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => addToCart(produto)}
                      disabled={produto.estoque === 0}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Cart */}
      <div className="w-96 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCartIcon className="h-5 w-5" />
              Carrinho ({cart.length} {cart.length === 1 ? 'item' : 'itens'})
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <ShoppingCartIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Carrinho vazio</p>
                <p className="text-sm">Adicione produtos para começar</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.produto.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.produto.nome}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatPrice(item.produto.preco)} cada
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.produto.id, item.quantidade - 1)}
                        >
                          <MinusIcon className="h-3 w-3" />
                        </Button>
                        
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantidade}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.produto.id, item.quantidade + 1)}
                        >
                          <PlusIcon className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.produto.id)}
                        >
                          <TrashIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatPrice(item.subtotal)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary-600">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="w-full"
                >
                  Limpar Carrinho
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        {cart.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5" />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPayment === method.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="text-primary-600"
                  />
                  <span className="text-lg">{method.icon}</span>
                  <span className="text-sm font-medium">{method.name}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Finalize Sale */}
        {cart.length > 0 && (
          <Button
            className="w-full"
            size="lg"
            onClick={handleFinalizeSale}
          >
            Finalizar Venda
          </Button>
        )}
      </div>
    </div>
  )
}