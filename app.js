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
  let totalDistance = 0;

  
  for (let product in order) {
    totalCost += order[product] * 10; 
  }

  
  let bestDeliveryCost = Infinity;

  
  if (order.A || order.B || order.C) {
    
    totalDistance = distance.C1.L1;
    bestDeliveryCost = Math.min(bestDeliveryCost, totalDistance * costPerKm);
  }

  if (order.D || order.E || order.F) {
    
    totalDistance = distance.C2.L1;
    bestDeliveryCost = Math.min(bestDeliveryCost, totalDistance * costPerKm);
  }

  if (order.G || order.H || order.I) {
    
    totalDistance = distance.C3.L1;
    bestDeliveryCost = Math.min(bestDeliveryCost, totalDistance * costPerKm);
  }

  
  totalCost += bestDeliveryCost;

  return totalCost;
};


app.post('/calculate-delivery-cost', (req, res) => {
  const order = req.body;  
  const totalCost = calculateCost(order);  
  res.json({ deliveryCost: totalCost });  
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
