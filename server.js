const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Initialize dotenv to read from .env
dotenv.config();

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API route to get the Pexels API key
app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.PEXELS_API_KEY });
});

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
