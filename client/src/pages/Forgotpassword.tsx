import React, { useState } from "react";
import banner from "../assets/banner2.jpeg";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Loader } from "lucide-react";
import * as authService from "../services/authService";
import { getFirebaseErrorMessage } from "../services/authService";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await authService.resetPassword(email);
      setSubmitted(true);
    } catch (error: any) {
      const message = getFirebaseErrorMessage(error?.code);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
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
          {submitted ? (
            <div className="card bg-surface flex flex-col text-center p-4 gap-3 w-full md:w-[80%]">
              <div>
                <p className="text-primary text-2xl font-bold">
                  Check your inbox
                </p>
                <p className="text-muted">
                  If that email is registered, we've sent a password reset link
                  to <span className="font-semibold">{email}</span>.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary p-2"
              >
                Send again
              </button>
              <p>
                <Link className="text-secondary cursor-pointer" to={"/login"}>
                  Back to login
                </Link>
              </p>
            </div>
          ) : (
            <form
              className="card bg-surface flex flex-col  text-center p-4 gap-3 w-full md:w-[80%] "
              onSubmit={handleSubmit}
            >
              <div>
                <p className="text-primary text-2xl font-bold">
                  Forgot Password
                </p>
                <p className="text-muted text-primary">
                  Enter your email and we'll send you a reset link
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <button
                className={
                  email && !isSubmitting
                    ? "btn-primary p-2 "
                    : "btn-primary-disabled p-2"
                }
                disabled={!email || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send reset link"
                )}
              </button>
              <p>
                Remembered your password?{" "}
                <Link className="text-secondary cursor-pointer" to={"/login"}>
                  Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
