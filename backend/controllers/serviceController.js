const pool = require('../config/db');

// Get all services
const getAllServices = (req, res) => {
  pool.query('SELECT * FROM services', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Get service by ID
const getServiceById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM services WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Create a new service
const createService = (req, res) => {
  const { name, description, price } = req.body;
  pool.query(
    'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// Update an existing service
const updateService = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price } = req.body;
  pool.query(
    'UPDATE services SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
    [name, description, price, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

// Delete a service
const deleteService = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM services WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Service deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
