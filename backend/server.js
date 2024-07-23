const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/products', productRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync(); // This will create the tables if they don't exist
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));
  
