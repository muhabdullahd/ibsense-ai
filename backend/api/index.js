const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Debug: Log the MONGO_URI
console.log('MongoDB Connection String:', process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.set('strictQuery', true); // Suppress deprecation warnings
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    console.error('Full error:', err);
  });

// Define routes
const logRoutes = require('../routes/logRoutes');
app.use('/api/logs', logRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

// Export the app as a handler for Vercel
module.exports = app;
