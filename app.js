const express = require('express');
const app = express();

app.use(cors({
  origin: "*",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post('/webhook', (req, res) => {
  const data = req.body;

  // Verifica status e valor
  if (data.status === 'approved' && Number(data.amount) === 10.00) {
    console.log('Pagamento aprovado via DigitoPay para:', data.payer_email || 'Desconhecido');

    // Aqui você poderia salvar no banco ou emitir bilhete etc.
    return res.status(200).json({
      success: true,
      message: 'Crédito liberado (2 giros)'
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Pagamento não aprovado ou valor incorreto'
  });
});

app.get('/', (req, res) => {
  res.send('API Roleta Racing está online.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
