import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { registrarUsuario, loginUsuario, getUserData, type FirebaseUser } from '@/services/firebase'

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName?: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'panoramix_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restaurar sesión desde localStorage al cargar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (saved.idToken && saved.uid) {
          // Verificar que el token sigue válido
          getUserData(saved.idToken).then(u => {
            if (u) setUser(u)
            else localStorage.removeItem(STORAGE_KEY)
            setLoading(false)
          }).catch(() => {
            localStorage.removeItem(STORAGE_KEY)
            setLoading(false)
          })
          return
        }
      }
    } catch {}
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      const u = await loginUsuario(email, password)
      setUser(u)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
      throw err
    }
  }

  const register = async (email: string, password: string, displayName?: string) => {
    setError(null)
    try {
      const u = await registrarUsuario(email, password, displayName)
      setUser(u)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch (err: any) {
      setError(err.message || 'Error al registrar')
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
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
