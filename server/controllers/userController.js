import bcryptjs from "bcryptjs";
import userModel from "../models/userModel.js";

export async function registerUserController(req, res) {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "pls fill all the required fields",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "This user already exists",
        success: false,
      });
    }

    const checkPasswordMatch = password === confirmPassword;
    if (!checkPasswordMatch) {
      return res.status(400).json({
        message: "confirm password and password do not match ",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const registeredUser = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    console.log(registeredUser);
    return res.status(201).json({
      message: `new user ${registeredUser.firstname} created successfully`,
      success: true,
      data: registeredUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occured while registering the user",
      success: false,
      error: error.message || error,
    });
  }
}
