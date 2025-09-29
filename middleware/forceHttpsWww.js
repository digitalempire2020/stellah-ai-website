// middleware/forceHttpsWww.js
function forceHttpsWww(req, res, next) {
  const hostname = req.hostname || req.headers.host || 'stellah.ai';

  // If not HTTPS, redirect
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://www.stellah.ai${req.url}`);
  }

  // If no www or if apex domain, redirect to www
  if (!hostname.startsWith('www.') || hostname === 'stellah.ai') {
    return res.redirect(301, `https://www.stellah.ai${req.url}`);
  }

  next();
}

module.exports = forceHttpsWww;