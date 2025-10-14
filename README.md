# Aurimar - Tienda de Trajes de Baño

Una página web moderna y elegante para la venta de trajes de baño premium, desarrollada con HTML5, CSS3 y JavaScript vanilla.

## 🏊‍♀️ Características

### ✨ Funcionalidades Principales
- **Catálogo de Productos**: Visualización atractiva de trajes de baño con imágenes de alta calidad
- **Carrito de Compras**: Sistema completo de carrito con gestión de cantidades y precios
- **Modal de Productos**: Vista detallada de cada producto con opciones de talla y color
- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Navegación Suave**: Scroll suave entre secciones
- **Formulario de Contacto**: Página dedicada con formulario funcional y FAQ

### 🎨 Diseño
- **Interfaz Moderna**: Diseño limpio y profesional con gradientes atractivos
- **Paleta de Colores**: Azul oceánico (#2c5aa0) como color principal
- **Tipografía**: Fuente Poppins para una apariencia moderna
- **Animaciones**: Transiciones suaves y efectos hover
- **Iconografía**: Font Awesome para iconos consistentes

### 📱 Responsive Design
- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Menú Hamburguesa**: Navegación adaptativa para pantallas pequeñas
- **Grid Flexible**: Layouts que se adaptan a diferentes tamaños de pantalla

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! La página está lista para usar

### Para Desarrollo Local
```bash
# Usando Python (si está instalado)
python -m http.server 8000

# Usando Node.js (si está instalado)
npx http-server

# Usando PHP (si está instalado)
php -S localhost:8000
```

## 📁 Estructura del Proyecto

```
Aurimar/
├── index.html          # Página principal
├── contacto.html       # Página de contacto
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Documentación
```

## 🛍️ Funcionalidades del E-commerce

### Productos
- **8 Productos de Ejemplo**: Bikinis, trajes enteros y tankinis
- **Información Detallada**: Precios, descripciones, tallas y colores
- **Imágenes de Alta Calidad**: Fotos profesionales de Unsplash
- **Sistema de Ofertas**: Precios con descuentos visuales

### Carrito de Compras
- **Agregar Productos**: Desde la vista de catálogo o modal detallado
- **Gestión de Cantidades**: Aumentar/disminuir cantidades
- **Selección de Tallas y Colores**: Personalización completa
- **Cálculo de Totales**: Precio total automático
- **Eliminación de Items**: Remover productos del carrito
- **Persistencia**: El carrito se mantiene durante la sesión

### Modal de Productos
- **Vista Detallada**: Imagen grande y información completa
- **Selector de Tallas**: Dropdown con tallas disponibles
- **Selector de Colores**: Opciones de colores disponibles
- **Agregar al Carrito**: Directamente desde el modal

## 🎯 Páginas Incluidas

### Página Principal (`index.html`)
- **Hero Section**: Llamada a la acción principal con animaciones
- **Playas Destacadas**: Sección inspirada en playas famosas
- **Categorías**: Bikinis, Enteros, Tankinis
- **Productos Destacados**: Grid de productos con funcionalidad completa
- **Footer**: Información de contacto y enlaces

### Página de Contacto (`contacto.html`)
- **Información de Contacto**: Dirección, teléfono, email, horarios
- **Formulario de Contacto**: Campos para consultas
- **Preguntas Frecuentes**: FAQ sobre tallas, envíos, devoluciones
- **Diseño Consistente**: Misma identidad visual

## 🎨 Personalización

### Colores
Los colores principales se pueden modificar en `styles.css`:
```css
:root {
    --primary-color: #2c5aa0;
    --secondary-color: #667eea;
    --accent-color: #764ba2;
}
```

### Productos
Para agregar nuevos productos, edita el array `products` en `script.js`:
```javascript
const products = [
    {
        id: 9,
        name: "Nuevo Producto",
        price: 99.99,
        image: "url-de-imagen",
        category: "bikini",
        description: "Descripción del producto",
        sizes: ["S", "M", "L"],
        colors: ["Azul", "Rosa"],
        beach: "Playa Favorita",
        features: ["Característica 1", "Característica 2"]
    }
];
```

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Poppins
- **Unsplash**: Imágenes de alta calidad

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles iOS/Android

## 🚀 Próximas Mejoras

- [ ] Integración con pasarela de pagos
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Base de datos de productos
- [ ] Sistema de reviews y calificaciones
- [ ] Wishlist/Favoritos
- [ ] Búsqueda avanzada con filtros
- [ ] Integración con redes sociales

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:
- Email: info@Aurimar.com
- Teléfono: +1 (555) 123-4567

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para Aurimar**
