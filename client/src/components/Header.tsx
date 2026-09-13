import {
  Bell,
  Menu,
  ShoppingCart,
  User2,
  UserCircle2Icon,
  Moon,
  Sun,
} from "lucide-react";
import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useMobile } from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import UserMenuMobile from "./UserMenuMobile";
import NotificationsDropdown from "./NotificationsDropdown";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import { useTheme } from "../hooks/useTheme";
import logo from "../assets/read_market_logo_transparent.png"

const Header = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const user = useSelector((state: any) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const closeUserMenu = () => {
    setOpenUserMenu(false);
  };
  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  // Fetch unread notifications count periodically
  useEffect(() => {
    if (user._id) {
      const fetchUnreadCount = async () => {
        try {
          const response = await customAxios({
            ...summaryApi.getNotifications,
          });
          if (response.data.success) {
            setUnreadCount(response.data.data.unreadCount);
          }
        } catch (error) {
          // Silently fail - notifications are not critical
        }
      };

      fetchUnreadCount();
      // Refresh every 30 seconds
      const interval = setInterval(fetchUnreadCount, 10000);
      return () => clearInterval(interval);
    }
  }, [user._id]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10">
      <div className="glass-header h-17 flex justify-between items-center py-6 px-2 w-full">
        {isMobile ? (
          <div className="flex justify-between items-center w-full">
            <div
              className="flex gap-2 items-center justify-center cursor-pointer text-accent"
              onClick={() => {
                navigate("/app");
              }}
            >
             <img src={logo} alt="Read Market Logo" className="h-10 w-auto" />
            </div>
            <Search compact />
            <div className="flex items-center gap-2 text-primary">
              <button
                type="button"
                className="p-2 rounded-md hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Shopping cart"
                title="Shopping cart"
              >
                <ShoppingCart size={24} />
              </button>
              <button
                type="button"
                className="text-primary"
                onClick={() => {
                  if (user._id) {
                    setOpenMobileMenu(true);
                  } else {
                    navigate("/app/login");
                  }
                }}
                aria-label={user._id ? "Open menu" : "Sign in"}
              >
                {user._id ? (
                  <Menu size={30} />
                ) : (
                  <UserCircle2Icon size={30} />
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex gap-2 items-center justify-center cursor-pointer"
              onClick={() => {
                navigate("/app");
              }}
            >
              <img src={logo} alt="Read Market Logo" className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-4">
            </div>
            <Search />
            <div>
              {user._id ? (
                <div>
                  <div className="flex items-center justify-center text-primary gap-4 px-2">
                    <button
                      className={
                        location.pathname === "/app"
                          ? "border-b-2 border-primary py-1"
                          : "hover:bg-neutral-300 p-2 rounded-md"
                      }
                      onClick={() => {
                        navigate("/app");
                      }}
                    >
                      Home
                    </button>
                    <button
                      className={
                        location.pathname === "/app/dashboard/library"
                          ? "border-b-2 border-primary py-1"
                          : "hover:bg-neutral-300 p-2 rounded-md"
                      }
                      onClick={() => {
                        navigate("/app/dashboard/library");
                      }}
                    >
                      Library
                    </button>
                    <button
                      className={
                        location.pathname === "/app/dashboard/upload"
                          ? "border-b-2 border-primary py-1"
                          : "hover:bg-neutral-300 p-2 rounded-md"
                      }
                      onClick={() => {
                        navigate("/app/dashboard/upload");
                      }}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      className="hover:bg-neutral-300 p-2 rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary animate-bounce"
                      aria-label="Shopping cart"
                      title="Shopping cart"
                    >
                      <ShoppingCart size={25} />
                    </button>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="hover:bg-neutral-300 p-2 rounded-md cursor-pointer"
                      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    >
                      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <div className="relative hover:bg-neutral-300 p-2 rounded-md cursor-pointer">
                      <button
                        onClick={() => setOpenNotifications((prev) => !prev)}
                        className="relative flex items-center text-primary"
                      >
                        <Bell />
                        {unreadCount > 0 && !openNotifications && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </span>
                        )}
                      </button>
                      <NotificationsDropdown
                        isOpen={openNotifications}
                        onClose={() => setOpenNotifications(false)}
                      />
                    </div>
                    <div
                      onClick={() => setOpenUserMenu((prev) => !prev)}
                      className="hover:bg-neutral-300 p-2 rounded-md cursor-pointer"
                    >
                      <User2 />
                    </div>{" "}
                    {openUserMenu && (
                      <div className="absolute top-17 right-8">
                        <div className="bg-surface rounded p-4 min-w-52 lg:shadow-lg ">
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
                    type="button"
                    onClick={toggleTheme}
                    className="hover:bg-neutral-300 p-2 rounded-md cursor-pointer text-primary"
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                  >
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                  <button
                    className="btn-secondary text-sm"
                    onClick={() => {
                      navigate("/app/login");
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
      </header>
      {openMobileMenu && <UserMenuMobile close={closeMobileMenu} />}
    </>
  );
};

export default Header;
