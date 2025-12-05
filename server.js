const express = require('express');
const path = require('path');

const app = express();

// Serve static files with directory index support
app.use(express.static('.', {
  extensions: ['html'],
  index: 'index.html'
}));

// Handle clean URLs: check if path/index.html exists before falling back to SPA
app.get('*', (req, res) => {
  const fs = require('fs');

  // If request is for a specific .html file, let express.static handle it
  if (req.path.endsWith('.html') && req.path !== '/index.html') {
    return res.status(404).send('File not found');
  }

  // Check if this is a clean URL (directory with index.html)
  const cleanUrlPath = path.join(__dirname, req.path, 'index.html');
  if (fs.existsSync(cleanUrlPath)) {
    return res.sendFile(cleanUrlPath);
  }

  // Fall back to main index.html for SPA routes
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});