import {
  Bell,
  BellDot,
  BookOpen,
  ShoppingCart,
  User2,
  UserCircle2Icon,
} from "lucide-react";
import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useMobile } from "../hooks/useMobile";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationAvailable, setnotificationAvailable] = useState(false);

  return (
    <header className="bg-white shadow-md h-17 flex justify-between items-center px-6 py-2 sticky md:fixed z-10 top-0 w-full">
      {isMobile ? (
        <div className="flex justify-between items-center w-full">
          <div
            className="flex gap-2 items-center justify-center cursor-pointer text-accent"
            onClick={() => {
              navigate("/");
            }}
          >
            <BookOpen size={35} />
          </div>
          <div className="text-primary">
            <UserCircle2Icon size={35} />
          </div>
        </div>
      ) : (
        <>
          <div
            className="flex gap-2 items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <BookOpen className="text-accent" />
            <p className="text-primary font-bold text-xl">
              READ <span className="text-secondary">MARKET</span>
            </p>
          </div>
          <Search />
          <div>
            {isLoggedIn ? (
              <div className="flex items-center justify-center text-primary gap-6 px-2">
                <button
                  className={
                    location.pathname === "/"
                      ? "border-b-2 border-primary py-1"
                      : ""
                  }
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </button>
                <button
                  className={
                    location.pathname === "/dashboard/library"
                      ? "border-b-2 border-primary py-1"
                      : ""
                  }
                  onClick={() => {
                    navigate("/dashboard/library");
                  }}
                >
                  Library
                </button>
                <button
                  className={
                    location.pathname === "/dashboard/upload"
                      ? "border-b-2 border-primary py-1"
                      : ""
                  }
                  onClick={() => {
                    navigate("/dashboard/upload");
                  }}
                >
                  Upload
                </button>
                {notificationAvailable ? <BellDot /> : <Bell />}
                <User2 />
              </div>
            ) : (
              <div className="flex px-2 gap-4">
                <button
                  className="btn-secondary text-sm"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>
                <button className="btn-primary text-sm flex gap-2 items-center justify-center">
                  <p>My Cart </p>
                  <ShoppingCart className="animate-bounce" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
