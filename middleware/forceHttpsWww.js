// middleware/forceHttpsWww.js
function forceHttpsWww(req, res, next) {
  // If not HTTPS, redirect
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://www.${req.hostname}${req.url}`);
  }

  // If no www, redirect to www
  if (!req.hostname.startsWith('www.')) {
    return res.redirect(301, `https://www.${req.hostname}${req.url}`);
  }

  next();
}

module.exports = forceHttpsWww;