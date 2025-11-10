# 🚀 Pasos para Activar Mercado Pago en tu Página

## Paso 1: Crear cuenta en Mercado Pago

1. Ve a https://www.mercadopago.com.co
2. Haz clic en "Crear cuenta" o "Iniciar sesión"
3. Completa el registro con tus datos

## Paso 2: Obtener tus credenciales (Access Token)

1. Una vez dentro de tu cuenta, ve a: https://www.mercadopago.com.co/developers/panel
2. Si es la primera vez, te pedirá crear una "Aplicación"
   - Dale un nombre (ej: "Aurimar Tienda")
   - Acepta los términos
3. En el panel verás dos tipos de credenciales:
   - **Credenciales de prueba** (para probar sin dinero real)
   - **Credenciales de producción** (para recibir pagos reales)

4. Copia el **Access Token** (es una cadena larga que empieza con "TEST-" para pruebas o "APP_USR-" para producción)

## Paso 3: Configurar en tu página

### Opción Rápida (Solo para pruebas):

Abre el archivo `checkout.html` y agrega esto ANTES de la línea que dice `<script src="https://sdk.mercadopago.com/js/v2"></script>`:

```html
<script>
  window.AURIMAR_PAYMENTS = {
    mercadoPagoAccessToken: 'TU_ACCESS_TOKEN_AQUI'
  };
</script>
```

Reemplaza `TU_ACCESS_TOKEN_AQUI` con el Access Token que copiaste.

### Ejemplo completo:

```html
<!-- Agregar esto antes del SDK de Mercado Pago -->
<script>
  window.AURIMAR_PAYMENTS = {
    mercadoPagoAccessToken: 'TEST-1234567890-123456-123456-123456-1234567890'
  };
</script>
<!-- SDK de Mercado Pago -->
<script src="https://sdk.mercadopago.com/js/v2"></script>
```

## Paso 4: Probar

1. Agrega productos al carrito
2. Ve al checkout
3. Completa los datos
4. Selecciona un método de pago (tarjeta, Nequi, etc.)
5. Haz clic en "Finalizar pedido"

### Para pruebas, usa estas tarjetas:

**Tarjeta de crédito de prueba:**
- Número: `5031 7557 3453 0604`
- CVV: `123`
- Fecha: Cualquier fecha futura (ej: 12/25)
- Nombre: Cualquier nombre

**Otros métodos:**
- Nequi, Daviplata, PSE: Usa los datos de prueba que Mercado Pago te proporcione

## ⚠️ Importante

- **Para pruebas**: Usa las credenciales que empiezan con "TEST-"
- **Para producción**: Necesitas completar el proceso de homologación en Mercado Pago y usar credenciales de producción
- **Nunca compartas tu Access Token** públicamente (no lo subas a GitHub sin protección)

## ¿Problemas?

- Si no ves el panel de desarrolladores: Asegúrate de estar logueado
- Si el pago no funciona: Verifica que el Access Token esté correctamente copiado (sin espacios)
- Para más ayuda: https://www.mercadopago.com.co/developers/es/support

