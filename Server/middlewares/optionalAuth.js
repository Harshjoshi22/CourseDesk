import jwt from "jsonwebtoken";

 const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Guest user
    if (!token) {
      return next();
    }

    // Logged-in user
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;

    next();
  } catch (error) {
    // Invalid or expired token -> continue as guest
    next();
  }
};

export default optionalAuth;