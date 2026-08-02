import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  demoRegistrar, demoLogin, demoGetSession, demoLogout,
  type DemoUser
} from '@/services/demoBackend'

interface AuthContextType {
  user: DemoUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName?: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restaurar sesión al cargar
  useEffect(() => {
    const session = demoGetSession()
    setUser(session)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      const u = await demoLogin(email, password)
      setUser(u)
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
      throw err
    }
  }

  const register = async (email: string, password: string, displayName?: string) => {
    setError(null)
    try {
      const u = await demoRegistrar(email, password, displayName)
      setUser(u)
    } catch (err: any) {
      setError(err.message || 'Error al registrar')
      throw err
    }
  }

  const logout = () => {
    demoLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
