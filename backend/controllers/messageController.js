const pool = require('../config/db');

const getAllMessages = (req, res) => {
  pool.query('SELECT * FROM messages', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getMessageById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM messages WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createMessage = (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  pool.query(
    'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
    [sender_id, receiver_id, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

const updateMessage = (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  pool.query(
    'UPDATE messages SET content = $1 WHERE id = $2 RETURNING *',
    [content, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const deleteMessage = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM messages WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Message deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
