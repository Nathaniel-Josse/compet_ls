const express = require('express');
const router = express.Router();

const subscriptions = []; // partagé avec d'autres modules

router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Souscription enregistrée' });
});

module.exports = { router, subscriptions };
