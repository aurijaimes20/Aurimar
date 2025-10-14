// Configuración de pagos
const paymentConfig = {
    payuMerchantId: (window?.AURIMAR_PAYMENTS?.payuMerchantId || '508029').trim(),
    payuApiKey: (window?.AURIMAR_PAYMENTS?.payuApiKey || '4Vj8eK4rloUd272L48hsrarnUA').trim(),
    payuAccountId: (window?.AURIMAR_PAYMENTS?.payuAccountId || '512321').trim(),
    currency: (window?.AURIMAR_PAYMENTS?.currency || 'COP').toUpperCase()
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

// Elementos del DOM
const checkoutForm = document.getElementById('checkout-form');
const orderItems = document.getElementById('order-items');
const subtotalElement = document.getElementById('subtotal');
const shippingCostElement = document.getElementById('shipping-cost');
const shippingLine = document.getElementById('shipping-line');
const totalAmountElement = document.getElementById('total-amount');
const checkoutTotalElement = document.getElementById('checkout-total');
const freeShippingMessage = document.getElementById('free-shipping-message');
const stateSelect = document.getElementById('state');
const sameAsShippingCheckbox = document.getElementById('same-as-shipping');
const billingInfo = document.getElementById('billing-info');
const checkoutBtn = document.getElementById('checkout-btn');
const shippingSection = document.getElementById('shipping-section');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateOrderSummary();
    setupEventListeners();
});

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
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    
    // Event listeners para tipo de entrega
    const deliveryOptions = document.querySelectorAll('input[name="delivery-type"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', handleDeliveryTypeChange);
    });
    
    // Event listener para el dropdown de departamentos
    stateSelect.addEventListener('change', function() {
        updateShippingCalculation();
    });
    
    // Event listener para el checkbox de facturación
    sameAsShippingCheckbox.addEventListener('change', function() {
        toggleBillingInfo();
    });
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
    
    // Validar formulario
    if (!validateForm()) {
        return;
    }
    
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
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
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
        // Para otros métodos de pago, usar PayU
        createPayUForm(total, customerData);
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

function createPayUForm(total, customerData) {
    const referenceCode = 'aurimar_' + Date.now();
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';
    form.target = '_blank';
    form.style.display = 'none';
    
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
        'test': '1',
        'buyerEmail': customerData.email,
        'buyerFullName': customerData.name,
        'buyerPhone': customerData.phone,
        'buyerDocument': customerData.dni,
        'responseUrl': window.location.href,
        'confirmationUrl': window.location.href
    };
    
    // Agregar datos de envío si es a domicilio
    if (customerData.deliveryType === 'home') {
        params['shippingAddress'] = customerData.address;
        params['shippingCity'] = customerData.city;
        params['shippingCountry'] = 'CO';
        params['shippingState'] = customerData.state;
        params['shippingPostalCode'] = customerData.postal || '000000';
    }
    
    Object.keys(params).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    
    setTimeout(() => {
        document.body.removeChild(form);
    }, 1000);
    
    // Mostrar mensaje de éxito
    showCheckoutSuccess(customerData, total);
}

function generatePayUSignature(referenceCode, amount) {
    const apiKey = paymentConfig.payuApiKey;
    const merchantId = paymentConfig.payuMerchantId;
    return btoa(`${apiKey}~${merchantId}~${referenceCode}~${amount}~${paymentConfig.currency}`);
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
        finalizeButton.addEventListener('click', handleFinalizeOrder);
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