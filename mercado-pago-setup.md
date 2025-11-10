# Configuración de Mercado Pago para Aurimar

## Pasos rápidos para activar los pagos

### 1. Crear cuenta en Mercado Pago
- Ve a https://www.mercadopago.com.co
- Crea una cuenta o inicia sesión
- Ve a "Desarrolladores" → "Tus integraciones"

### 2. Obtener credenciales
- **Public Key**: Se usa en el frontend (puede ser pública)
- **Access Token**: Se usa en el servidor (MANTÉNLO SECRETO)

### 3. Configurar en tu código

#### Opción A: Usar un servidor (Recomendado para producción)

Crea un endpoint en tu servidor (ejemplo con Node.js):

```javascript
// api/create-preference.js
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TU_ACCESS_TOKEN_AQUI'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const preference = await mercadopago.preferences.create({
      items: req.body.items,
      payer: req.body.payer,
      back_urls: req.body.back_urls,
      auto_return: 'approved',
      external_reference: req.body.external_reference
    });

    res.status(200).json({ id: preference.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

Luego actualiza `checkout.js`, línea 729:

```javascript
async function createMercadoPagoPreference(preferenceData) {
    try {
        const response = await fetch('/api/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preferenceData)
        });
        const { id } = await response.json();
        window.location.href = `https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=${id}`;
    } catch (error) {
        console.error('Error:', error);
        showMercadoPagoSetupInstructions(preferenceData);
    }
}
```

#### Opción B: Usar Vercel/Netlify Functions (Más fácil)

1. Crea una carpeta `api` en tu proyecto
2. Crea `api/create-preference.js` con el código de arriba
3. Instala: `npm install mercadopago`
4. Despliega en Vercel o Netlify

### 4. Configurar Public Key

En `checkout.html` o antes de cargar el script, agrega:

```html
<script>
  window.AURIMAR_PAYMENTS = {
    mercadoPagoPublicKey: 'TU_PUBLIC_KEY_AQUI'
  };
</script>
```

## Pruebas

Para probar en modo sandbox:
- Usa las credenciales de prueba de Mercado Pago
- Tarjeta de prueba: 5031 7557 3453 0604
- CVV: 123
- Fecha: cualquier fecha futura

## Producción

1. Cambia a credenciales de producción
2. Actualiza `sandbox: false` en `paymentConfig`
3. Asegúrate de que el Access Token esté en el servidor, nunca en el cliente

## Soporte

Documentación oficial: https://www.mercadopago.com.co/developers/es/docs

