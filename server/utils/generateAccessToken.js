import jwt from "jsonwebtoken";
const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  return accessToken;
};

export default generateAccessToken;
