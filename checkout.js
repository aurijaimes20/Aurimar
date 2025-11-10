// Configuración de pagos - Mercado Pago
const paymentConfig = {
    publicKey: (window?.AURIMAR_PAYMENTS?.mercadoPagoPublicKey || 'TEST-12345678-1234-1234-1234-123456789012').trim(),
    currency: (window?.AURIMAR_PAYMENTS?.currency || 'COP').toUpperCase(),
    // Para producción, cambiar a false
    sandbox: true
};

// Configuración de envíos
const shippingConfig = {
    freeShippingThreshold: 100000,
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
    weightRate: 2000
};

// Variables globales
let cart = [];
let currentShippingCost = 0;
let deliveryType = 'home';

// Elementos del DOM (se inicializarán después de que el DOM cargue)
let checkoutForm;
let orderItems;
let subtotalElement;
let shippingCostElement;
let shippingLine;
let totalAmountElement;
let checkoutTotalElement;
let freeShippingMessage;
let stateSelect;
let sameAsShippingCheckbox;
let billingInfo;
let checkoutBtn;
let shippingSection;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos del DOM
    checkoutForm = document.getElementById('checkout-form');
    orderItems = document.getElementById('order-items');
    subtotalElement = document.getElementById('subtotal');
    shippingCostElement = document.getElementById('shipping-cost');
    shippingLine = document.getElementById('shipping-line');
    totalAmountElement = document.getElementById('total-amount');
    checkoutTotalElement = document.getElementById('checkout-total');
    freeShippingMessage = document.getElementById('free-shipping-message');
    stateSelect = document.getElementById('state');
    sameAsShippingCheckbox = document.getElementById('same-as-shipping');
    billingInfo = document.getElementById('billing-info');
    checkoutBtn = document.getElementById('checkout-btn');
    shippingSection = document.getElementById('shipping-section');
    
    console.log('Elementos del DOM inicializados:', {
        checkoutForm: !!checkoutForm,
        checkoutBtn: !!checkoutBtn
    });
    
    loadCartFromStorage();
    updateOrderSummary();
    setupEventListeners();
    handlePaymentResponse();
});

// Manejar respuesta de Mercado Pago después del pago
function handlePaymentResponse() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('status');
    const paymentId = urlParams.get('payment_id');
    const preferenceId = urlParams.get('preference_id');
    
    if (paymentStatus) {
        if (paymentStatus === 'approved') {
            // Pago aprobado
            showPaymentSuccessModal(paymentId || preferenceId || 'N/A');
            // Limpiar carrito después de pago exitoso
            setTimeout(() => {
                localStorage.removeItem('aurimar-cart');
                localStorage.removeItem('aurimar-last-transaction');
            }, 3000);
        } else if (paymentStatus === 'failure' || paymentStatus === 'rejected') {
            // Pago rechazado
            showPaymentErrorModal('El pago fue rechazado. Por favor intenta con otro método de pago.');
        } else if (paymentStatus === 'pending') {
            // Pago pendiente
            showPaymentPendingModal(paymentId || preferenceId || 'N/A');
        } else {
            // Error desconocido
            showPaymentErrorModal('Hubo un problema procesando tu pago. Por favor contacta a soporte.');
        }
        
        // Limpiar parámetros de la URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

function showPaymentSuccessModal(referenceCode) {
    const modal = document.createElement('div');
    modal.className = 'payment-success-modal';
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
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
            <h2 style="color: #2c5aa0; margin-bottom: 15px; font-family: 'Playfair Display', serif;">
                ¡Pago exitoso!
            </h2>
            <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
                Tu pago ha sido procesado correctamente. Recibirás un correo de confirmación pronto.
            </p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                <strong>Código de referencia:</strong><br>
                <code style="color: #2c5aa0;">${referenceCode || 'N/A'}</code>
            </div>
            <button onclick="window.location.href='index.html'" style="
                background: #2c5aa0;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            ">
                Volver a la tienda
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showPaymentErrorModal(message) {
    const modal = document.createElement('div');
    modal.className = 'payment-error-modal';
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
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">❌</div>
            <h2 style="color: #e74c3c; margin-bottom: 15px; font-family: 'Playfair Display', serif;">
                Error en el pago
            </h2>
            <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
                ${message}
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #2c5aa0;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            ">
                Entendido
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showPaymentPendingModal(referenceCode) {
    const modal = document.createElement('div');
    modal.className = 'payment-pending-modal';
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
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">⏳</div>
            <h2 style="color: #f39c12; margin-bottom: 15px; font-family: 'Playfair Display', serif;">
                Pago pendiente
            </h2>
            <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
                Tu pago está siendo procesado. Te notificaremos por correo cuando se confirme.
            </p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                <strong>Código de referencia:</strong><br>
                <code style="color: #2c5aa0;">${referenceCode || 'N/A'}</code>
            </div>
            <button onclick="window.location.href='index.html'" style="
                background: #2c5aa0;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            ">
                Volver a la tienda
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('aurimar-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        // Si no hay carrito, redirigir a la página principal
        window.location.href = 'index.html';
    }
}

function setupEventListeners() {
    // Event listener para el formulario
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
        console.log('Event listener del formulario configurado');
    } else {
        console.error('checkoutForm no encontrado en setupEventListeners');
    }
    
    // Event listeners para tipo de entrega
    const deliveryOptions = document.querySelectorAll('input[name="delivery-type"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', handleDeliveryTypeChange);
    });
    
    // Event listener para el dropdown de departamentos
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            updateShippingCalculation();
            // Limpiar error si hay
            clearFieldError(stateSelect);
        });
    }
    
    // Event listener para el checkbox de facturación
    if (sameAsShippingCheckbox) {
        sameAsShippingCheckbox.addEventListener('change', function() {
            toggleBillingInfo();
        });
    }
    
    // Agregar listeners a todos los campos del formulario para limpiar errores al escribir
    setupFieldErrorClearing();
}

function setupFieldErrorClearing() {
    // Obtener todos los campos del formulario
    const formFields = checkoutForm ? checkoutForm.querySelectorAll('input, select, textarea') : [];
    
    formFields.forEach(field => {
        // Limpiar error cuando el usuario empiece a escribir
        field.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                clearFieldError(this);
            }
        });
        
        // Limpiar error cuando el usuario cambie el valor (para selects)
        field.addEventListener('change', function() {
            if (this.value.trim() !== '') {
                clearFieldError(this);
            }
        });
        
        // Limpiar error cuando el campo reciba foco
        field.addEventListener('focus', function() {
            // No limpiar inmediatamente, solo cuando empiece a escribir
        });
    });
    
    console.log(`Listeners de limpieza de errores agregados a ${formFields.length} campos`);
}

function handleDeliveryTypeChange() {
    const selectedDelivery = document.querySelector('input[name="delivery-type"]:checked');
    deliveryType = selectedDelivery.value;
    
    if (deliveryType === 'pickup') {
        shippingSection.style.display = 'none';
        currentShippingCost = 0;
        shippingLine.style.display = 'none';
    } else {
        shippingSection.style.display = 'block';
        shippingLine.style.display = 'flex';
        updateShippingCalculation();
    }
    
    updateTotals();
}


function updateOrderSummary() {
    if (cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }
    
    // Actualizar items del pedido
    orderItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">$${formatPrice(item.price)}</p>
                <p class="item-quantity">Cantidad: ${item.quantity}</p>
            </div>
            <div class="item-total">
                $${formatPrice(item.price * item.quantity)}
            </div>
        `;
        orderItems.appendChild(itemElement);
    });
    
    // Actualizar totales
    updateTotals();
}

function updateTotals() {
    const subtotal = calculateCartTotal();
    const total = subtotal + currentShippingCost;
    
    subtotalElement.textContent = `$${formatPrice(subtotal)}`;
    totalAmountElement.textContent = `$${formatPrice(total)}`;
    checkoutTotalElement.textContent = `$${formatPrice(total)}`;
}

function updateShippingCalculation() {
    if (deliveryType === 'pickup') {
        return;
    }
    
    const selectedState = stateSelect.value;
    
    if (!selectedState) {
        shippingCostElement.textContent = 'Selecciona departamento';
        currentShippingCost = 0;
        freeShippingMessage.style.display = 'none';
    } else {
        const shippingCost = calculateShippingCost(selectedState);
        currentShippingCost = shippingCost;
        
        if (shippingCost === 0) {
            shippingCostElement.textContent = 'Gratis';
            freeShippingMessage.style.display = 'block';
        } else {
            shippingCostElement.textContent = `$${formatPrice(shippingCost)}`;
            freeShippingMessage.style.display = 'none';
        }
    }
    
    updateTotals();
}

function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateShippingCost(state) {
    if (!state) return 0;
    
    const subtotal = calculateCartTotal();
    
    if (subtotal >= shippingConfig.freeShippingThreshold) {
        return 0;
    }
    
    const baseRate = shippingConfig.shippingRates[state] || 15000;
    const estimatedWeight = cart.reduce((total, item) => total + (item.quantity * 200), 0);
    const weightCost = Math.ceil(estimatedWeight / 500) * shippingConfig.weightRate;
    
    return baseRate + weightCost;
}

function toggleBillingInfo() {
    if (sameAsShippingCheckbox.checked) {
        billingInfo.style.display = 'none';
        // Limpiar campos de facturación
        document.getElementById('billing-name').value = '';
        document.getElementById('billing-address').value = '';
        document.getElementById('billing-city').value = '';
        document.getElementById('billing-state').value = '';
    } else {
        billingInfo.style.display = 'block';
    }
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    console.log('handleCheckoutSubmit llamado');
    
    // Verificar que hay productos en el carrito
    if (cart.length === 0) {
        showValidationAlert('Tu carrito está vacío. Agrega productos antes de finalizar el pedido.');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = '<span class="btn-text">Finalizar pedido</span><span class="btn-total" id="checkout-total">$' + formatPrice(calculateCartTotal() + currentShippingCost) + '</span>';
        }
        return;
    }
    
    // Validar formulario
    if (!validateForm()) {
        console.log('Validación falló');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = '<span class="btn-text">Finalizar pedido</span><span class="btn-total" id="checkout-total">$' + formatPrice(calculateCartTotal() + currentShippingCost) + '</span>';
        }
        return;
    }
    
    console.log('Formulario validado, procesando pago...');
    
    // Recopilar datos del formulario
    const formData = new FormData(checkoutForm);
    const customerData = {
        email: formData.get('email'),
        phone: formData.get('phone'),
        name: formData.get('fullName'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        postal: formData.get('postalCode'),
        dni: formData.get('dni'),
        deliveryType: deliveryType,
        deliveryInstructions: formData.get('deliveryInstructions'),
        paymentMethod: formData.get('payment-method'),
        billingName: sameAsShippingCheckbox.checked ? formData.get('fullName') : formData.get('billingName'),
        billingAddress: sameAsShippingCheckbox.checked ? formData.get('address') : formData.get('billingAddress'),
        billingCity: sameAsShippingCheckbox.checked ? formData.get('city') : formData.get('billingCity'),
        billingState: sameAsShippingCheckbox.checked ? formData.get('state') : formData.get('billingState')
    };
    
    // Deshabilitar botón de checkout
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    
    // Procesar pago
    processPayment(customerData);
}

function validateForm() {
    const requiredFields = [
        'email', 'phone', 'fullName', 'dni'
    ];
    
    // Si es entrega a domicilio, validar campos de envío
    if (deliveryType === 'home') {
        requiredFields.push('address', 'city', 'state');
    }
    
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es requerido');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Validar email
    const emailField = document.querySelector('[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        showFieldError(emailField, 'Ingresa un email válido');
        isValid = false;
    }
    
    // Validar teléfono
    const phoneField = document.querySelector('[name="phone"]');
    if (phoneField.value && phoneField.value.length < 10) {
        showFieldError(phoneField, 'Ingresa un teléfono válido');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    if (!field) return;
    
    // Remover clase de error
    field.classList.remove('error');
    
    // Remover estilos inline de error si existen
    if (field.style.borderColor === 'rgb(231, 76, 60)' || field.style.borderColor === '#e74c3c') {
        field.style.borderColor = '';
    }
    if (field.style.boxShadow && field.style.boxShadow.includes('231, 76, 60')) {
        field.style.boxShadow = '';
    }
    
    // Remover mensaje de error si existe
    const existingError = field.parentNode ? field.parentNode.querySelector('.field-error') : null;
    if (existingError) {
        existingError.remove();
    }
}

function processPayment(customerData) {
    const subtotal = calculateCartTotal();
    const shippingCost = deliveryType === 'home' ? calculateShippingCost(customerData.state) : 0;
    const total = subtotal + shippingCost;
    
    console.log('Procesando pago:', {
        subtotal,
        shippingCost,
        total,
        customerData
    });
    
    // Si es contra entrega, mostrar confirmación
    if (customerData.paymentMethod === 'cash') {
        showCashPaymentConfirmation(customerData, total);
    } else {
        // Para otros métodos de pago, usar Mercado Pago
        createMercadoPagoPayment(total, customerData);
    }
}

function showCashPaymentConfirmation(customerData, total) {
    const modal = document.createElement('div');
    modal.className = 'payment-confirmation-modal';
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
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        ">
            <div style="
                font-size: 60px;
                margin-bottom: 20px;
                animation: bounce 0.6s ease;
            ">💰</div>
            <h2 style="
                color: #2c5aa0;
                margin-bottom: 15px;
                font-family: 'Playfair Display', serif;
            ">¡Pedido confirmado!</h2>
            <p style="
                color: #666;
                margin-bottom: 25px;
                line-height: 1.6;
            ">Tu pedido ha sido procesado. Pagarás <strong>$${formatPrice(total)}</strong> contra entrega.</p>
            <div style="
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 25px;
                border-left: 4px solid #2c5aa0;
            ">
                <strong>Total a pagar: $${formatPrice(total)}</strong><br>
                <small style="color: #666;">${cart.length} producto(s) en tu pedido</small>
            </div>
            <button onclick="this.parentElement.parentElement.remove(); clearCartAndRedirect();" style="
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
    
    document.body.appendChild(modal);
}

function createMercadoPagoPayment(total, customerData) {
    console.log('createMercadoPagoPayment llamado con:', {
        total,
        paymentMethod: customerData.paymentMethod,
        email: customerData.email,
        name: customerData.name
    });
    
    // Validar que tenemos los datos necesarios
    if (!customerData.email || !customerData.name) {
        showValidationAlert('Por favor completa todos los campos requeridos');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = '<span class="btn-text">Finalizar pedido</span><span class="btn-total" id="checkout-total">$' + formatPrice(total) + '</span>';
        }
        return;
    }
    
    // Guardar información de la transacción
    const transactionData = {
        amount: total,
        customerData: customerData,
        cart: cart,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('aurimar-last-transaction', JSON.stringify(transactionData));
    
    // Preparar datos para crear la preferencia
    const preferenceData = {
        items: cart.map(item => ({
            title: item.name + (item.size ? ` - Talla: ${item.size}` : '') + (item.color ? ` - Color: ${item.color}` : ''),
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: paymentConfig.currency
        })),
        payer: {
            name: customerData.name,
            email: customerData.email,
            phone: {
                area_code: '',
                number: customerData.phone || ''
            },
            identification: {
                type: 'CC',
                number: customerData.dni || ''
            }
        },
        back_urls: {
            success: window.location.origin + window.location.pathname + '?status=approved',
            failure: window.location.origin + window.location.pathname + '?status=failure',
            pending: window.location.origin + window.location.pathname + '?status=pending'
        },
        auto_return: 'approved',
        external_reference: 'aurimar_' + Date.now(),
        statement_descriptor: 'AURIMAR'
    };
    
    // Agregar costo de envío si aplica
    const shippingCost = deliveryType === 'home' ? calculateShippingCost(customerData.state) : 0;
    if (shippingCost > 0) {
        preferenceData.items.push({
            title: 'Costo de envío',
            quantity: 1,
            unit_price: shippingCost,
            currency_id: paymentConfig.currency
        });
    }
    
    // Agregar dirección de envío si es a domicilio
    if (customerData.deliveryType === 'home' && customerData.address) {
        preferenceData.payer.address = {
            street_name: customerData.address,
            street_number: '',
            zip_code: customerData.postal || '000000'
        };
    }
    
    // Configurar método de pago específico si se seleccionó
    const paymentMethod = customerData.paymentMethod || 'card';
    
    // IMPORTANTE: Mercado Pago muestra automáticamente PSE, Nequi, Daviplata y tarjetas
    // cuando la moneda es COP y la cuenta está en Colombia.
    // No es necesario configurar nada especial, solo asegurarse de que:
    // 1. La moneda sea COP (ya está configurada)
    // 2. La cuenta de Mercado Pago esté en Colombia
    // 3. El cliente seleccione el método en el checkout de Mercado Pago
    
    // Guardar el método de pago seleccionado para referencia
    preferenceData.metadata = {
        payment_method_selected: paymentMethod,
        store: 'Aurimar'
    };
    
    // Mostrar modal de carga
    showMercadoPagoLoading();
    
    // Crear preferencia usando la API de Mercado Pago
    // IMPORTANTE: En producción, esto DEBE hacerse en tu servidor por seguridad
    // Aquí mostramos cómo hacerlo desde el cliente (solo para desarrollo)
    createMercadoPagoPreference(preferenceData);
}

function showMercadoPagoLoading() {
    const modal = document.createElement('div');
    modal.id = 'mp-loading-modal';
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
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
        ">
            <div style="font-size: 50px; margin-bottom: 20px;">💳</div>
            <h3 style="color: #2c5aa0; margin-bottom: 15px;">Preparando tu pago...</h3>
            <div style="margin: 20px 0;">
                <div class="spinner" style="
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2c5aa0;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                "></div>
            </div>
            <p style="color: #666;">Serás redirigido a Mercado Pago en un momento...</p>
        </div>
    `;
    
    // Agregar animación de spinner
    if (!document.getElementById('spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
}

async function createMercadoPagoPreference(preferenceData) {
    try {
        // Opción 1: Si tienes un servidor con endpoint configurado
        // Descomenta esto y configura tu endpoint:
        /*
        const response = await fetch('/api/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preferenceData)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear preferencia');
        }
        
        const { id } = await response.json();
        window.location.href = `https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=${id}`;
        return;
        */
        
        // Opción 2: Para pruebas rápidas - usar directamente desde el cliente
        // NOTA: Esto requiere tu Access Token (solo para desarrollo)
        // En producción, SIEMPRE usa un servidor
        
        const accessToken = window?.AURIMAR_PAYMENTS?.mercadoPagoAccessToken;
        
        console.log('Access Token configurado:', !!accessToken, accessToken ? 'Sí' : 'No');
        
        if (accessToken && accessToken !== 'TU_ACCESS_TOKEN_AQUI' && accessToken.trim() !== '') {
            console.log('Intentando crear preferencia de Mercado Pago...');
            
            // Crear preferencia directamente desde el cliente (solo para desarrollo)
            const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(preferenceData)
            });
            
            console.log('Respuesta de Mercado Pago:', response.status, response.statusText);
            
            if (response.ok) {
                const preference = await response.json();
                console.log('Preferencia creada:', preference.id);
                console.log('Redirigiendo a Mercado Pago...');
                
                // Cerrar modal de carga
                const loadingModal = document.getElementById('mp-loading-modal');
                if (loadingModal) loadingModal.remove();
                
                // Redirigir a Mercado Pago
                window.location.href = `https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=${preference.id}`;
                return;
            } else {
                // Error al crear la preferencia
                const errorData = await response.json().catch(() => ({}));
                console.error('Error de Mercado Pago:', errorData);
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
        }
        
        // Si no hay Access Token configurado, mostrar instrucciones
        console.log('No hay Access Token configurado, mostrando instrucciones');
        showMercadoPagoSetupInstructions(preferenceData);
        
    } catch (error) {
        console.error('Error creando preferencia:', error);
        
        // Cerrar modal de carga
        const loadingModal = document.getElementById('mp-loading-modal');
        if (loadingModal) loadingModal.remove();
        
        // Mostrar error específico
        let errorMessage = 'Error al procesar el pago. Por favor intenta de nuevo.';
        if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }
        
        showValidationAlert(errorMessage);
        
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = '<span class="btn-text">Finalizar pedido</span><span class="btn-total" id="checkout-total">$' + formatPrice(calculateCartTotal() + currentShippingCost) + '</span>';
        }
    }
}

function showMercadoPagoSetupInstructions(preferenceData) {
    const modal = document.getElementById('mp-loading-modal');
    if (modal) {
        const total = preferenceData.items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 600px;
                margin: 20px;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="font-size: 50px; margin-bottom: 20px;">💳</div>
                <h3 style="color: #2c5aa0; margin-bottom: 15px;">Configuración de Mercado Pago</h3>
                <p style="color: #666; margin-bottom: 20px; text-align: left;">
                    Para activar los pagos, necesitas:
                </p>
                <ol style="text-align: left; color: #666; margin-bottom: 20px; line-height: 1.8;">
                    <li>Crear una cuenta en <a href="https://www.mercadopago.com.co" target="_blank" style="color: #2c5aa0;">Mercado Pago</a></li>
                    <li>Obtener tu <strong>Access Token</strong> desde <a href="https://www.mercadopago.com.co/developers/panel" target="_blank" style="color: #2c5aa0;">el panel de desarrolladores</a></li>
                    <li><strong>Opción rápida (solo pruebas):</strong> Agrega tu Access Token en checkout.html antes del script:
                        <pre style="background: #f0f0f0; padding: 10px; border-radius: 5px; margin-top: 10px; font-size: 0.85em; overflow-x: auto;"><code>&lt;script&gt;
  window.AURIMAR_PAYMENTS = {
    mercadoPagoAccessToken: 'TU_ACCESS_TOKEN_AQUI'
  };
&lt;/script&gt;</code></pre>
                    </li>
                    <li><strong>Opción segura (producción):</strong> Usa el archivo <code>api/create-preference.js</code> en tu servidor</li>
                </ol>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: left;">
                    <strong>Total a pagar:</strong> $${formatPrice(total)}<br>
                    <small style="color: #666;">${cart.length} producto(s)</small>
                </div>
                <div style="background: #e8f4fd; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: left; font-size: 0.9em;">
                    <strong>💡 Tip:</strong> Puedes usar servicios como <a href="https://vercel.com" target="_blank" style="color: #2c5aa0;">Vercel</a> o <a href="https://netlify.com" target="_blank" style="color: #2c5aa0;">Netlify</a> para crear el endpoint fácilmente.
                </div>
                <button onclick="this.parentElement.parentElement.remove(); checkoutBtn.disabled = false; checkoutBtn.innerHTML = '<span class=\\'btn-text\\'>Finalizar pedido</span><span class=\\'btn-total\\' id=\\'checkout-total\\'>$${formatPrice(total)}</span>';" style="
                    background: #2c5aa0;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 10px;
                ">
                    Entendido
                </button>
            </div>
        `;
    }
}

function showCheckoutSuccess(customerData, total) {
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
            ">¡Pedido procesado!</h2>
            <p style="
                color: #666;
                margin-bottom: 25px;
                line-height: 1.6;
            ">Tu pedido se está procesando. Completa el pago en la nueva ventana para finalizar tu compra.</p>
            <div style="
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 25px;
                border-left: 4px solid #2c5aa0;
            ">
                <strong>Total: $${formatPrice(total)}</strong><br>
                <small style="color: #666;">${cart.length} producto(s) en tu pedido</small>
            </div>
            <button onclick="this.parentElement.parentElement.remove(); clearCartAndRedirect();" style="
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
    
    document.body.appendChild(modal);
    
    // Auto-cerrar después de 8 segundos
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
            clearCartAndRedirect();
        }
    }, 8000);
}

function clearCartAndRedirect() {
    // Limpiar carrito solo cuando se completa el pedido exitosamente
    localStorage.removeItem('aurimar-cart');
    // Redirigir a la página principal
    window.location.href = 'index.html';
}

function goBackToStore() {
    // No limpiar el carrito, solo regresar a la tienda
    window.location.href = 'index.html';
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-CO').format(price);
}

// Función para mostrar alertas de validación
function showValidationAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'validation-alert';
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 18px;"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Función para validar campos obligatorios
function validateRequiredFields() {
    const requiredFields = [
        { id: 'full-name', name: 'Nombre completo' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Teléfono' },
        { id: 'dni', name: 'Documento de identidad' }
    ];
    
    // Si es entrega a domicilio, agregar campos de dirección
    const deliveryType = document.querySelector('input[name="delivery-type"]:checked');
    if (deliveryType && deliveryType.value === 'home') {
        requiredFields.push(
            { id: 'address', name: 'Dirección' },
            { id: 'city', name: 'Ciudad' },
            { id: 'state', name: 'Departamento' }
        );
    }
    
    // Si no usa la misma información para facturación, agregar campos de facturación
    const sameAsShippingCheckbox = document.getElementById('same-as-shipping');
    if (sameAsShippingCheckbox && !sameAsShippingCheckbox.checked) {
        requiredFields.push(
            { id: 'billing-name', name: 'Nombre completo (facturación)' },
            { id: 'billing-address', name: 'Dirección (facturación)' },
            { id: 'billing-city', name: 'Ciudad (facturación)' },
            { id: 'billing-state', name: 'Departamento (facturación)' }
        );
    }
    
    const missingFields = [];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element && (!element.value || element.value.trim() === '')) {
            missingFields.push(field.name);
            // Agregar clase de error al campo
            element.style.borderColor = '#e74c3c';
            element.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        } else if (element) {
            // Remover clase de error si el campo está lleno
            element.style.borderColor = '';
            element.style.boxShadow = '';
        }
    });
    
    // Validar formato de email
    const emailField = document.getElementById('email');
    if (emailField && emailField.value && !/\S+@\S+\.\S+/.test(emailField.value)) {
        missingFields.push('Email (formato inválido)');
        emailField.style.borderColor = '#e74c3c';
        emailField.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    }
    
    if (missingFields.length > 0) {
        const message = `Por favor completa los campos marcados en rojo`;
        showValidationAlert(message);
        return false;
    }
    
    return true;
}

// Función para manejar el clic del botón finalizar
function handleFinalizeOrder() {
    console.log('Botón finalizar clickeado');
    
    // Validar campos obligatorios
    if (!validateRequiredFields()) {
        return;
    }
    
    // Si todo está bien, proceder con el pago
    console.log('Todos los campos están completos, procediendo con el pago...');
    
    // Aquí iría la lógica de procesamiento del pago
    // Por ahora solo mostramos un mensaje de éxito
    showSuccessMessage();
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'success-alert';
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 18px;"></i>
            <span>¡Pedido procesado correctamente!</span>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Event listener para el botón de finalizar
document.addEventListener('DOMContentLoaded', function() {
    const finalizeButton = document.getElementById('checkout-btn');
    if (finalizeButton) {
        // Conectar el botón con el submit del formulario
        finalizeButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón clickeado, checkoutForm:', checkoutForm);
            
            if (checkoutForm) {
                // Disparar el evento submit del formulario
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                checkoutForm.dispatchEvent(submitEvent);
            } else {
                console.error('checkoutForm no encontrado');
                // Si el formulario no se encuentra, intentar procesar directamente
                if (cart.length === 0) {
                    showValidationAlert('Tu carrito está vacío');
                    return;
                }
                // Intentar obtener los datos del formulario manualmente
                const formElement = document.getElementById('checkout-form');
                if (formElement) {
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    formElement.dispatchEvent(submitEvent);
                } else {
                    showValidationAlert('Error: No se encontró el formulario');
                }
            }
        });
    } else {
        console.error('Botón checkout-btn no encontrado');
    }
    
    // Manejar el checkbox de "misma información para facturación"
    const sameAsShippingCheckbox = document.getElementById('same-as-shipping');
    const billingInfo = document.getElementById('billing-info');
    
    if (sameAsShippingCheckbox && billingInfo) {
        sameAsShippingCheckbox.addEventListener('change', function() {
            if (this.checked) {
                billingInfo.style.display = 'none';
                // Limpiar campos de facturación cuando se ocultan
                const billingFields = billingInfo.querySelectorAll('input, select');
                billingFields.forEach(field => {
                    field.value = '';
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                });
            } else {
                billingInfo.style.display = 'block';
            }
        });
    }
    
    // Limpiar estilos de error cuando el usuario empiece a escribir
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    });
});