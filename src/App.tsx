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
import MisPanoramas from './pages/MisPanoramas'
import Evaluacion from './pages/Evaluacion'
import Admin from './pages/Admin'
import Terminos from './pages/Terminos'
import SosButton from './components/SosButton'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modelo-negocio" element={<BusinessModel />} />
        <Route path="/eventos-rm" element={<EventosRM />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil-profundo" element={<PerfilProfundo />} />
        <Route path="/chat-onboarding" element={<ChatOnboarding />} />
        <Route path="/mapa-onboarding" element={<MapaOnboarding />} />
        <Route path="/crear-panorama" element={<CrearPanorama />} />
        <Route path="/mis-panoramas" element={<MisPanoramas />} />
        <Route path="/evaluar" element={<Evaluacion />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
      <SosButton />
    </AuthProvider>
  )
}
