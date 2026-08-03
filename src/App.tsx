import { Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import BusinessModel from './pages/BusinessModel'
import EventosRM from './pages/EventosRM'
import Perfil from './pages/Perfil'
import PerfilProfundo from './pages/PerfilProfundo'
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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<FeedPanoramas />} />
        <Route path="/modelo-negocio" element={<BusinessModel />} />
        <Route path="/eventos-rm" element={<EventosRM />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil-profundo" element={<PerfilProfundo />} />
        <Route path="/chat-onboarding" element={<ChatOnboarding />} />
        <Route path="/mapa-onboarding" element={<MapaOnboarding />} />
        <Route path="/crear-panorama" element={<CrearPanorama />} />
        <Route path="/mis-panoramas" element={<MisPanoramas />} />
        <Route path="/evaluar" element={<Evaluacion />} />
        <Route path="/chat/:panoramaId/:matchUserId" element={<ChatMatch />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
      <SosButton />
      <DemoResetButton />
    </AuthProvider>
  )
}
