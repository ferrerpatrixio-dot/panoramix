import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import BusinessModel from './pages/BusinessModel'
import EventosRM from './pages/EventosRM'
import Perfil from './pages/Perfil'
import PerfilProfundo from './pages/PerfilProfundo'
import ChatOnboarding from './pages/ChatOnboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modelo-negocio" element={<BusinessModel />} />
      <Route path="/eventos-rm" element={<EventosRM />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfil-profundo" element={<PerfilProfundo />} />
      <Route path="/chat-onboarding" element={<ChatOnboarding />} />
    </Routes>
  )
}
