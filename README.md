# Reditop: Visualizador de Posts Populares de Reddit

Reditop es una aplicación web diseñada para explorar los posts más populares del subreddit `r/all` de Reddit. Permite a los usuarios visualizar, interactuar y gestionar una lista de posts de forma sencilla e intuitiva.

**🚀 Puedes visitar la aplicación desplegada en: [https://reditop.online/]([https://thedavos.github.io/reditop/])**

## Características Principales

*   **Visualización Clara:** Muestra una lista de posts con información relevante como título, autor, puntuación, número de comentarios e imagen en miniatura.
*   **Detalle Interactivo:** Al seleccionar un post, se accede a una vista detallada que incluye la imagen en alta resolución (si está disponible) y el contenido completo del post. Los usuarios pueden hacer clic en las imágenes en miniatura para verlas en un diálogo ampliado y descargarlas.
*   **Gestión de Posts:**
    *   Los posts se marcan automáticamente como leídos al ser seleccionados.
    *   Opción para descartar posts individualmente o todos a la vez, eliminándolos de la vista actual.
    *   Funcionalidad para actualizar la lista y cargar los posts más recientes.
    *   Posibilidad de reiniciar la aplicación a su estado inicial, limpiando todos los datos almacenados.
*   **Paginación Eficiente:** La lista de posts está paginada para una navegación fluida y un rendimiento óptimo.
*   **Estado Persistente:** Reditop utiliza `localStorage` para guardar el estado de los posts (cargados, leídos, descartados) y el post seleccionado, asegurando que la experiencia del usuario se mantenga entre sesiones.
*   **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, ofreciendo una experiencia de usuario consistente en dispositivos de escritorio y móviles. En móviles, la lista de posts se presenta en una barra lateral desplegable.
*   **Notificaciones en Tiempo Real:** Informa al usuario sobre acciones importantes como la actualización de posts, el descarte de publicaciones, etc.
*   **Manejo de Errores:** Proporciona retroalimentación al usuario en caso de problemas al cargar los posts desde la API de Reddit, con opción de reintentar la carga.

## Tecnologías Utilizadas

*   **Vue.js 2:** Framework progresivo para la construcción de la interfaz de usuario.
*   **Vite:** Herramienta moderna de frontend para un desarrollo rápido y empaquetado eficiente.
*   **Pinia:** Librería para la gestión del estado de la aplicación.
*   **Vue Router:** Para la gestión de rutas en la aplicación (configuración base presente).
*   **TypeScript:** Superset de JavaScript que añade tipado estático para un desarrollo más robusto.
*   **Tailwind CSS:** Framework CSS de utilidad para un diseño rápido y personalizable.
*   **Axios:** Cliente HTTP basado en promesas para realizar peticiones a la API de Reddit.
*   **Lucide Vue:** Librería de iconos SVG ligeros y personalizables.
*   **PortalVue:** Para renderizar componentes (como notificaciones) fuera de la jerarquía DOM principal.
*   **VueUse:** Colección de funciones composables esenciales para Vue.js.

## Project Setup

Asegúrate de tener [Node.js](https://nodejs.org/) instalado (se recomienda la versión LTS).

1.  Clona el repositorio:
    ```sh
    git clone https://repository-url.git # Reemplazar con la URL real del repositorio
    cd reditop
    ```

2.  Instala las dependencias del proyecto:
    ```sh
    npm install
    # o
    yarn install
    ```

### Compile and Hot-Reload for Development

Para iniciar el servidor de desarrollo con recarga en caliente:

```sh
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

### Type-Check, Compile and Minify for Production

Para compilar y minificar la aplicación para producción:

```sh
npm run build
# o
yarn build
```

Esto generará los archivos estáticos en el directorio `dist/`.

### Run Unit Tests with [Vitest](https://vitest.dev/)

Para ejecutar las pruebas unitarias:

```sh
npm run test:unit
# o
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

Para ejecutar las pruebas end-to-end:

1.  Asegúrate de que la aplicación esté construida (`npm run build` o `yarn build`).
2.  Ejecuta los tests:
    ```sh
    npm run test:e2e
    # o
    yarn test:e2e
    ```
    Esto abrirá la interfaz de Cypress. Para ejecutar en modo headless (CI):
    ```sh
    npm run test:e2e:ci
    # o
    yarn test:e2e:ci
    ```

### Lint with [ESLint](https://eslint.org/)

Para verificar y corregir automáticamente problemas de estilo de código:

```sh
npm run lint
# o
yarn lint
```

## Decisiones de Diseño y Arquitectura

Esta sección documenta las decisiones técnicas clave y consideraciones arquitecturales que dieron forma a Reditop, proporcionando contexto sobre las elecciones tecnológicas y patrones de diseño implementados.

### Stack Tecnológico y Decisiones Fundamentales
#### Frontend Framework y Ecosistema
**Vue.js 2** fue seleccionado como framework principal según los requerimientos del reto técnico para un puesto de Frontend Developer. Esta elección permite demostrar habilidades específicas en el ecosistema Vue 2, incluyendo el manejo de sus particularidades y limitaciones en comparación con Vue 3.

La gestión del estado se implementó con **Pinia**, la solución oficialmente recomendada que ofrece una API intuitiva, excelente integración con TypeScript y mejor experiencia de desarrollo comparada con Vuex. **Vue Router** se integró desde el inicio para establecer una base escalable, anticipando futuras expansiones hacia una aplicación multi-página.

#### Persistencia y Experiencia de Usuario

La persistencia del estado se logra mediante <code>localStorage</code>, almacenando:

- Estado de los posts (cargados, leídos, descartados)
- Post actualmente seleccionado

Esta decisión mejora significativamente la experiencia del usuario al mantener el contexto entre sesiones de navegación sin requerir infraestructura backend adicional.

#### Arquitectura de Estilos y Responsividad

**Tailwind CSS** fue elegido por su enfoque utility-first que permite:

- Desarrollo ágil de interfaces
- Consistencia visual a través de un sistema de diseño unificado
- Optimización automática del CSS final
- Responsividad nativa con breakpoints predefinidos

### Patrones de Diseño y Organización del Código
#### Arquitectura de Componentes
La estructura de componentes sigue un patrón jerárquico bien definido:

**Componentes Base (UI Kit):** `UButton`, `UBadge`, `UCard` - Elementos reutilizables que forman el sistema de diseño básico, manteniendo consistencia visual y comportamental. La creación de estos componentes propios fue necesaria debido a que las principales librerías de componentes UI (como Vuetify, Quasar, Element Plus) han discontinuado el soporte para Vue.js 2, enfocándose exclusivamente en Vue 3.

**Componentes Específicos:** `UPostItem`, `UPostDetail` - Componentes especializados para el dominio de la aplicación, encapsulando lógica de negocio específica.

**Composables para Lógica Compartida:** La lógica compleja, como el manejo de diálogos (`useDialog` para `UImageDialog`), se abstrajo en composables reutilizables, promoviendo la separación de responsabilidades y la testabilidad del código.

#### Tipado Estático y Robustez

**TypeScript** se implementó para:

- Detección temprana de errores en tiempo de desarrollo
- Mejor IntelliSense y experiencia de desarrollo
- Documentación implícita del código a través de tipos
- Facilitar el mantenimiento y refactoring a largo plazo

### Estrategia de Datos y Rendimiento

#### Gestión de Estado y API

La aplicación consume la API pública de Reddit para obtener los posts más populares de r/all, implementando una estrategia híbrida de carga y paginación:

**Carga Inicial:** 50 posts se obtienen en la primera petición para proporcionar contenido inmediato.

**Paginación Cliente-Servidor:** Se usa la paginación del lado del cliente (10 posts por página) sobre datos ya cargados para navegación instantánea

#### Optimizaciones de UX

- **Feedback Inmediato:** Sistema de notificaciones para todas las acciones del usuario
- **Estados Locales:** Las interacciones (marcar como leído, descartar) se reflejan inmediatamente en la UI
- **Gestión de Errores:** Manejo robusto de fallos de red con opciones de reintento
- **Funcionalidades Prácticas:** Descarga de imágenes y gestión de posts descartados

### Consideraciones de Despliegue y Configuración

#### Optimizaciones de Build

La configuración de compilación se optimizó para:

- Compatibilidad con navegadores modernos
- Seguridad de tipos mejorada
- Optimización del bundle final

### Infraestructura de Despliegue
El proyecto está configurado para despliegue en GitHub Pages con dominio personalizado (`reditop.online`), proporcionando:

- Hosting estático eficiente con Github Pages
- SSL/TLS automático
- CDN global para mejor rendimiento

## Bitácora de Tiempo

Para un análisis del tiempo invertido basado en el historial de commits del repositorio, por favor consulta el archivo [BITACORA.md](BITACORA.md).
