// Función para formatear precios con puntos
function formatPrice(price) {
    return price.toLocaleString('es-CO');
}

// Datos de productos
const products = [
    {
        id: 1,
        name: "Bikini Caribeño Tropical",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025.png",
        category: "bikini",
        description: "Inspirado en las aguas cristalinas del Caribe. Estampado tropical vibrante con protección UV 50+ y tecnología de secado rápido. Perfecto para tus vacaciones en Cancún o Tulum.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul Turquesa", "Rosa Coral", "Verde Esmeralda"],
        beach: "Caribe Mexicano",
        features: ["Protección UV 50+", "Secado Rápido", "Material Reciclado"]
    },
    {
        id: 2,
        name: "One Piece Miami Elegance",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (1).png",
        category: "entero",
        description: "Diseño sofisticado inspirado en el glamour de South Beach. Corte favorecedor con detalles dorados y material de alta calidad. Ideal para piscinas de lujo y eventos de playa.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro Ébano", "Azul Marino", "Rojo Ferrari"],
        beach: "South Beach",
        features: ["Corte Favorecedor", "Detalles Dorados", "Material Premium"]
    },
    {
        id: 3,
        name: "Tankini Hawaii Sunset",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (3).png",
        category: "tankini",
        description: "Captura la magia de los atardeceres hawaianos. Top ajustable con cordones y pantalón de corte moderno. Diseño que combina comodidad y estilo para tus aventuras en las islas.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Naranja Sunset", "Púrpura Twilight", "Rosa Hibiscus"],
        beach: "Hawaii",
        features: ["Top Ajustable", "Cordones Decorativos", "Corte Moderno"]
    },
    {
        id: 4,
        name: "Bikini Minimalista Ibiza",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (4).png",
        category: "bikini",
        description: "Estilo minimalista inspirado en las playas de Ibiza. Líneas limpias y colores neutros que nunca pasan de moda. Perfecto para el estilo mediterráneo y la vida bohemia.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blanco Nieve", "Beige Arena", "Negro Carbón"],
        beach: "Ibiza",
        features: ["Diseño Atemporal", "Líneas Limpias", "Colores Neutros"]
    },
    {
        id: 5,
        name: "Traje Deportivo Maldivas",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (5).png",
        category: "entero",
        description: "Diseñado para las aguas cristalinas de las Maldivas. Tecnología deportiva avanzada con compresión muscular y resistencia al cloro. Ideal para snorkeling y deportes acuáticos.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul Océano", "Verde Agua", "Turquesa Profundo"],
        beach: "Maldivas",
        features: ["Compresión Muscular", "Resistente al Cloro", "Tecnología Deportiva"]
    },
    {
        id: 6,
        name: "Tankini Floral Santorini",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025.png",
        category: "tankini",
        description: "Inspirado en las flores de Santorini. Estampado floral delicado con colores pastel que reflejan la belleza de las casas blancas y cúpulas azules de las islas griegas.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Rosa Bougainvillea", "Azul Cúpula", "Lavanda Griega"],
        beach: "Santorini",
        features: ["Estampado Floral", "Colores Pastel", "Inspiración Griega"]
    },
    {
        id: 7,
        name: "Bikini Neon Copacabana",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (1).png",
        category: "bikini",
        description: "Vibrante como la vida nocturna de Río de Janeiro. Colores neón que brillan bajo el sol y la luna. Perfecto para fiestas de playa y festivales de verano.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Neon Rosa", "Neon Verde", "Neon Azul"],
        beach: "Copacabana",
        features: ["Colores Neón", "Efecto Brillante", "Estilo Festivo"]
    },
    {
        id: 8,
        name: "One Piece Bondi Beach",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (3).png",
        category: "entero",
        description: "Estilo surfista inspirado en Bondi Beach, Sydney. Diseño funcional y moderno con detalles retro. Ideal para surf, paddleboarding y actividades acuáticas intensas.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul Surf", "Negro Retro", "Blanco Náutico"],
        beach: "Bondi Beach",
        features: ["Estilo Surfista", "Diseño Funcional", "Detalles Retro"]
    },
    {
        id: 9,
        name: "Bikini Neon Copacabana",
        price: 30000,
        oldPrice: 70000,
        image: "assets/images/Generated Image Sept 10 2025 (1).png",
        category: "bikini",
        description: "Vibrante como la vida nocturna de Río de Janeiro. Colores neón que brillan bajo el sol y la luna. Perfecto para fiestas de playa y festivales de verano.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Neon Rosa", "Neon Verde", "Neon Azul"],
        beach: "Copacabana",
        features: ["Colores Neón", "Efecto Brillante", "Estilo Festivo"]
    }
];

// Carrito de compras
let cart = [];
let cartCount = 0;

const paymentConfig = {
    publicKey: (window?.AURIMAR_PAYMENTS?.mercadoPagoPublicKey || 'TEST-12345678-1234-1234-1234-123456789012').trim(),
    currency: (window?.AURIMAR_PAYMENTS?.currency || 'COP').toUpperCase(),
    sandbox: true
};

// Configuración de envíos
const shippingConfig = {
    // Envío gratis para pedidos mayores a $100,000
    freeShippingThreshold: 100000,
    // Costos base de envío por departamento
    shippingRates: {
        'Bogotá D.C.': 8000,
        'Antioquia': 12000,
        'Valle del Cauca': 12000,
        'Cundinamarca': 10000,
        'Santander': 15000,
        'Atlántico': 15000,
        'Bolívar': 18000,
        'Boyacá': 12000,
        'Caldas': 10000,
        'Caquetá': 20000,
        'Cauca': 18000,
        'Cesar': 18000,
        'Córdoba': 18000,
        'Huila': 15000,
        'La Guajira': 25000,
        'Magdalena': 20000,
        'Meta': 15000,
        'Nariño': 20000,
        'Norte de Santander': 18000,
        'Quindío': 10000,
        'Risaralda': 10000,
        'Sucre': 18000,
        'Tolima': 12000
    },
    // Costo adicional por peso (por cada 500g)
    weightRate: 2000
};

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');
const productModal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const checkoutBtn = document.getElementById('checkout-btn');


// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    loadProducts();
    setupEventListeners();
    updateCartCount();
    updateCartDisplay();
});

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('aurimar-cart');
    console.log('Intentando cargar carrito desde localStorage:', savedCart);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('Carrito cargado exitosamente desde localStorage:', cart);
        } catch (error) {
            console.error('Error al parsear carrito desde localStorage:', error);
            cart = [];
            localStorage.removeItem('aurimar-cart');
        }
    } else {
        console.log('No hay carrito guardado en localStorage');
        cart = [];
    }
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem('aurimar-cart', JSON.stringify(cart));
    console.log('Carrito guardado en localStorage:', cart);
    console.log('localStorage actual:', localStorage.getItem('aurimar-cart'));
}

// Función para limpiar completamente el carrito
function clearCart() {
    cart = [];
    localStorage.removeItem('aurimar-cart');
    updateCartCount();
    updateCartDisplay();
    console.log('Carrito limpiado completamente');
}

// Actualizar cantidad de un producto en el carrito por índice
function updateQuantityByIndex(index, change) {
    console.log('Actualizando cantidad por índice:', { index, change });
    if (index >= 0 && index < cart.length) {
        const item = cart[index];
        item.quantity += change;
        console.log('Nueva cantidad:', item.quantity);
        if (item.quantity <= 0) {
            removeFromCartByIndex(index);
            return;
        }
        updateCartCount();
        updateCartDisplay();
        saveCartToStorage();
    }
}

// Eliminar producto del carrito por índice
function removeFromCartByIndex(index) {
    console.log('Eliminando producto por índice:', index);
    console.log('Carrito antes de eliminar:', cart);
    
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        console.log('Carrito después de eliminar:', cart);
        
        updateCartCount();
        updateCartDisplay();
        saveCartToStorage();
        showNotification('Producto eliminado del carrito');
    }
}

// Funciones legacy (mantener por compatibilidad)
function updateQuantity(productId, size, color, change) {
    console.log('Actualizando cantidad (legacy):', { productId, size, color, change });
    const item = cart.find(item => item.id === productId && item.size === size && item.color === color);
    if (item) {
        item.quantity += change;
        console.log('Nueva cantidad:', item.quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId, size, color);
            return;
        }
        updateCartCount();
        updateCartDisplay();
        saveCartToStorage();
    }
}

function removeFromCart(productId, size, color) {
    console.log('Eliminando producto (legacy):', { productId, size, color });
    console.log('Carrito antes de eliminar:', cart);
    
    cart = cart.filter(item => !(item.id === productId && item.size === size && item.color === color));
    
    console.log('Carrito después de eliminar:', cart);
    
    updateCartCount();
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Producto eliminado del carrito');
}

// Cargar productos
function loadProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.oldPrice ? '<span class="product-badge">Oferta</span>' : ''}
            <div class="beach-badge">${product.beach}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-beach">
                <i class="fas fa-map-marker-alt"></i>
                <span>Inspirado en ${product.beach}</span>
            </div>
            <div class="product-features">
                ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="price-container">
                <div class="price-box">
                    ${product.oldPrice ? `<div class="old-price-box">$${formatPrice(product.oldPrice)}</div>` : ''}
                    <div class="current-price-box">$${formatPrice(product.price)}</div>
                    ${product.oldPrice ? `<div class="discount-box">-${Math.round((1 - product.price/product.oldPrice) * 100)}%</div>` : ''}
                </div>
            </div>
            <button class="add-to-cart" data-product-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                Agregar al Carrito
            </button>
        </div>
    `;
    
    // Agregar evento de clic al botón para abrir modal
    const addToCartBtn = card.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(product);
        });
    }
    
    // Agregar evento de clic para abrir modal al resto de la tarjeta
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart') && !e.target.closest('.add-to-cart')) {
            openProductModal(product);
        }
    });
    
    return card;
}

// Abrir modal de producto
function openProductModal(product) {
    if (!productModal || !modalBody) return;
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Layout móvil: columna vertical
        modalBody.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 200px; border-radius: 10px; margin: 0 auto; display: block;">
                </div>
                <div>
                    <h2 style="color: #2c5aa0; margin-bottom: 0.5rem; text-align: center; font-size: 1.3rem;">${product.name}</h2>
                    <div style="margin-bottom: 1rem; text-align: center;">
                        ${product.oldPrice ? `<span style="text-decoration: line-through; color: #999; margin-right: 0.5rem;">$${formatPrice(product.oldPrice)}</span>` : ''}
                        <span style="font-size: 1.3rem; font-weight: bold; color: #2c5aa0;">$${formatPrice(product.price)}</span>
                    </div>
                    <p style="margin-bottom: 1rem; color: #666; text-align: center; font-size: 0.9rem; line-height: 1.4;">${product.description}</p>
                    
                    <div style="margin-bottom: 0.8rem;">
                        <label style="display: block; margin-bottom: 0.3rem; font-weight: 600; font-size: 0.9rem;">Talla:</label>
                        <select id="product-size" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; background: white;">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.3rem; font-weight: 600; font-size: 0.9rem;">Color:</label>
                        <select id="product-color" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; background: white;">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
        `;
    } else {
        // Layout desktop: grid 2 columnas
        modalBody.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
                <div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">
                </div>
                <div>
                    <h2 style="color: #2c5aa0; margin-bottom: 1rem;">${product.name}</h2>
                    <div style="margin-bottom: 1rem;">
                        ${product.oldPrice ? `<span style="text-decoration: line-through; color: #999; margin-right: 0.5rem;">$${formatPrice(product.oldPrice)}</span>` : ''}
                        <span style="font-size: 1.5rem; font-weight: bold; color: #2c5aa0;">$${formatPrice(product.price)}</span>
                    </div>
                    <p style="margin-bottom: 1.5rem; color: #666;">${product.description}</p>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Talla:</label>
                        <select id="product-size" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Color:</label>
                        <select id="product-color" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
        `;
    }
                
    // Continuar con el resto del código...
    modalBody.innerHTML += `
                    <button class="add-to-cart" onclick="addToCartFromModal(${product.id})" style="width: 100%; padding: 12px; background: #2c5aa0; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem;">
                    Agregar al Carrito - $${formatPrice(product.price)}
                </button>
            </div>
        </div>
    `;
    
    productModal.style.display = 'flex';
    productModal.setAttribute('aria-hidden', 'false');
}

// Agregar al carrito desde modal
function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    const size = document.getElementById('product-size').value;
    const color = document.getElementById('product-color').value;
    
    addToCart(productId, size, color);
    closeProductModal();
}

// Agregar al carrito
function addToCart(productId, size = 'M', color = 'Negro') {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId && item.size === size && item.color === color);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size,
            color,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Producto agregado al carrito');
}

// Actualizar contador del carrito
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Actualizar display del carrito
function updateCartDisplay() {
    if (!cartItems || !cartTotal) {
        updateCheckoutSection(0);
        return;
    }

    cartItems.innerHTML = '';

    // Mostrar/ocultar botón de limpiar carrito
    if (clearCartBtn) {
        clearCartBtn.style.display = cart.length > 0 ? 'block' : 'none';
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Tu carrito está vacío</p>';
        cartTotal.textContent = '0';
        updateCheckoutSection(0);
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${formatPrice(item.price)}</div>
                <div style="font-size: 0.9rem; color: #666;">Talla: ${item.size} | Color: ${item.color}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantityByIndex(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantityByIndex(${index}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCartByIndex(${index})">Eliminar</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = formatPrice(total);
    updateCheckoutSection(total);
}

function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateShippingCost(state = null) {
    // Si no hay estado seleccionado, retornar 0
    if (!state) {
        return 0;
    }
    
    // Calcular subtotal del carrito
    const subtotal = calculateCartTotal();
    
    // Si el subtotal es mayor al umbral, envío gratis
    if (subtotal >= shippingConfig.freeShippingThreshold) {
        return 0;
    }
    
    // Obtener costo base por departamento
    const baseRate = shippingConfig.shippingRates[state] || 15000; // Default si no se encuentra
    
    // Calcular peso total estimado (asumiendo 200g por producto)
    const estimatedWeight = cart.reduce((total, item) => total + (item.quantity * 200), 0);
    
    // Calcular costo adicional por peso (cada 500g)
    const weightCost = Math.ceil(estimatedWeight / 500) * shippingConfig.weightRate;
    
    return baseRate + weightCost;
}

function calculateTotalWithShipping(state = null) {
    const subtotal = calculateCartTotal();
    const shipping = calculateShippingCost(state);
    return subtotal + shipping;
}

function updateShippingCalculation(modal, selectedState) {
    const shippingCostElement = modal.querySelector('#shipping-cost');
    const totalElement = modal.querySelector('#total-with-shipping');
    const freeShippingMessage = modal.querySelector('#free-shipping-message');
    
    if (!selectedState) {
        shippingCostElement.textContent = 'Selecciona departamento';
        totalElement.textContent = `$${formatPrice(calculateCartTotal())}`;
        freeShippingMessage.style.display = 'none';
        return;
    }

    const shippingCost = calculateShippingCost(selectedState);
    const total = calculateTotalWithShipping(selectedState);
    
    if (shippingCost === 0) {
        shippingCostElement.textContent = 'Gratis';
        freeShippingMessage.style.display = 'block';
    } else {
        shippingCostElement.textContent = `$${formatPrice(shippingCost)}`;
        freeShippingMessage.style.display = 'none';
    }
    
    totalElement.textContent = `$${formatPrice(total)}`;
}

function updateCheckoutSection(total) {
    if (!checkoutBtn) {
                return;
            }

    const hasItems = cart.length > 0;
    checkoutBtn.disabled = !hasItems;
    checkoutBtn.textContent = hasItems
        ? `Checkout ($${formatPrice(total)})`
        : 'Checkout';
}

function handleCheckoutClick() {
    console.log('Botón de checkout clickeado');
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }

    console.log('Carrito tiene items:', cart.length);
    
    // Guardar carrito en localStorage y redirigir al checkout
    localStorage.setItem('aurimar-cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}



// Funciones de PayU
function showCustomerDataForm() {
    // Cerrar el carrito primero
    closeCartOverlay();
    
    // Crear modal de datos del comprador
    const modal = document.createElement('div');
    modal.className = 'customer-data-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        ">
            <h2 style="
                color: #2c5aa0;
                margin-bottom: 30px;
                font-family: 'Playfair Display', serif;
            ">Datos de envío y facturación</h2>
            
            <form id="customer-data-form" style="text-align: left;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Nombre completo *</label>
                        <input type="text" id="customer-name" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Email *</label>
                        <input type="email" id="customer-email" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Teléfono *</label>
                        <input type="tel" id="customer-phone" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Documento de identidad *</label>
                        <input type="text" id="customer-dni" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Dirección de envío *</label>
                    <input type="text" id="customer-address" required style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        font-size: 16px;
                        box-sizing: border-box;
                    ">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Ciudad *</label>
                        <input type="text" id="customer-city" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Departamento *</label>
                        <select id="customer-state" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                            <option value="">Seleccionar...</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Atlántico">Atlántico</option>
                            <option value="Bogotá D.C.">Bogotá D.C.</option>
                            <option value="Bolívar">Bolívar</option>
                            <option value="Boyacá">Boyacá</option>
                            <option value="Caldas">Caldas</option>
                            <option value="Caquetá">Caquetá</option>
                            <option value="Cauca">Cauca</option>
                            <option value="Cesar">Cesar</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Huila">Huila</option>
                            <option value="La Guajira">La Guajira</option>
                            <option value="Magdalena">Magdalena</option>
                            <option value="Meta">Meta</option>
                            <option value="Nariño">Nariño</option>
                            <option value="Norte de Santander">Norte de Santander</option>
                            <option value="Quindío">Quindío</option>
                            <option value="Risaralda">Risaralda</option>
                            <option value="Santander">Santander</option>
                            <option value="Sucre">Sucre</option>
                            <option value="Tolima">Tolima</option>
                            <option value="Valle del Cauca">Valle del Cauca</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Código postal</label>
                        <input type="text" id="customer-postal" style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                            font-size: 16px;
                            box-sizing: border-box;
                        ">
                    </div>
                </div>
                
                <div id="order-summary" style="
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 30px;
                    border-left: 4px solid #2c5aa0;
                ">
                    <h3 style="margin: 0 0 10px 0; color: #2c5aa0;">Resumen del pedido</h3>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Productos (${cart.length}):</span>
                        <span>$${formatPrice(calculateCartTotal())}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Envío:</span>
                        <span id="shipping-cost">Selecciona departamento</span>
                    </div>
                    <div id="free-shipping-message" style="
                        background: #d4edda;
                        color: #155724;
                        padding: 8px 12px;
                        border-radius: 5px;
                        margin: 10px 0;
                        font-size: 14px;
                        display: none;
                    ">
                        🎉 ¡Envío gratis! Tu pedido supera los $${formatPrice(shippingConfig.freeShippingThreshold)}
                    </div>
                    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; color: #2c5aa0;">
                        <span>Total:</span>
                        <span id="total-with-shipping">$${formatPrice(calculateCartTotal())}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button type="button" onclick="this.closest('.customer-data-modal').remove()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                        Cancelar
                    </button>
                    <button type="submit" style="
                        background: #2c5aa0;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#1e3d6f'" onmouseout="this.style.background='#2c5aa0'">
                        Continuar al pago
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar event listener para el dropdown de departamentos
    const stateSelect = modal.querySelector('#customer-state');
    stateSelect.addEventListener('change', function() {
        updateShippingCalculation(modal, this.value);
    });
    
    // Manejar el envío del formulario
    const form = modal.querySelector('#customer-data-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Recopilar datos del formulario
        const customerData = {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            phone: document.getElementById('customer-phone').value,
            dni: document.getElementById('customer-dni').value,
            address: document.getElementById('customer-address').value,
            city: document.getElementById('customer-city').value,
            state: document.getElementById('customer-state').value,
            postal: document.getElementById('customer-postal').value
        };
        
        // Cerrar modal
        modal.remove();
        
        // Proceder con el pago usando los datos del cliente
        createPayUPayment(customerData);
    });
}

function createPayUPayment(customerData = null) {
    console.log('createPayUPayment llamada');
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
            return;
        }

    const subtotal = calculateCartTotal();
    const shippingCost = customerData ? calculateShippingCost(customerData.state) : 0;
    const total = subtotal + shippingCost;
    const referenceCode = 'aurimar_' + Date.now();
    console.log('Subtotal del carrito:', subtotal);
    console.log('Costo de envío:', shippingCost);
    console.log('Total con envío:', total);
    console.log('Código de referencia:', referenceCode);
    
    // Configuración de PayU
    const payUConfig = {
        merchant: {
            apiKey: paymentConfig.payuApiKey,
            apiLogin: paymentConfig.payuMerchantId
        },
        transaction: {
            order: {
                accountId: paymentConfig.payuAccountId,
                referenceCode: referenceCode,
                description: `Compra en Aurimar - ${cart.length} producto(s)`,
                language: 'es',
                signature: generatePayUSignature(referenceCode, total),
                notifyUrl: window.location.href,
                additionalValues: {
                    TX_VALUE: {
                        value: total,
                        currency: paymentConfig.currency
                    }
                },
                buyer: {
                    fullName: 'Cliente Aurimar',
                    emailAddress: 'cliente@aurimar.com',
                    contactPhone: '3001234567',
                    dniNumber: '12345678'
                },
                shippingAddress: {
                    street1: 'Calle 123',
                    street2: 'Apto 456',
                    city: 'Bogotá',
                    state: 'Cundinamarca',
                    country: 'CO',
                    postalCode: '110111',
                    phone: '3001234567'
                }
            },
            payer: {
                fullName: 'Cliente Aurimar',
                emailAddress: 'cliente@aurimar.com',
                contactPhone: '3001234567',
                dniNumber: '12345678'
            },
            creditCard: {
                securityCode: '123',
                expirationDate: '2025/12',
                name: 'Cliente Aurimar',
                number: '4111111111111111'
            },
            extraParameters: {
                INSTALLMENTS_NUMBER: 1
            },
            type: 'AUTHORIZATION_AND_CAPTURE',
            paymentMethod: 'VISA',
            paymentCountry: 'CO'
        },
        test: true // Cambiar a false en producción
    };

    // Crear formulario de pago directo (sin SDK)
    createPayUForm(referenceCode, total, customerData);
}

function createPayUForm(referenceCode, total, customerData = null) {
    console.log('Creando formulario de pago PayU');
    
    // Crear formulario de pago
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';
    form.target = '_blank';
    form.style.display = 'none';
    
    // Usar datos del cliente si están disponibles, sino usar valores por defecto
    const buyerEmail = customerData ? customerData.email : 'cliente@aurimar.com';
    const buyerName = customerData ? customerData.name : 'Cliente Aurimar';
    const buyerPhone = customerData ? customerData.phone : '';
    const buyerDni = customerData ? customerData.dni : '';
    
    // Parámetros requeridos por PayU
    const params = {
        'merchantId': paymentConfig.payuMerchantId,
        'accountId': paymentConfig.payuAccountId,
        'description': `Compra en Aurimar - ${cart.length} producto(s)`,
        'referenceCode': referenceCode,
        'amount': total,
        'tax': '0',
        'taxReturnBase': '0',
        'currency': paymentConfig.currency,
        'signature': generatePayUSignature(referenceCode, total),
        'test': '1', // 1 para pruebas, 0 para producción
        'buyerEmail': buyerEmail,
        'buyerFullName': buyerName,
        'buyerPhone': buyerPhone,
        'buyerDocument': buyerDni,
        'responseUrl': window.location.href,
        'confirmationUrl': window.location.href
    };
    
    // Agregar datos de envío si están disponibles
    if (customerData) {
        params['shippingAddress'] = customerData.address;
        params['shippingCity'] = customerData.city;
        params['shippingCountry'] = 'CO';
        params['shippingState'] = customerData.state;
        params['shippingPostalCode'] = customerData.postal || '000000';
    }
    
    // Agregar campos al formulario
    Object.keys(params).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
    });
    
    // Agregar formulario al DOM y enviarlo
    document.body.appendChild(form);
    form.submit();
    
    // Limpiar formulario después de enviarlo
    setTimeout(() => {
        document.body.removeChild(form);
    }, 1000);
    
    showNotification('Redirigiendo a PayU para completar el pago...', 'success');
    
    // Acciones adicionales en la página
    handleSuccessfulCheckout(customerData);
}

function handleSuccessfulCheckout(customerData = null) {
    console.log('Procesando checkout exitoso...');
    
    // 1. Cerrar el carrito automáticamente
    closeCartOverlay();
    
    // 2. Mostrar mensaje de confirmación más grande
    showCheckoutSuccessModal(customerData);
    
    // 3. Limpiar el carrito después de que el usuario vea el modal
    setTimeout(() => {
        cart = [];
        updateCartCount();
        updateCartDisplay();
        console.log('Carrito limpiado después del checkout');
    }, 5000); // Aumentado a 5 segundos
    
    // 4. Scroll hacia arriba para mostrar el mensaje
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showCheckoutSuccessModal(customerData = null) {
    // Crear modal de éxito
    const modal = document.createElement('div');
    modal.className = 'checkout-success-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Información del cliente si está disponible
    const customerInfo = customerData ? `
        <div style="
            background: #e8f4fd;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #2c5aa0;
            text-align: left;
        ">
            <h4 style="margin: 0 0 10px 0; color: #2c5aa0;">Datos de envío:</h4>
            <p style="margin: 5px 0; color: #333;"><strong>${customerData.name}</strong></p>
            <p style="margin: 5px 0; color: #666;">${customerData.email}</p>
            <p style="margin: 5px 0; color: #666;">${customerData.phone}</p>
            <p style="margin: 5px 0; color: #666;">${customerData.address}, ${customerData.city}, ${customerData.state}</p>
        </div>
    ` : '';
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        ">
            <div style="
                font-size: 60px;
                margin-bottom: 20px;
                animation: bounce 0.6s ease;
            ">🎉</div>
            <h2 style="
                color: #2c5aa0;
                margin-bottom: 15px;
                font-family: 'Playfair Display', serif;
            ">¡Compra iniciada!</h2>
            <p style="
                color: #666;
                margin-bottom: 25px;
                line-height: 1.6;
            ">Tu pedido se está procesando. Completa el pago en la nueva ventana de PayU para finalizar tu compra.</p>
            ${customerInfo}
            <div style="
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 25px;
                border-left: 4px solid #2c5aa0;
            ">
                ${customerData ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Subtotal:</span>
                        <span>$${formatPrice(calculateCartTotal())}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Envío:</span>
                        <span>${calculateShippingCost(customerData.state) === 0 ? 'Gratis' : '$' + formatPrice(calculateShippingCost(customerData.state))}</span>
                    </div>
                    <hr style="margin: 8px 0; border: none; border-top: 1px solid #ddd;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold;">
                        <span>Total:</span>
                        <span>$${formatPrice(calculateTotalWithShipping(customerData.state))}</span>
                    </div>
                ` : `
                    <strong>Total: $${formatPrice(calculateCartTotal())}</strong>
                `}
                <br>
                <small style="color: #666;">${cart.length} producto(s) en tu pedido</small>
            </div>
            <button onclick="this.parentElement.parentElement.remove(); clearCartAfterCheckout();" style="
                background: #2c5aa0;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#1e3d6f'" onmouseout="this.style.background='#2c5aa0'">
                Entendido
            </button>
        </div>
    `;
    
    // Agregar estilos CSS para animaciones
    if (!document.getElementById('checkout-success-styles')) {
        const styles = document.createElement('style');
        styles.id = 'checkout-success-styles';
        styles.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
    
    // Auto-cerrar después de 8 segundos
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
            clearCartAfterCheckout();
        }
    }, 8000);
}

function clearCartAfterCheckout() {
    console.log('Limpiando carrito después de checkout');
                cart = [];
                updateCartCount();
                updateCartDisplay();
}

function generatePayUSignature(referenceCode, amount) {
    // Esta función debe generar la firma de PayU
    // En producción, esto debe hacerse en el servidor por seguridad
    const apiKey = paymentConfig.payuApiKey;
    const merchantId = paymentConfig.payuMerchantId;
    const accountId = paymentConfig.payuAccountId;
    
    // Firma básica (en producción usar algoritmo SHA256)
    return btoa(`${apiKey}~${merchantId}~${referenceCode}~${amount}~${paymentConfig.currency}`);
}


function closeCartOverlay() {
    if (!cartOverlay) {
        return;
    }
    cartOverlay.style.display = 'none';
    cartOverlay.setAttribute('aria-hidden', 'true');
}

// Actualizar cantidad
function updateQuantity(productId, size, color, change) {
    const item = cart.find(item => item.id === productId && item.size === size && item.color === color);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size, color);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Eliminar del carrito
function removeFromCart(productId, size, color) {
    cart = cart.filter(item => !(item.id === productId && item.size === size && item.color === color));
    updateCartCount();
    updateCartDisplay();
}

// Configurar event listeners
function setupEventListeners() {
    if (cartBtn && cartOverlay) {
        cartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            cartOverlay.style.display = 'block';
            cartOverlay.setAttribute('aria-hidden', 'false');
            updateCartDisplay();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartOverlay);
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                if (confirm('¿Estás seguro de que quieres limpiar todo el carrito?')) {
                    clearCart();
                    showNotification('Carrito limpiado');
                }
            } else {
                showNotification('El carrito ya está vacío');
            }
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                closeCartOverlay();
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeProductModal);
    }

    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');
            if (!targetSelector || targetSelector === '#') {
                return;
            }

            const target = document.querySelector(targetSelector);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckoutClick);
    }
}

// Cerrar modal de producto
function closeProductModal() {
    if (!productModal) return;
    productModal.style.display = 'none';
    productModal.setAttribute('aria-hidden', 'true');
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 4000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Filtros de productos (funcionalidad adicional)
function filterProducts(category) {
    if (!productsGrid) return;
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Búsqueda de productos
function searchProducts(query) {
    if (!productsGrid) return;
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Animaciones al hacer scroll
// Mantener header blanco sólido en todo momento para igualar fondo del logo
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.style.background = '#ffffff';
});
