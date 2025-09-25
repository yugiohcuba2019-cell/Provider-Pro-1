# ServiceMarket - Marketplace de Servicios

Una aplicación móvil completa de marketplace que conecta clientes con proveedores de servicios profesionales. Desarrollada con React Native, Expo y TypeScript.

## 🚀 Características Principales

### Para Clientes
- **Autenticación segura** con email y registro rápido
- **Búsqueda avanzada** de servicios con filtros por categoría, precio y calificación
- **Perfiles detallados** de proveedores con reseñas y portfolio
- **Sistema de mensajería** en tiempo real
- **Gestión de reservas** con seguimiento de estado
- **Sistema de calificaciones** y comentarios
- **Historial completo** de servicios contratados

### Para Proveedores
- **Dashboard profesional** con métricas y estadísticas
- **Gestión de servicios** con control de precios y disponibilidad
- **Sistema de reservas** con calendario integrado
- **Perfil de negocio** personalizable con portfolio
- **Notificaciones** de nuevas solicitudes
- **Análisis de rendimiento** y reportes

### Funcionalidades Técnicas
- **Navegación por tabs** optimizada para cada tipo de usuario
- **Arquitectura escalable** con componentes reutilizables
- **Gestión de estado** con Context API
- **Almacenamiento local** con AsyncStorage
- **Interfaz responsive** adaptada a diferentes dispositivos
- **Animaciones fluidas** con micro-interacciones

## 📱 Estructura de la Aplicación

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Navegación por tabs
│   ├── home.tsx            # Pantalla principal
│   ├── search.tsx          # Búsqueda de servicios
│   ├── bookings.tsx        # Gestión de reservas
│   ├── messages.tsx        # Sistema de mensajería
│   ├── profile.tsx         # Perfil de usuario
│   ├── dashboard.tsx       # Dashboard para proveedores
│   └── services.tsx        # Gestión de servicios (proveedores)
├── _layout.tsx             # Layout principal
└── index.tsx               # Pantalla de inicio/autenticación

components/
├── auth/
│   └── AuthScreen.tsx      # Pantalla de autenticación
├── services/
│   └── ServiceCard.tsx     # Tarjeta de servicio
├── categories/
│   └── CategoryCard.tsx    # Tarjeta de categoría
└── search/
    └── FilterModal.tsx     # Modal de filtros

contexts/
└── UserContext.tsx         # Context de usuario y autenticación

data/
└── mockData.ts             # Datos de prueba
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- Expo CLI instalado globalmente
- Dispositivo móvil o emulador para pruebas

### Pasos de Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Ejecutar en dispositivo:**
   - Escanea el código QR con la app Expo Go
   - O ejecuta en emulador iOS/Android

## 📚 Arquitectura y Componentes

### Contexto de Usuario (`UserContext`)
Maneja el estado global del usuario, incluyendo:
- Información del usuario autenticado
- Tipo de usuario (cliente/proveedor)
- Funciones de login/logout
- Persistencia de datos con AsyncStorage

### Navegación Adaptativa
La navegación se adapta automáticamente según el tipo de usuario:
- **Clientes**: Inicio, Buscar, Reservas, Mensajes, Perfil
- **Proveedores**: Dashboard, Servicios, Reservas, Mensajes, Perfil

### Componentes Reutilizables
- `ServiceCard`: Tarjetas de servicios con modo horizontal/vertical
- `CategoryCard`: Categorías con iconos y colores personalizados
- `FilterModal`: Modal de filtros avanzados
- `AuthScreen`: Pantalla de autenticación completa

## 🎨 Diseño y UX

### Sistema de Colores
- **Primario**: #0066CC (Azul profesional)
- **Secundario**: #00AA55 (Verde éxito)
- **Acento**: #FF6B35 (Naranja energético)
- **Error**: #FF3B30 (Rojo alerta)
- **Neutros**: Escalas de grises para textos y fondos

### Principios de Diseño
- **Jerarquía visual clara** con tipografía consistente
- **Espaciado sistemático** de 8px para alineación perfecta
- **Micro-interacciones** que mejoran la experiencia
- **Feedback visual** en todas las acciones del usuario
- **Diseño responsive** para múltiples dispositivos

## 🔧 Funcionalidades Avanzadas

### Sistema de Autenticación
- Registro e inicio de sesión con email
- Selección de tipo de usuario (cliente/proveedor)
- Acceso demo para pruebas rápidas
- Persistencia de sesión con AsyncStorage

### Búsqueda y Filtrado
- Búsqueda por texto libre
- Filtros por categoría
- Ordenamiento por precio, calificación y relevancia
- Estados de carga y vacío

### Gestión de Reservas
- Múltiples estados: pendiente, confirmado, completado, cancelado
- Vista por pestañas para mejor organización
- Acciones contextuales según el estado
- Integración con sistema de mensajería

### Dashboard para Proveedores
- Métricas de rendimiento en tiempo real
- Gráficos de ingresos y reservas
- Acciones rápidas para gestión
- Historial de reservas recientes

## 🔄 Flujos de Usuario Principales

### Cliente
1. **Registro/Login** → Selecciona tipo de usuario
2. **Explorar** → Navega categorías y servicios destacados
3. **Buscar** → Usa filtros para encontrar servicios específicos
4. **Reservar** → Contacta proveedor y agenda servicio
5. **Seguimiento** → Monitorea el estado de la reserva
6. **Calificar** → Deja reseña después del servicio

### Proveedor
1. **Registro** → Configura perfil profesional
2. **Dashboard** → Revisa métricas y rendimiento
3. **Servicios** → Gestiona catálogo de servicios
4. **Reservas** → Acepta/rechaza solicitudes
5. **Comunicación** → Coordina con clientes
6. **Seguimiento** → Actualiza estados de servicio

## 🚀 Próximos Pasos

### Integraciones Pendientes
- **Base de datos**: Migración a Supabase/Firebase
- **Pagos**: Integración con Stripe
- **Mapas**: Geolocalización con React Native Maps
- **Notificaciones**: Push notifications con Expo Notifications
- **Storage**: Subida de imágenes para portfolios

### Mejoras Planificadas
- **Modo offline**: Funcionalidad básica sin conexión
- **Multiidioma**: Soporte para español e inglés
- **Tema oscuro**: Alternancia de tema
- **Accesibilidad**: Mejoras para usuarios con discapacidades
- **Analytics**: Seguimiento de métricas de uso

### Escalabilidad
- **Microservicios**: Separación de lógica de negocio
- **Cache**: Optimización de rendimiento
- **CDN**: Distribución de assets
- **Testing**: Suite completa de pruebas
- **CI/CD**: Automatización de despliegue

## 📄 Licencia

Proyecto desarrollado para fines demostrativos. Todos los derechos reservados.

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un Pull Request

## 📞 Soporte

Para soporte técnico o consultas, contacta al equipo de desarrollo.

---

**ServiceMarket** - Conectando servicios profesionales con clientes de manera eficiente y segura.