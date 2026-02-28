import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const generateRefreshToken = async (userId) => {
  const refreshToken = await jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );

  const updateUserRefreshToken = await userModel.updateOne(
    { _id: userId },
    {
      refresh_token: refreshToken,
    }
  );
  return refreshToken;
};

export default generateRefreshToken;
