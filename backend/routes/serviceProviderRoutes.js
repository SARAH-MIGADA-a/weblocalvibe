// routes/serviceProviderRoutes.js
const express = require('express');
const ServiceProvider = require('../models/ServiceProvider');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const providers = await ServiceProvider.findAll();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const provider = await ServiceProvider.create(req.body);
    res.status(201).json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
