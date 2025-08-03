import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Preencha todos os campos')
      return
    }

    if (isSignUp && !name) {
      toast.error('Nome é obrigatório')
      return
    }

    setLoading(true)

    try {
      const result = isSignUp 
        ? await signUp(email, password, name)
        : await signIn(email, password)

      if (result.error) {
        toast.error(result.error)
      } else {
        if (isSignUp) {
          toast.success('Conta criada com sucesso! Verifique seu email.')
        } else {
          toast.success('Login realizado com sucesso!')
        }
      }
    } catch (error) {
      toast.error('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <BuildingStorefrontIcon className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Sistema de Vendas
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Crie sua conta' : 'Entre em sua conta'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Criar Conta' : 'Entrar'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Preencha os dados para criar sua conta'
                : 'Digite suas credenciais para acessar o sistema'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Input
                  label="Nome completo"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              )}
              
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
              
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
              />

              <Button
                type="submit"
                className="w-full"
                loading={loading}
              >
                {isSignUp ? 'Criar Conta' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-950 text-gray-500">
                    ou
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {isSignUp 
                    ? 'Já tem uma conta? Entre aqui'
                    : 'Não tem uma conta? Cadastre-se'
                  }
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Sistema de Vendas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}