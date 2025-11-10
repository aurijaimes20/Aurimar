# 💳 Información sobre PSE (Pago Seguro en Línea)

## ¿Qué es PSE?

PSE es un método de pago colombiano que permite pagar directamente desde la cuenta bancaria del cliente, sin necesidad de tarjeta de crédito o débito.

## ✅ ¿Mercado Pago soporta PSE?

**Sí**, Mercado Pago soporta PSE en Colombia. Cuando configuras tu cuenta de Mercado Pago para Colombia y usas la moneda COP (Pesos Colombianos), PSE aparecerá automáticamente como opción de pago en el checkout.

## 🔧 Configuración

### Lo que ya está hecho:

1. ✅ PSE aparece como opción en el formulario de checkout
2. ✅ La moneda está configurada como COP (Pesos Colombianos)
3. ✅ El código está preparado para procesar pagos PSE

### Lo que necesitas hacer:

1. **Configurar tu cuenta de Mercado Pago para Colombia:**
   - Asegúrate de que tu cuenta esté registrada en Colombia
   - Verifica que tengas habilitado PSE en tu panel de Mercado Pago

2. **Obtener tu Access Token:**
   - Ve a https://www.mercadopago.com.co/developers/panel
   - Obtén tu Access Token
   - Configúralo en `checkout.html` (ver PASOS-MERCADO-PAGO.md)

## 🎯 Cómo funciona

1. El cliente selecciona **PSE** como método de pago
2. Completa el formulario de checkout
3. Al hacer clic en "Finalizar pedido", se redirige a Mercado Pago
4. En Mercado Pago, el cliente verá la opción de PSE
5. Selecciona su banco y completa el pago desde su cuenta bancaria

## 📋 Bancos soportados por PSE

PSE funciona con la mayoría de bancos colombianos, incluyendo:
- Bancolombia
- Banco de Bogotá
- Davivienda
- Banco de Occidente
- Banco Popular
- Y muchos más...

## ⚠️ Importante

- PSE solo funciona para pagos en **Pesos Colombianos (COP)**
- El cliente debe tener cuenta bancaria en Colombia
- Los pagos PSE pueden tardar unos minutos en confirmarse
- Mercado Pago maneja automáticamente la integración con PSE

## 🧪 Pruebas

Para probar PSE en modo sandbox:
1. Usa las credenciales de prueba de Mercado Pago
2. En el checkout de prueba, selecciona PSE
3. Usa los datos de prueba que Mercado Pago proporciona

## 📚 Más información

- Documentación de Mercado Pago: https://www.mercadopago.com.co/developers/es/docs
- Información sobre PSE: https://www.mercadopago.com.co/developers/es/docs/checkout-api/integration-test/test-cards

