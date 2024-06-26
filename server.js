const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const materialRoutes = require('./routes/materialRoutes');
const errorHandler = require('./utils/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to 3D-Printing-Materials Home');
});

// Mount routes
app.use('/materials', materialRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});