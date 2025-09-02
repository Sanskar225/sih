import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate user using JWT
 */
export const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
