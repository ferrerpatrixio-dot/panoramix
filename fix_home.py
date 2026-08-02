import re

with open('src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Reemplazar sección Legal
old_legal = '''              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-white transition">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">No es app de citas</a></li>
              </ul>'''

new_legal = '''              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terminos" className="hover:text-white transition">Términos y condiciones</Link></li>
                <li><Link to="/terminos" className="hover:text-white transition">Política de privacidad</Link></li>
                <li><Link to="/terminos" className="hover:text-white transition">Conductas prohibidas</Link></li>
                <li><Link to="/terminos" className="hover:text-white transition">No es app de citas</Link></li>
              </ul>'''

content = content.replace(old_legal, new_legal)

# Reemplazar sección Contacto
old_contacto = '''              <h4 className="text-white font-semibold mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>hola@panoramix.cl</li>
                <li>Santiago, Chile</li>
              </ul>'''

new_contacto = '''              <h4 className="text-white font-semibold mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>hola@panoramix.cl</li>
                <li>legal@panoramix.cl</li>
                <li>Santiago, Chile</li>
              </ul>'''

content = content.replace(old_contacto, new_contacto)

# Reemplazar sección Interno
old_interno = '''              <h4 className="text-white font-semibold mb-3">Interno</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/modelo-negocio" className="hover:text-white transition">Resumen Modelo de Negocio</Link></li>
                <li><Link to="/eventos-rm" className="hover:text-white transition">Eventos RM</Link></li>
                <li><Link to="/perfil" className="hover:text-white transition">Mi Perfil</Link></li>
              </ul>'''

new_interno = '''              <h4 className="text-white font-semibold mb-3">Interno</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/modelo-negocio" className="hover:text-white transition">Resumen Modelo de Negocio</Link></li>
                <li><Link to="/eventos-rm" className="hover:text-white transition">Eventos RM</Link></li>
                <li><Link to="/perfil" className="hover:text-white transition">Mi Perfil</Link></li>
                <li><Link to="/admin" className="hover:text-white transition">Consola Admin</Link></li>
              </ul>'''

content = content.replace(old_interno, new_interno)

with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Home.tsx actualizado correctamente')
