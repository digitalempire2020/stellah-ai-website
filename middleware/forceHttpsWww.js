// middleware/forceHttpsWww.js
function forceHttpsWww(req, res, next) {
  const hostname = req.hostname || req.headers.host || 'stellah.ai';
  const isHttps = req.headers['x-forwarded-proto'] === 'https' || req.secure || req.protocol === 'https';

  // Debug logging
  console.log(`Request - Host: ${req.headers.host}, Hostname: ${hostname}, Proto: ${req.headers['x-forwarded-proto']}, Secure: ${req.secure}, IsHttps: ${isHttps}`);

  // If no www or if apex domain, redirect to www (for HTTPS requests)
  if (isHttps && !hostname.startsWith('www.') && hostname.includes('stellah.ai')) {
    console.log(`Redirecting apex domain to www: ${hostname}`);
    return res.redirect(301, `https://www.stellah.ai${req.url}`);
  }

  // If not HTTPS, redirect to HTTPS with www
  if (!isHttps) {
    console.log(`Redirecting HTTP to HTTPS: ${hostname}`);
    return res.redirect(301, `https://www.stellah.ai${req.url}`);
  }

  next();
}

module.exports = forceHttpsWww;