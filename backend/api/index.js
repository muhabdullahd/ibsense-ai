require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Import and use log routes
const logRoutes = require('../routes/logRoutes');
app.use('/api/logs', logRoutes);

// Add a route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app as a module for Vercel
module.exports = app;



// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const MONGO_URI = process.env.MONGO_URI;

// // Import and use log routes
// const logRoutes = require('../routes/logRoutes'); // Adjusted path
// app.use('/api/logs', logRoutes);

// // Add a route to handle GET requests to the root URL
// app.get('/', (req, res) => {
//   res.send('Welcome to the Backend Server!');
// });

// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Export as a serverless function
// module.exports = app;

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.set('strictQuery', true); // Suppress Mongoose deprecation warning
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Routes
// const logRoutes = require('../routes/logRoutes');
// app.use('/api/logs', logRoutes);

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Backend Server!');
// });

// // Export the app as a module for Vercel
// module.exports = app;
