import React, { useState, type SubmitEvent } from "react";
import banner from "../assets/banner2.jpeg";
import type { RegisterFormData } from "../types/profile";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import {
  Eye,
  EyeClosed,
  Lock,
  LockKeyholeIcon,
  Mail,
  User,
  UserCheck,
  Loader,
} from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validateForm = Object.values(userData).every((el) => el);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    setIsRegistering(true);
    try {
      const response = await customAxios({
        ...summaryApi.register,
        data: userData,
      });

      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.message);
      setIsRegistering(false);
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
              <p className="text-primary text-2xl font-bold">
                Welcome to <span className="text-[#15324a]">READ</span>
                <span className="text-accent"> MARKET</span>
              </p>
              <p className="text-muted">
                Please enter your details to register
              </p>
            </div>

            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="email" className="w-full">
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
              <label htmlFor="firstName" className="w-full">
                First Name:
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-[#103a3f] ">
                <div className="text-neutral-600">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="firstName"
                  className="outline-none w-full"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="lastName" className="w-full">
                Last Name:
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-[#103a3f] ">
                <div className="text-neutral-600">
                  <UserCheck size={20} />
                </div>
                <input
                  type="text"
                  name="lastName"
                  className="outline-none w-full"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="password" className="w-full">
                Password:
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-[#103a3f] ">
                <div className="text-neutral-600">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="outline-none w-full"
                  onChange={handleInputChange}
                  value={userData.password}
                />
                <div onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <EyeClosed />}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full px-2 text-left gap-1">
              <label htmlFor="confirmPassword" className="w-full">
                Password:
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-[#103a3f] ">
                <div className="text-neutral-600">
                  <LockKeyholeIcon size={20} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="outline-none w-full"
                  onChange={handleInputChange}
                  value={userData.confirmPassword}
                />
                <div onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </div>
              </div>
            </div>
            <button
              className={
                validateForm && !isRegistering
                  ? "btn-primary p-2 "
                  : "btn-primary-disabled p-2"
              }
              disabled={!validateForm || isRegistering}
            >
              {isRegistering ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader size={18} className="animate-spin" />
                  <span>Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
            <p>
              Already have an account?{" "}
              <Link className="text-secondary cursor-pointer" to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
