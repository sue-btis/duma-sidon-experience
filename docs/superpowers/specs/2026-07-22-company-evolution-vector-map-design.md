# Diseño: mapa vectorial para la evolución de Ecosat

## Objetivo

Reemplazar las imágenes `mapa1.png` y `mapa2.png` de la sección de evolución de la página principal por un mapa vectorial animado. El recorrido debe iniciar en una vista continental, acercarse a México, al estado de Chihuahua y a la ciudad de Chihuahua, mostrar las cuatro fases históricas existentes y terminar volviendo a la vista continental.

El inicio muestra sólo un pin de Chihuahua. El cierre queda preparado para mostrar otras ubicaciones cuando sean proporcionadas. No se inventarán ubicaciones, calles, rutas ni datos de cobertura.

## Alcance visual y narrativo

1. Vista inicial: Estados Unidos, México, Centroamérica y la parte norte de Sudamérica en una composición clara con un pin de Chihuahua.
2. Zoom narrativo: al avanzar el scroll, la cámara pasa de la vista continental a México, Chihuahua y la ciudad de Chihuahua.
3. Jerarquía geográfica: océano y países usan tonos neutros; México obtiene contraste controlado; Chihuahua usa el morado de Integración y un borde definido; Chihuahua ciudad usa un pin, halo y etiqueta. No se añaden colores arbitrarios ni calles.
4. Fases: las cuatro imágenes históricas actuales siguen siendo el foco y aparecen sin el mapa detrás.
5. Cierre: al finalizar las fases, la cámara vuelve a la vista continental. En esa vista se podrán activar pines adicionales a partir de una lista de ubicaciones aprobada.

## Implementación

- Usar `maplibre-gl` como motor WebGL de cámara y renderizado, cargado sólo en el componente cliente de la evolución.
- Servir los datos cartográficos desde `public/`; no habrá proveedor externo de tiles, API key, red externa ni cambio de CSP.
- Incluir el mínimo GeoJSON necesario: polígonos de países para la vista continental y división de México que permita destacar Chihuahua. Se verificará la licencia antes de versionar los datos.
- Natural Earth es el candidato para los límites continentales porque permite reutilización comercial. El límite estatal se obtendrá de una fuente oficial y se simplificará sólo si se conserva su forma visible en el encuadre.
- Mantener el progreso de scroll actual como una única fuente de verdad. Las paradas de cámara serán: continente, México, Chihuahua y ciudad de Chihuahua. Antes de cada movimiento, detener la animación anterior.
- Las cuatro fases existentes no cambian de contenido ni de orden. El mapa se oculta durante ellas.
- Las ubicaciones se definen en una constante feature-local. La lista inicial contiene únicamente Chihuahua. Agregar ubicaciones posteriores será un cambio de datos, no de lógica.

## Accesibilidad y fallo

- El texto narrativo permanece en HTML y no depende del canvas.
- Con `prefers-reduced-motion`, el mapa cambia de vista sin zoom animado y conserva el mismo orden de contenido.
- Si WebGL o los datos no cargan, la sección conserva las cuatro fases y su texto; el mapa no bloquea la lectura ni la navegación.
- El pin inicial y los futuros pines serán controles semánticos sólo si tienen una acción. Si son informativos, se renderizan como elementos no interactivos con una alternativa textual.

## Validación

- Verificar visualmente las vistas continental, México, Chihuahua y ciudad de Chihuahua en escritorio y móvil.
- Confirmar que el scroll hacia adelante y hacia atrás no acumula animaciones de cámara.
- Confirmar la alternativa de movimiento reducido.
- Ejecutar `pnpm lint` y `pnpm build` desde la raíz antes de entregar la implementación.

## Fuera de alcance

- Tiles externos, API keys, calles, navegación libre, buscador, geocodificación, rutas, relieve, capas de tráfico y proveedores de mapas.
- Pines finales adicionales hasta que se proporcionen sus ubicaciones.
