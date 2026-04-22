import {
  LogOut,
  LucideLink,
  User,
  X,
  Bell,
  BookMarked,
  Plus,
  MapPin,
  Upload,
  Loader,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import type { UserState } from "../store/slice/userSlice";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const UserMenuMobile = ({ close }: { close: () => void }) => {
  const user = useSelector((state: { user: UserState }) => state?.user);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notifications when menu opens
  useEffect(() => {
    if (user._id) {
      fetchNotifications();
    }
  }, [user._id]);

  const fetchNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      const response = await customAxios({
        ...summaryApi.getNotifications,
      });

      if (response.data.success) {
        setNotifications(response.data.data.notifications.slice(0, 5)); // Show only 5 latest
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await customAxios({
        ...summaryApi.markNotificationAsRead,
        data: { notificationId },
      });

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "LOGIN":
        return "🔐";
      case "REGISTER":
        return "🎉";
      case "PROFILE_UPDATE":
        return "👤";
      case "UPLOAD":
        return "📤";
      case "PURCHASE":
        return "🛍️";
      default:
        return "ℹ️";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleLogout = async () => {
    try {
      const response = await customAxios({
        ...summaryApi.logout,
      });

      toast.success(response.data.message);

      navigate("/login");
      window.location.reload();
      close();
      console.log(response);
    } catch (error: any) {
      console.log(error);
      toast.error("an error occurred while logging out");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div
        ref={menuRef}
        className="bg-white w-full sm:w-96 rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col"
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-100 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button
            onClick={() => close()}
            className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
          >
            <X size={24} className="text-primary" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-primary/20">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} className="text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-primary text-lg truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-neutral-600 truncate">{user.email}</p>
            </div>
          </div>
          <Link
            to="/dashboard/profile"
            onClick={() => close()}
            className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            View Profile <LucideLink size={16} />
          </Link>
        </div>

        {/* Notifications Section */}
        <div className="border-b border-neutral-100">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell size={24} className="text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span className="font-semibold text-primary">Notifications</span>
            </div>
            <X
              size={20}
              className={`text-neutral-600 transform transition-transform ${
                showNotifications ? "rotate-45" : ""
              }`}
            />
          </button>

          {showNotifications && (
            <div className="border-t border-neutral-100 bg-neutral-50 max-h-64 overflow-y-auto">
              {isLoadingNotifications ? (
                <div className="flex items-center justify-center p-8">
                  <Loader className="animate-spin text-primary" size={24} />
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 hover:bg-white transition-colors cursor-pointer ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (!notification.isRead) {
                          handleMarkAsRead(notification._id);
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        <span className="text-xl flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-primary text-sm">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-neutral-600 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-neutral-400 mt-1 block">
                            {formatDate(notification.createdAt)}
                          </span>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-neutral-500 text-sm">
                  <Bell size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 divide-y divide-neutral-100">
          <Link
            to="/dashboard/upload"
            onClick={() => close()}
            className="flex items-center gap-3 p-4 hover:bg-secondary/10 transition-colors text-primary font-semibold"
          >
            <Upload size={22} className="text-secondary" />
            Upload Resource
          </Link>
          <Link
            to="/dashboard/library"
            onClick={() => close()}
            className="flex items-center gap-3 p-4 hover:bg-secondary/10 transition-colors text-primary font-semibold"
          >
            <BookMarked size={22} className="text-secondary" />
            My Library
          </Link>

          {user.role === "ADMIN" && (
            <Link
              to="/dashboard/collection/add"
              onClick={() => close()}
              className="flex items-center gap-3 p-4 hover:bg-accent/10 transition-colors text-accent font-semibold"
            >
              <Plus size={22} className="text-accent" />
              Add Collection
            </Link>
          )}

          <Link
            to="/dashboard/profile"
            onClick={() => close()}
            className="flex items-center gap-3 p-4 hover:bg-secondary/10 transition-colors text-primary font-semibold"
          >
            <MapPin size={22} className="text-secondary" />
            Manage Address
          </Link>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50">
          <button
            onClick={() => {
              handleLogout();
              close();
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenuMobile;
