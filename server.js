const express = require('express');
const path = require('path');
const forceHttpsWww = require('./middleware/forceHttpsWww');

const app = express();

// Force redirect for apex domain at the route level
app.use((req, res, next) => {
  const hostname = req.hostname || req.headers.host || '';
  // console.log(`Route check - Host: ${req.headers.host}, Hostname: ${hostname}`); // Debug logging disabled

  if (hostname === 'stellah.ai') {
    // console.log(`Force redirecting apex domain: ${hostname} -> www.stellah.ai`); // Debug logging disabled
    return res.redirect(301, `https://www.stellah.ai${req.url}`);
  }
  next();
});

// Apply the redirect middleware
app.use(forceHttpsWww);

// Serve static files
app.use(express.static('.'));

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});