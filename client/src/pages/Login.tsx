import React, { useState } from "react";
import banner from "../assets/WhatsApp Image 2026-02-28 at 8.56.50 PM (1).jpeg";
import type { LoginFormData } from "../types/profile";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validateForm = Object.values(userData).every((el) => el);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async () => {};

  return (
    <section className={"container section"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center h-full ">
        <div className=" h-70  flex justify-center lg:h-[80%]">
          <img
            src={banner}
            alt="read market banner"
            className="object-cover h-full"
          />
        </div>
        <div className="h-full flex items-center justify-center p-4">
          <form
            className="card bg-surface flex flex-col  text-center p-4 gap-3 w-full md:w-[80%] "
            onSubmit={handleSubmit}
          >
            <div>
              <p className="text-primary text-2xl font-bold">Welcome Back</p>
              <p className="text-muted">Please enter your details to sign in</p>
            </div>

            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="email" className="w-full" autoFocus>
                Email Address:
              </label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder={"You@Example.com"}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="password" className="w-full">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="input w-full"
                onChange={handleInputChange}
                value={userData.password}
              />
            </div>
            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="confirmPassword" className="w-full">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleInputChange}
                value={userData.confirmPassword}
                className="input w-full"
              />
            </div>
            <button
              className={
                validateForm ? "btn-primary p-2 " : "btn-primary-disabled p-2"
              }
              disabled={!validateForm}
            >
              Register
            </button>
            <p>
              Don't have an account?{" "}
              <button
                className="text-secondary cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
