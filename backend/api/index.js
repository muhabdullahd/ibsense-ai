require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow requests from the frontend
app.use(cors({
  // origin: 'http://localhost:3000', // Allow requests from your frontend
  origin: 'https://ibsense-ai.vercel.app'
}));

// Test API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use(express.json());

const PORT = process.env.PORT || 10000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
console.log('MongoDB Connection String:', MONGO_URI);

// mongoose.set('strictQuery', true); // Suppress deprecation warnings

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

// Start Server - Bind to the correct port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
