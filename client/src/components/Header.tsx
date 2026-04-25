import {
  Bell,
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
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import UserMenuMobile from "./UserMenuMobile";
import NotificationsDropdown from "./NotificationsDropdown";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";

const Header = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const user = useSelector((state: any) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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
