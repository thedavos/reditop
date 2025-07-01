# Reditop: Visualizador de Posts Populares de Reddit

Reditop es una aplicación web diseñada para explorar los posts más populares del subreddit `r/all` de Reddit. Permite a los usuarios visualizar, interactuar y gestionar una lista de posts de forma sencilla e intuitiva.

**🚀 Puedes visitar la aplicación desplegada en: [https://reditop.online/](https://reditop.online/)**

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

Esta sección destaca algunas de las decisiones clave tomadas durante el desarrollo de Reditop y notas importantes sobre su funcionamiento.

### Decisiones Clave Tomadas

*   **Framework y Ecosistema Vue.js 2:**
    *   Se utilizó Vue.js 2 como framework principal. Aunque el template inicial de Vite pudo sugerir Vue 3, el proyecto se desarrolló consistentemente con Vue 2.
    *   **Pinia** fue elegido para la gestión del estado global. Es la solución recomendada actualmente para aplicaciones Vue, ofreciendo una API intuitiva y excelente integración con TypeScript.
    *   **Vue Router** se incluyó para la gestión de rutas, aunque la aplicación actual es de una sola página principal, la base está para futuras expansiones.
*   **Persistencia de Datos con `localStorage`:**
    *   Para mejorar la experiencia del usuario, el estado de los posts (cargados, leídos, descartados) y el post actualmente seleccionado se guardan en `localStorage`. Esto permite que las preferencias y el estado de la aplicación persistan entre sesiones de navegación.
*   **Diseño Responsivo con Tailwind CSS:**
    *   Se optó por Tailwind CSS para un desarrollo ágil de la interfaz de usuario y para asegurar un diseño responsivo que se adapte correctamente a dispositivos móviles y de escritorio.
*   **Componentes Reutilizables y Lógica Centralizada:**
    *   Se crearon componentes de UI genéricos (ej. `UButton`, `UBadge`, `UCard`) y específicos (`UPostItem`, `UPostDetail`).
    *   La lógica para componentes complejos como los diálogos se centralizó en composables (ej. `useDialog` para `UImageDialog`), promoviendo la reutilización de código y la mantenibilidad.
*   **TypeScript para Robustez:**
    *   El proyecto utiliza TypeScript para aprovechar el tipado estático, lo que ayuda a prevenir errores comunes en tiempo de desarrollo y mejora la mantenibilidad y comprensión del código a largo plazo.
*   **Experiencia de Usuario (UX):**
    *   Se implementaron notificaciones para feedback inmediato de las acciones del usuario.
    *   La paginación se maneja del lado del cliente para una navegación rápida una vez que los posts iniciales son cargados, con opción de cargar más posts bajo demanda.
    *   Se incluyó funcionalidad para descartar posts y descargar imágenes, añadiendo valor práctico para el usuario.

### Notas Importantes sobre el Funcionamiento

*   **Fuente de Datos:** La aplicación obtiene los posts más populares (`top`) del subreddit `r/all` de Reddit. Esto implica una amplia variedad de contenido.
*   **Carga y Paginación de Posts:**
    *   Inicialmente, se cargan 50 posts de la API de Reddit.
    *   La paginación (10 posts por página) se realiza en el lado del cliente sobre los posts ya cargados. El store (`reddit.store.ts`) gestiona la lógica para cargar más lotes de 50 posts si el usuario llega al final de los datos disponibles.
*   **Interacciones y Estado Local:**
    *   Las acciones como marcar un post como leído (al seleccionarlo) o descartarlo modifican el estado local y este estado se persiste en `localStorage`. No se envían cambios de estado de vuelta a Reddit.
*   **Manejo de Errores:** Existe un manejo básico de errores para cuando falla la comunicación con la API de Reddit, mostrando un mensaje al usuario y permitiendo reintentar la carga.
*   **Despliegue y Dominio:** El commit `Create CNAME` y la URL proporcionada (`https://reditop.online/`) indican que el proyecto está configurado para ser desplegado, probablemente en una plataforma como GitHub Pages, utilizando un dominio personalizado.
*   **Configuración de Build:** Se han realizado ajustes en la configuración de compilación para optimizar para navegadores modernos y mejorar la seguridad de tipos (commit `ad202e3`).

## Bitácora de Tiempo

Para un análisis del tiempo invertido basado en el historial de commits del repositorio, por favor consulta el archivo [BITACORA.md](BITACORA.md).
