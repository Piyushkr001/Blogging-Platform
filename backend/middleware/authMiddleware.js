const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Checks if the token exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // 2. Extracts the token
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verifies the token with the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attaches the decoded user to req.user
    req.user = decoded;

    // 5. Calls next() to proceed
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
