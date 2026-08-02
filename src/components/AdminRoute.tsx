import { Navigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import type { ReactNode } from 'react'

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth()

  if (loading) return null
  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
