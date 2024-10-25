const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config(); // To use environment variables

// Get the Pexels API Key from environment variables
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Middleware to serve static files (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch the Pexels API key securely
app.get('/api-key', (req, res) => {
  if (PEXELS_API_KEY) {
    res.json({ apiKey: PEXELS_API_KEY });
  } else {
    res.status(500).json({ error: 'API key is not set' });
  }
});

// Catch-all route to serve the index.html file for any non-API routes (to handle client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
