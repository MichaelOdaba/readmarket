import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.access_token || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "provide access token",
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!verifyToken) {
      return res.status(403).json({
        message: "invalid access token",
        success: false,
      });
    }

    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "an error occured while authenticating",
      success: false,
      error: error.message,
    });
  }
};
export default auth;
