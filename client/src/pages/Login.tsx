import React, { useState } from "react";
import banner from "../assets/banner2.jpeg";
import type { LoginFormData } from "../types/profile";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Eye, EyeClosed, LockIcon, Mail, Loader } from "lucide-react";

import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import fetchUserDetails from "../utils/fetchUser";
import * as authService from "../services/authService";
import { auth } from "../config/firebase";

// Maps Firebase auth error codes to user-friendly messages
const getFirebaseErrorMessage = (code?: string): string => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    default:
      return "Something went wrong. Please try again";
  }
};

const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const validateForm = Object.values(userData).every((el) => el);
  const [showPassword, setShowPassword] = useState(false);
  const [islogin, setislogin] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setislogin(true);
    try {
      await authService.login(userData.email, userData.password);
      toast.success("Signed in successfully");

      const fetchedUser = await fetchUserDetails();
      dispatch(setUser(fetchedUser));

      setUserData({
        email: "",
        password: "",
      });
      navigate("/app");
    } catch (error: any) {
      setislogin(false);
      const message = getFirebaseErrorMessage(error?.code);
      toast.error(message);
      console.log(error);
    }
  };

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
              <div className="flex w-full items-center gap-2 input focus-within:border-[#103a3f] ">
                <div className="text-neutral-600">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  className="outline-none w-full"
                  placeholder={"You@Example.com"}
                  onChange={handleInputChange}
                  value={userData.email}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="password" className="w-full">
                Password:
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-[#103a3f]">
                <div className="text-neutral-600">
                  <LockIcon size={20} />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full outline-none"
                  onChange={handleInputChange}
                  value={userData.password}
                />
                <div
                  className="text-neutral-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </div>
              </div>
            </div>

            <button
              className={
                validateForm && !islogin
                  ? "btn-primary p-2 "
                  : "btn-primary-disabled p-2"
              }
              disabled={!validateForm || islogin}
            >
              {islogin ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader size={18} className="animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
            <p>
              Don't have an account?{" "}
              <Link className="text-secondary cursor-pointer" to={"/register"}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
