import { Navigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { demoObtenerPerfil, demoObtenerContactos } from '@/services/demoBackend'
import type { ReactNode } from 'react'

interface OnboardingGuardProps {
  children: ReactNode
}

/**
 * Verifica si el usuario ha completado el onboarding mínimo.
 * Si no lo ha completado, redirige a /onboarding.
 * Si no está logueado, deja pasar (rutas públicas).
 */
export default function OnboardingGuard({ children }: OnboardingGuardProps) {
  const { user, loading } = useAuth()

  // Mientras carga la sesión, mostrar nada (evita flash de redirección)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm">Cargando...</div>
      </div>
    )
  }

  // No hay usuario → ruta pública, dejar pasar
  if (!user) return <>{children}</>

  // Hay usuario → verificar si completó onboarding mínimo
  const perfil = demoObtenerPerfil(user.uid)
  const contactos = demoObtenerContactos(user.uid)

  // Onboarding mínimo: al menos 1 contacto de seguridad + algunos datos de perfil
  const tieneContactoSeguridad = contactos.length > 0
  const tieneDatosPerfil = !!(
    perfil?.categoriasSel?.length ||
    perfil?.comunasSel?.length ||
    perfil?.presupuesto ||
    perfil?.companiasPref
  )

  const perfilCompleto = tieneContactoSeguridad && tieneDatosPerfil

  // Si está en /onboarding, dejar pasar siempre (evita loop infinito)
  const estaEnOnboarding = window.location.pathname === '/onboarding'
  if (estaEnOnboarding) return <>{children}</>

  // Si perfil incompleto → redirigir a onboarding
  if (!perfilCompleto) {
    return <Navigate to="/onboarding" replace />
  }

  // Todo OK → dejar pasar
  return <>{children}</>
}
