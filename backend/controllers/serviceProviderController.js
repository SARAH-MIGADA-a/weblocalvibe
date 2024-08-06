const pool = require('../config/db');

// Get all service providers
const getAllServiceProviders = (req, res) => {
  pool.query('SELECT * FROM service_providers', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Get service provider by ID
const getServiceProviderById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM service_providers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Create a new service provider
const createServiceProvider = (req, res) => {
  const { name, service_type, availability } = req.body;
  pool.query(
    'INSERT INTO service_providers (name, service_type, availability) VALUES ($1, $2, $3) RETURNING *',
    [name, service_type, availability],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// Update an existing service provider
const updateServiceProvider = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, service_type, availability } = req.body;
  pool.query(
    'UPDATE service_providers SET name = $1, service_type = $2, availability = $3 WHERE id = $4 RETURNING *',
    [name, service_type, availability, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

// Delete a service provider
const deleteServiceProvider = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM service_providers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Service provider deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllServiceProviders,
  getServiceProviderById,
  createServiceProvider,
  updateServiceProvider,
  deleteServiceProvider,
};
