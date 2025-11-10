// Ejemplo de endpoint para crear preferencia de Mercado Pago
// Para usar con Vercel, Netlify Functions, o cualquier servidor Node.js

// Instalar: npm install mercadopago

const mercadopago = require('mercadopago');

// Configurar con tu Access Token (obtenerlo de https://www.mercadopago.com.co/developers/panel)
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TU_ACCESS_TOKEN_AQUI'
});

// Para Vercel/Netlify Functions
exports.handler = async (event) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const preferenceData = JSON.parse(event.body);

    // Crear preferencia en Mercado Pago
    const preference = await mercadopago.preferences.create({
      items: preferenceData.items,
      payer: preferenceData.payer,
      back_urls: preferenceData.back_urls,
      auto_return: 'approved',
      external_reference: preferenceData.external_reference,
      statement_descriptor: 'AURIMAR'
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ id: preference.body.id })
    };
  } catch (error) {
    console.error('Error creando preferencia:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Para servidor Express.js
/*
const express = require('express');
const router = express.Router();

router.post('/create-preference', async (req, res) => {
  try {
    const preference = await mercadopago.preferences.create({
      items: req.body.items,
      payer: req.body.payer,
      back_urls: req.body.back_urls,
      auto_return: 'approved',
      external_reference: req.body.external_reference,
      statement_descriptor: 'AURIMAR'
    });

    res.json({ id: preference.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
*/

