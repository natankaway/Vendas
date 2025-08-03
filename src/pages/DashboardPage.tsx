import { useEffect, useState } from 'react'
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  CubeIcon, 
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import type { DashboardStats } from '../types'

// Mock data - in real app this would come from API
const mockStats: DashboardStats = {
  vendasHoje: 15,
  vendasMes: 342,
  faturamentoHoje: 2840.50,
  faturamentoMes: 45672.30,
  produtosBaixoEstoque: 8,
  clientesTotal: 156
}

const statsCards = [
  {
    title: 'Vendas Hoje',
    value: mockStats.vendasHoje,
    change: '+12%',
    changeType: 'positive' as const,
    icon: ShoppingCartIcon,
    format: 'number'
  },
  {
    title: 'Faturamento Hoje',
    value: mockStats.faturamentoHoje,
    change: '+8%',
    changeType: 'positive' as const,
    icon: CurrencyDollarIcon,
    format: 'currency'
  },
  {
    title: 'Vendas do Mês',
    value: mockStats.vendasMes,
    change: '+15%',
    changeType: 'positive' as const,
    icon: ShoppingCartIcon,
    format: 'number'
  },
  {
    title: 'Faturamento do Mês',
    value: mockStats.faturamentoMes,
    change: '+22%',
    changeType: 'positive' as const,
    icon: CurrencyDollarIcon,
    format: 'currency'
  },
  {
    title: 'Produtos Baixo Estoque',
    value: mockStats.produtosBaixoEstoque,
    change: '-3',
    changeType: 'negative' as const,
    icon: CubeIcon,
    format: 'number'
  },
  {
    title: 'Total de Clientes',
    value: mockStats.clientesTotal,
    change: '+5',
    changeType: 'positive' as const,
    icon: UsersIcon,
    format: 'number'
  }
]

export function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const formatValue = (value: number, format: string) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    }
    return value.toString()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe o desempenho do seu negócio
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe o desempenho do seu negócio
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatValue(card.value, card.format)}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                {card.changeType === 'positive' ? (
                  <ArrowUpIcon className="h-3 w-3 text-success-600" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-danger-600" />
                )}
                <span className={`font-medium ${
                  card.changeType === 'positive' 
                    ? 'text-success-600' 
                    : 'text-danger-600'
                }`}>
                  {card.change}
                </span>
                <span className="text-gray-500">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>
              Últimas vendas realizadas hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div>
                    <p className="font-medium">Venda #{String(i + 1).padStart(6, '0')}</p>
                    <p className="text-sm text-gray-500">Cliente {i + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatValue(Math.random() * 500 + 50, 'currency')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>
              Ranking dos produtos mais vendidos este mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'].map((produto, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                      {i + 1}
                    </span>
                    <p className="font-medium">{produto}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{50 - i * 8} vendas</p>
                    <p className="text-sm text-gray-500">
                      {formatValue((50 - i * 8) * 25.90, 'currency')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}