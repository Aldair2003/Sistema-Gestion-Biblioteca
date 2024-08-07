const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.status(403).json({ message: 'Token no válido' });
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.status(403).json({ message: 'Token no proporcionado' });
  }
};

module.exports = authMiddleware;
