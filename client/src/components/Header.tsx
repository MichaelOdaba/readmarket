import {
  Bell,
  BellDot,
  BookOpen,
  Menu,
  ShoppingCart,
  User2,
  UserCircle2Icon,
} from "lucide-react";
import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useMobile } from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";
import UserMenuMobile from "./UserMenuMobile";

const Header = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const user = useSelector((state: any) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const closeUserMenu = () => {
    setOpenUserMenu(false);
  };
  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <header>
      <div className="bg-white shadow-md h-17 flex justify-between items-center px-6 py-2 sticky md:fixed z-10 top-0 w-full">
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
            <div
              className="text-primary"
              onClick={() => {
                if (user._id) {
                  setOpenMobileMenu(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              {user._id ? (
                <Menu size={35} className="text-primary" />
              ) : (
                <UserCircle2Icon size={35} />
              )}
            </div>
            {openMobileMenu && <UserMenuMobile close={closeMobileMenu} />}
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
              <p className="text-primary font-bold text-xl md:hidden lg:block">
                READ <span className="text-secondary">MARKET</span>
              </p>
            </div>
            <Search />
            <div>
              {user._id ? (
                <div>
                  <div className="flex items-center justify-center text-primary gap-4 px-2">
                    <button
                      className={
                        location.pathname === "/"
                          ? "border-b-2 border-primary py-1"
                          : "hover:bg-neutral-300 p-2 rounded-md"
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
                          : "hover:bg-neutral-300 p-2 rounded-md"
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
                          : "hover:bg-neutral-300 p-2 rounded-md"
                      }
                      onClick={() => {
                        navigate("/dashboard/upload");
                      }}
                    >
                      Upload
                    </button>
                    <div className="hover:bg-neutral-300 p-2 rounded-md">
                      {user._id ? <BellDot /> : <Bell />}
                    </div>
                    <div
                      onClick={() => setOpenUserMenu((prev) => !prev)}
                      className="hover:bg-neutral-300 p-2 rounded-md"
                    >
                      {" "}
                      <User2 />
                    </div>{" "}
                    {openUserMenu && (
                      <div className="absolute top-17 right-8">
                        <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg ">
                          {" "}
                          <UserMenu close={closeUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
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
      </div>
      {isMobile && (
        <div
          className="w-full px-4"
          onClick={() => {
            navigate("/search");
          }}
        >
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;
