# DentalOS 🦷

Sistema SaaS de gestión para clínicas dentales pequeñas en Perú.
Diseñado para consultorios de 1 a 3 usuarios con roles diferenciados.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/dentalos)

---

## 📋 Pantallas incluidas en el MVP

| Pantalla | Archivo | Descripción |
|---|---|---|
| Login | `login.html` | Autenticación de usuario |
| Dashboard | `dashboard.html` | Resumen del día + accesos rápidos |
| Pacientes | `pacientes.html` | Lista, búsqueda y filtros de pacientes |
| Ficha del Paciente | `ficha-paciente.html` | Datos, citas, historia clínica y pagos |
| Agenda | `agenda.html` | Calendario semanal interactivo de citas |

---

## 🗂 Estructura del proyecto

```
dentalos/
├── login.html            # Pantalla de acceso
├── dashboard.html        # Panel principal
├── pacientes.html        # Gestión de pacientes
├── ficha-paciente.html   # Ficha individual del paciente
├── agenda.html           # Agenda de citas (calendario semanal)
├── data.js               # Capa de datos (simulación de backend)
├── vercel.json           # Configuración de despliegue en Vercel
└── README.md             # Este archivo
```

---

## 🛠 Tecnologías

- **HTML5** — Estructura semántica
- **TailwindCSS CDN** — Estilos (Play CDN, válido para MVP)
- **JavaScript Vanilla** — Lógica de UI e interacciones
- **data.js** — Simulación de backend (base de datos en memoria)

> **Sin backend real.** Todo funciona 100% en el navegador. No requiere Node.js, PHP, ni base de datos para ejecutarse.

---

## 🚀 Despliegue en Vercel

### Opción A — Desde GitHub (recomendado)

1. Sube el proyecto a un repositorio GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: DentalOS MVP inicial"
   git remote add origin https://github.com/TU_USUARIO/dentalos.git
   git push -u origin main
   ```

2. Ve a [vercel.com](https://vercel.com) → **New Project** → Importa tu repositorio

3. Configuración de Vercel:
   - **Framework Preset:** `Other`
   - **Root Directory:** `/` (raíz del proyecto)
   - **Build Command:** *(dejar vacío)*
   - **Output Directory:** `.` (punto — la raíz)

4. Haz clic en **Deploy** → En 30 segundos tendrás tu URL pública.

### Opción B — Desde la CLI de Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 💻 Ejecutar localmente

No se necesita ningún servidor. Simplemente abre `login.html` en tu navegador:

```bash
# Opción 1: Doble clic en login.html

# Opción 2: Con Live Server en VS Code (extensión recomendada)
# Instala "Live Server" → clic derecho en login.html → "Open with Live Server"

# Opción 3: Con Python
python3 -m http.server 8080
# Luego abre http://localhost:8080/login.html
```

---

## 👤 Credenciales de demo

En el MVP la autenticación es simulada — cualquier correo y contraseña funcionan.

| Campo | Valor |
|---|---|
| Email | doctor@dentalos.pe |
| Contraseña | cualquier texto |

---

## 🗄 Capa de datos (data.js)

`data.js` actúa como un backend local con datos en memoria. Define una API pública bajo el objeto `DentalOS`:

```js
// Pacientes
DentalOS.getPatients({ activo: true, search: 'Ana' })
DentalOS.getPatientById('pac-001')
DentalOS.createPatient({ nombre, apellido, dni, telefono })
DentalOS.updatePatient('pac-001', { telefono: '999999999' })

// Citas
DentalOS.getAppointmentsByDay('2026-04-19')
DentalOS.getAppointmentsByPatient('pac-001')
DentalOS.createAppointment({ pacienteId, fecha, horaInicio, horaFin, motivo })
DentalOS.changeAppointmentStatus('cit-001', 'atendida')

// Historia clínica
DentalOS.getClinicalRecordsByPatient('pac-001')

// Pagos
DentalOS.getPaymentsByPatient('pac-001')
DentalOS.markPaymentAsPaid('pag-004', 'yape')

// Dashboard
DentalOS.getDashboardSummary('2026-04-19')
```

> **Migración a backend real:** Cada función devuelve `{ ok, data, error }`. Para migrar a una API REST, reemplaza el cuerpo de cada función por un `fetch()` al endpoint correspondiente. El resto del sistema no cambia.

---

## 🔐 Roles del sistema

| Rol | Acceso |
|---|---|
| **Admin** | Todo el sistema + gestión de usuarios |
| **Doctor** | Sus citas + historia clínica de sus pacientes |
| **Recepcionista** | Agenda + pacientes (sin historia clínica) |

---

## 📱 Compatibilidad

- ✅ Google Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Laptop y desktop (diseño principal)
- ⚠️ Móvil (sidebar colapsable, funcional pero optimizado para pantalla grande)

---

## 🗺 Roadmap (próximas versiones)

- [ ] Odontograma interactivo
- [ ] Facturación electrónica (SUNAT)
- [ ] Recordatorios automáticos por WhatsApp/SMS
- [ ] App móvil (PWA)
- [ ] Reportes y analytics
- [ ] Inventario de materiales
- [ ] Multi-consultorio

---

## 📝 Licencia

MIT — Libre para uso personal y comercial.

---

*DentalOS — Hecho con ❤️ para clínicas dentales en Perú 🇵🇪*
