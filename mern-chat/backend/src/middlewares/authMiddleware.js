const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
}

module.exports = authMiddleware;
