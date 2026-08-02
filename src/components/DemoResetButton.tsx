import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { demoResetAndSeed } from '@/services/demoSeed'
import { useAuth } from '@/contexts/AuthContext'

export default function DemoResetButton() {
  const { isAdmin } = useAuth()
  const [confirmando, setConfirmando] = useState(false)

  if (!isAdmin) return null

  const handleReset = () => {
    if (!confirmando) {
      setConfirmando(true)
      setTimeout(() => setConfirmando(false), 3000)
      return
    }
    demoResetAndSeed()
    window.location.reload()
  }

  return (
    <button
      onClick={handleReset}
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium shadow-lg transition-all duration-200 border ${
        confirmando
          ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
          : 'bg-white/90 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900 backdrop-blur-sm'
      }`}
      title={confirmando ? 'Toca de nuevo para confirmar' : 'Resetear datos de demo'}
    >
      <RotateCcw className="w-3.5 h-3.5" />
      {confirmando ? '¿Confirmar reset?' : 'Reset demo'}
    </button>
  )
}
