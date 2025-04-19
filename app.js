const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const distance = {
  C1: { L1: 10 },
  C2: { L1: 20 },
  C3: { L1: 30 }
};

const costPerKm = 5;

const calculateCost = (order) => {
  let totalCost = 0;
  let deliveryCost = 0;

  for (let product in order) {
    totalCost += order[product] * 10;
  }

  if (order.A || order.B || order.C) {
    deliveryCost += distance.C1.L1 * costPerKm;
  }

  if (order.D || order.E || order.F) {
    deliveryCost += distance.C2.L1 * costPerKm;
  }

  if (order.G || order.H || order.I) {
    deliveryCost += distance.C3.L1 * costPerKm;
  }

  return totalCost + deliveryCost;
};

app.post('/calculate-delivery-cost', (req, res) => {
  const order = req.body;
  const totalCost = calculateCost(order);
  res.json({ deliveryCost: totalCost });
});


app.get('/', (req, res) => {
  res.send('API is running ✅');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
