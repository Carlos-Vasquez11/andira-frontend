# Kairos - Plataforma de Inversión en el Mercado Venezolano

Kairos es una plataforma moderna de inversión que permite a usuarios venezolanos acceder al mercado de valores local, con soporte para pagos en Bolívares (VEF) y USDT.

## Características Principales

- 🌐 Acceso al mercado de valores venezolano
- 💱 Soporte para Bolívares (VEF) y USDT
- 📊 Visualización de portafolio en tiempo real
- 📈 Análisis de mercado con gráficos interactivos
- 🔒 Autenticación segura con JWT
- 📱 Diseño responsive y mobile-first
- 🎨 Interfaz moderna con modo oscuro

## Tecnologías Utilizadas

- **Framework**: Next.js 16.0.10
- **UI**: React 19 + Tailwind CSS v4
- **Componentes**: shadcn/ui + Radix UI
- **Gráficos**: Recharts
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Gestión de Estado**: React Hooks + SWR

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js 18.x o superior
- npm o yarn
- Acceso al backend de Kairos (debe estar corriendo en `localhost:8080` por defecto)

## Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd kairos-front
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:8080

# Otras variables (opcionales)
PRODUCTIVE_SCOPE=development
EXPO_PUBLIC_API_URL=http://localhost:8080
\`\`\`

4. **Ejecutar el servidor de desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

5. **Abrir en el navegador**

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto

\`\`\`
kairos-front/
├── app/                      # App Router de Next.js
│   ├── auth/                # Páginas de autenticación
│   ├── dashboard/           # Dashboard principal
│   ├── mercado/             # Páginas del mercado
│   ├── perfil/              # Perfil de usuario
│   ├── tarifas/             # Información de tarifas
│   └── page.tsx             # Landing page
├── components/              # Componentes reutilizables
│   ├── ui/                  # Componentes de UI (shadcn)
│   └── ...                  # Otros componentes
├── lib/                     # Utilidades y helpers
├── public/                  # Archivos estáticos
└── app/globals.css          # Estilos globales
\`\`\`

## Autenticación

La aplicación utiliza autenticación basada en JWT. El flujo es:

1. El usuario ingresa email y contraseña en `/auth`
2. Se envía una petición POST a `http://localhost:8080/user-login`
3. El backend responde con un `token` y `user_id`
4. El token se guarda en localStorage y se usa para peticiones autenticadas

Ejemplo de credenciales de prueba (según el backend):
\`\`\`json
{
  "email": "john@example.com",
  "password": "password"
}
\`\`\`

## Endpoints del Backend

La aplicación se conecta a los siguientes endpoints:

- `POST /user-login` - Iniciar sesión
- Más endpoints serán documentados conforme se integren

## Integración con el Backend

Asegúrate de que el backend de Kairos esté corriendo antes de iniciar la aplicación frontend. Por defecto, se espera que esté disponible en `http://localhost:8080`.

Si el backend está en una URL diferente, actualiza la variable `NEXT_PUBLIC_API_URL` en tu archivo `.env.local`.

## Deployment

Para desplegar en producción (Vercel):

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Vercel detectará automáticamente Next.js y desplegará la aplicación

## Características de Diseño

- **Color Palette**: Esquema oscuro con acentos de neón (azul/cyan/púrpura)
- **Tipografía**: Geist Sans y Geist Mono
- **Componentes**: Glassmorphism, gradientes, y animaciones sutiles
- **Responsive**: Mobile-first con breakpoints optimizados

## Soporte

Para reportar problemas o solicitar funcionalidades, contacta al equipo de desarrollo.

## Licencia

Todos los derechos reservados © Kairos
