import { useState } from 'react'
import type { ReactNode } from 'react'
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from '../ui/Button'
import type { NavItem } from '../../types'

interface LayoutProps {
  children: ReactNode
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Vendas', href: '/vendas', icon: ShoppingCartIcon },
  { name: 'Produtos', href: '/produtos', icon: CubeIcon },
  { name: 'Clientes', href: '/clientes', icon: UsersIcon },
  { name: 'Relatórios', href: '/relatorios', icon: ChartBarIcon },
  { name: 'Configurações', href: '/configuracoes', icon: CogIcon },
]

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile, signOut } = useAuth()
  const { setTheme, isDark } = useTheme()

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-200 dark:border-gray-700">
            <BuildingStorefrontIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Sistema Vendas
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = window.location.pathname === item.href
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary-600 px-2 py-0.5 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </a>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {profile?.nome?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {profile?.nome}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {profile?.nivel}
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="flex-1"
              >
                {isDark ? '☀️' : '🌙'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="flex-1"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Bars3Icon className="h-5 w-5" />
            </Button>
            
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {navigation.find(item => item.href === window.location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar close button */}
      {sidebarOpen && (
        <div className="fixed top-4 right-4 z-50 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="bg-white dark:bg-gray-800 shadow-lg"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}