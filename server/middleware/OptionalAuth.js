import jwt from "jsonwebtoken";

// Optional auth - extracts userId if token is present, but doesn't fail if missing
const optionalAuth = (req, res, next) => {
  try {
    let token = req.cookies.access_token;

    // Extract from Authorization header if not in cookies
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);
      }
    }

    // If token exists, verify it
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decoded) {
          req.userId = decoded.id;
          req.userRole = decoded.role;
        }
      } catch (error) {
        console.log("Optional auth - token invalid:", error.message);
        // Continue without setting userId
      }
    }

    next();
  } catch (error) {
    console.log("Optional auth error:", error.message);
    // Always continue, even on error
    next();
  }
};

export default optionalAuth;
