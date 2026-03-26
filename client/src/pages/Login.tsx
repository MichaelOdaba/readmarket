import React, { useState, type SubmitEvent } from "react";
import banner from "../assets/banner2.jpeg";
import type { LoginFormData } from "../types/profile";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import { Eye, EyeClosed, LockIcon, Mail } from "lucide-react";

import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import getUser from "../utils/getUser";
const Login: React.FC = () => {
  const [userData, setUserData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const validateForm = Object.values(userData).every((el) => el);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      const response = await customAxios({
        ...summaryApi.login,
        data: userData,
      });

      console.log(response);
      toast.success(response.data.message);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      const fetchedUser = await getUser();

      console.log(fetchedUser);
      dispatch(setUser(fetchedUser));

      setUserData({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
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
                validateForm ? "btn-primary p-2 " : "btn-primary-disabled p-2"
              }
              disabled={!validateForm}
            >
              Sign in
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
