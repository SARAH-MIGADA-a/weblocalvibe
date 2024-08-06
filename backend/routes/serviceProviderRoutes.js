const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceProviderController');

// Define routes for service providers
router.get('/', serviceProviderController.getAllServiceProviders);
router.get('/:id', serviceProviderController.getServiceProviderById);
router.post('/', serviceProviderController.createServiceProvider);
router.put('/:id', serviceProviderController.updateServiceProvider);
router.delete('/:id', serviceProviderController.deleteServiceProvider);

module.exports = router;

