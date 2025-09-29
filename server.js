const express = require('express');
const path = require('path');
const forceHttpsWww = require('./middleware/forceHttpsWww');

const app = express();

// Apply the redirect middleware
app.use(forceHttpsWww);

// Serve static files
app.use(express.static('.'));

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});