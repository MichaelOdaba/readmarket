const roleAuth = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const role = req.userRole;
      if (!role) {
        return res.status(401).json({
          message: "User role not found in token",
          success: false,
        });
      }
      console.log("Allowed roles:", allowedRoles);
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
          success: false,
        });
      }

      next();
    } catch (error) {
      console.log("RoleAuth error:", error.message);
      return res.status(500).json({
        message: "An error occurred during role authorization",
        success: false,
        error: error.message,
      });
    }
  };
};
export default roleAuth;
