const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static('.'));

// Serve index.html for all routes (SPA support)
// BUT: Allow actual HTML files to be served first
app.get('*', (req, res) => {
  // If request is for a specific .html file, let express.static handle it
  if (req.path.endsWith('.html') && req.path !== '/index.html') {
    // express.static already tried to serve it, if we're here it doesn't exist
    return res.status(404).send('File not found');
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});