# Guía de Marca - Pedro Palomares Digital Coach

## 1. Paleta de Colores

### Colores Principales
- **Rojo Principal**: `#DC0000`
  - Hover/Activo: `#FF1A1A`
  - Oscuro: `#B30000`
  - Uso: CTAs principales, elementos de acción, acentos importantes

### Colores de Fondo
- **Negro Base**: `#121212`
  - Uso: Fondo principal del sitio
- **Negro Medio**: `#1E1E1E`
  - Uso: Tarjetas, elementos elevados
- **Negro Claro**: `#282828`
  - Uso: Elementos interactivos, hover states

### Colores de Texto
- **Blanco**: `#FFFFFF`
  - Uso: Títulos principales, texto sobre fondos oscuros
- **Gris Claro**: `#E5E5E5`
  - Uso: Texto principal
- **Gris Medio**: `#CCCCCC`
  - Uso: Texto secundario, subtítulos
- **Gris Oscuro**: `#808080`
  - Uso: Texto deshabilitado, placeholders

## 2. Tipografía

### Sistema de Fuentes
- **Principal**: Sistema de fuentes nativo optimizado
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  ```

### Jerarquía de Texto
- **Títulos Principales (H1)**
  - Tamaño: 2.5rem (40px)
  - Peso: Bold (700)
  - Espaciado: -0.02em

- **Subtítulos (H2)**
  - Tamaño: 2rem (32px)
  - Peso: Bold (700)
  - Espaciado: -0.01em

- **Títulos de Sección (H3)**
  - Tamaño: 1.5rem (24px)
  - Peso: Semibold (600)

- **Texto Principal**
  - Tamaño: 1rem (16px)
  - Peso: Regular (400)
  - Altura de línea: 1.5

## 3. Espaciado y Layout

### Sistema de Grid
- **Contenedor Máximo**: 1280px
- **Padding Lateral**:
  - Desktop: 2rem (32px)
  - Mobile: 1rem (16px)

### Espaciado Vertical
- **Entre Secciones**: 6rem (96px)
- **Entre Elementos**: 1.5rem (24px)
- **Padding Interno Cards**: 1.5rem (24px)

### Bordes Redondeados
- **Botones**: 0.375rem (6px)
- **Cards**: 0.5rem (8px)
- **Modales**: 0.75rem (12px)

## 4. Componentes UI

### Botones
- **Primario**
  ```css
  background-color: #DC0000;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  ```

- **Secundario**
  ```css
  background-color: transparent;
  border: 1px solid #DC0000;
  color: #DC0000;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  ```

### Cards
```css
background-color: #1E1E1E;
border: 1px solid #282828;
border-radius: 0.5rem;
padding: 1.5rem;
transition: border-color 0.3s;
```

### Inputs
```css
background-color: #121212;
border: 1px solid #282828;
border-radius: 0.375rem;
padding: 0.75rem 1rem;
color: white;
```

## 5. Iconografía
- **Biblioteca**: Lucide React
- **Tamaños**:
  - Pequeño: 16px
  - Medio: 20px
  - Grande: 24px
- **Color**: Heredado del texto o específico según contexto

## 6. Animaciones

### Transiciones
- **Duración**: 300ms
- **Timing**: ease-in-out
- **Propiedades**:
  - Hover: opacity, background-color, border-color
  - Modales: transform, opacity
  - Menús: height, opacity

### Efectos
```css
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## 7. Imágenes y Medios

### Optimización
- **Formato**: WebP con fallback a JPEG/PNG
- **Calidad**: 80-85%
- **Lazy Loading**: Activado para todas las imágenes
- **Aspect Ratio**: Mantener proporciones originales

### Estilos
- **Border Radius**: 0.5rem (8px)
- **Sombras**:
  ```css
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  ```

## 8. Accesibilidad

### Contraste
- Asegurar ratio mínimo de 4.5:1 para texto normal
- Ratio mínimo de 3:1 para texto grande
- Usar la herramienta WAVE para validar

### Focus States
```css
:focus {
  outline: 2px solid #DC0000;
  outline-offset: 2px;
}
```

### ARIA Labels
- Incluir en todos los elementos interactivos
- Usar roles semánticos apropiados
- Implementar skip links para navegación

## 9. Responsive Design

### Breakpoints
```css
/* Mobile First */
/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

### Grid System
- Mobile: 1 columna
- Tablet: 2 columnas
- Desktop: 3-4 columnas según contenido

## 10. SEO y Metadatos

### Tags Básicos
```html
<title>Pedro Palomares - Digital Coach</title>
<meta name="description" content="Experto en automatización, IA y desarrollo web. Ayudo a empresas a escalar sus negocios mediante estrategias digitales.">
<meta name="keywords" content="automatización, IA, desarrollo web, consultor digital, Barcelona">
```

### Open Graph
```html
<meta property="og:title" content="Pedro Palomares - Digital Coach">
<meta property="og:description" content="Experto en automatización, IA y desarrollo web">
<meta property="og:image" content="https://www.pedropalomares.com/og-image.jpg">
```