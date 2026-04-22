import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  X,
  Loader,
  LockKeyholeOpen,
  PartyPopper,
  User2,
  Upload,
  LucideShoppingCart,
  AlertCircle,
} from "lucide-react";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import { toast } from "sonner";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios({
        ...summaryApi.getNotifications,
      });

      if (response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await customAxios({
        ...summaryApi.markNotificationAsRead,
        data: { notificationId },
      });

      if (response.data.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "LOGIN":
        return <LockKeyholeOpen />;
      case "REGISTER":
        return <PartyPopper />;
      case "PROFILE_UPDATE":
        return <User2 />;
      case "UPLOAD":
        return <Upload />;
      case "PURCHASE":
        return <LucideShoppingCart />;
      default:
        return <AlertCircle />;
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

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:inset-auto md:fixed md:top-17 md:right-20 md:w-auto"
          onClick={onClose}
        />
      )}

      {isOpen && (
        <div
          ref={notificationsRef}
          className="fixed top-17 left-0 right-0 md:left-auto md:right-8 md:top-17 z-50 md:w-96 max-h-96 bg-white rounded-lg shadow-lg md:rounded-lg border border-neutral-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-primary" />
              <h2 className="text-lg font-bold text-primary">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-neutral-600 hover:text-primary"
            >
              <X size={24} />
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader className="animate-spin text-primary" size={30} />
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    if (!notification.isRead) {
                      handleMarkAsRead(notification._id);
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <span className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {notification.message}
                      </p>
                      <span className="text-xs text-neutral-400">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full self-center" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-neutral-500">
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsDropdown;
