const pool = require('../config/db');

// Get all bookings
const getAllBookings = (req, res) => {
  pool.query('SELECT * FROM bookings', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Get booking by ID
const getBookingById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM bookings WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Create a new booking
const createBooking = (req, res) => {
  const { user_id, service_id, date, time } = req.body;
  pool.query(
    'INSERT INTO bookings (user_id, service_id, date, time) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, service_id, date, time],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// Update an existing booking
const updateBooking = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, service_id, date, time } = req.body;
  pool.query(
    'UPDATE bookings SET user_id = $1, service_id = $2, date = $3, time = $4 WHERE id = $5 RETURNING *',
    [user_id, service_id, date, time, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

// Delete a booking
const deleteBooking = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM bookings WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Booking deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
