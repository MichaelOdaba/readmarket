import jwt from "jsonwebtoken";
const generateAccessToken = async (userId, userRole) => {
  const accessToken = jwt.sign(
    { id: userId, role: userRole },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  return accessToken;
};

export default generateAccessToken;
