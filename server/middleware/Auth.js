import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.access_token;

    // Extract from Authorization header if not in cookies
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "provide access token",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(403).json({
        message: "invalid access token",
        success: false,
      });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.log("Auth error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "invalid or malformed access token",
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "an error occurred while authenticating",
      success: false,
      error: error.message,
    });
  }
};
export default auth;
