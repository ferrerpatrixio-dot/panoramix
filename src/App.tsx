import { Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import BusinessModel from './pages/BusinessModel'
import EventosRM from './pages/EventosRM'
import Perfil from './pages/Perfil'
import PerfilProfundo from './pages/PerfilProfundo'
import OnboardingWizard from './pages/OnboardingWizard'
import ChatOnboarding from './pages/ChatOnboarding'
import MapaOnboarding from './pages/MapaOnboarding'
import CrearPanorama from './pages/CrearPanorama'
import FeedPanoramas from './pages/FeedPanoramas'
import MisPanoramas from './pages/MisPanoramas'
import Evaluacion from './pages/Evaluacion'
import ChatMatch from './pages/ChatMatch'
import Admin from './pages/Admin'
import Terminos from './pages/Terminos'
import SosButton from './components/SosButton'
import DemoResetButton from './components/DemoResetButton'
import AdminRoute from './components/AdminRoute'
import OnboardingGuard from './components/OnboardingGuard'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/modelo-negocio" element={<BusinessModel />} />
        <Route path="/eventos-rm" element={<EventosRM />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/chat-onboarding" element={<ChatOnboarding />} />
        <Route path="/mapa-onboarding" element={<MapaOnboarding />} />

        {/* RUTAS PROTEGIDAS: requieren onboarding completo */}
        <Route path="/feed" element={<OnboardingGuard><FeedPanoramas /></OnboardingGuard>} />
        <Route path="/perfil" element={<OnboardingGuard><Perfil /></OnboardingGuard>} />
        <Route path="/perfil-profundo" element={<OnboardingGuard><PerfilProfundo /></OnboardingGuard>} />
        <Route path="/crear-panorama" element={<OnboardingGuard><CrearPanorama /></OnboardingGuard>} />
        <Route path="/mis-panoramas" element={<OnboardingGuard><MisPanoramas /></OnboardingGuard>} />
        <Route path="/evaluar" element={<OnboardingGuard><Evaluacion /></OnboardingGuard>} />
        <Route path="/chat/:panoramaId/:matchUserId" element={<OnboardingGuard><ChatMatch /></OnboardingGuard>} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      </Routes>
      <SosButton />
      <DemoResetButton />
    </AuthProvider>
  )
}
