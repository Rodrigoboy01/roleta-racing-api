require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const digitopayAuth = {
  headers: {
    'Authorization': `Bearer ${process.env.DIGITOPAY_API_TOKEN}`,
    'X-API-Secret': process.env.DIGITOPAY_API_SECRET,
    'Content-Type': 'application/json'
  }
};

app.post('/api/payment', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.digitopayoficial.com.br/v1/payments', 
      req.body, 
      digitopayAuth
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});