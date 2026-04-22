import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

const createAdminUserIfNotExists = async () => {
  try {
    const existingAdmin = await userModel.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }
    const adminData = {
      firstName: "Admin",
      lastName: "User",
      email: "odabamichael1@gmail.com",
      password: await bcryptjs.hash("admin123", 10),
      role: "ADMIN",
    };
    const newAdmin = await userModel.create(adminData);
    console.log("Admin user created successfully:", newAdmin);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};
export default createAdminUserIfNotExists;
