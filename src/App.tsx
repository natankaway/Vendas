import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/layout/Layout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProdutosPage } from './pages/ProdutosPage'
import { VendasPage } from './pages/VendasPage'
import './index.css'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Layout>{children}</Layout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      {/* Placeholder routes for other pages */}
      <Route path="/vendas" element={
        <ProtectedRoute>
          <VendasPage />
        </ProtectedRoute>
      } />
      
      <Route path="/produtos" element={
        <ProtectedRoute>
          <ProdutosPage />
        </ProtectedRoute>
      } />
      
      <Route path="/clientes" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <p>Página de clientes em desenvolvimento...</p>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
            <p>Página de relatórios em desenvolvimento...</p>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Configurações</h1>
            <p>Página de configurações em desenvolvimento...</p>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
