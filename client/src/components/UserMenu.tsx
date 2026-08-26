import {
  Layers,
  LayersPlus,
  Library,
  LogOut,
  LucideLink,
  Save,
  Upload,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import * as authService from "../services/authService";
import type { UserState } from "../store/slice/userSlice";
import { auth } from "../config/firebase";
import { useState } from "react";

const UserMenu = ({ close }: { close: () => void }) => {
  const user = useSelector((state: { user: UserState }) => state?.user);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [userImage, setuserImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await customAxios({
          ...summaryApi.getUser,
        });

        setuserImage(response.data.data.avatar);
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch user details"
        );
      }
    };

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        fetchUserData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  const handleLogout = async () => {
    try {
      await authService.logout();
      // Optionally notify backend to clear server-side session/state
      try {
        const response = await customAxios({ ...summaryApi.logout });
        if (response?.data?.message) toast.success(response.data.message);
      } catch (e) {
        // ignore backend logout errors
      }

      navigate("/app/login");
      window.location.reload();
      close();
    } catch (error: any) {
      console.log(error);
      toast.error("an error occurred while logging out");
    }
  };
  return (
    <div ref={menuRef} className="flex flex-col gap-3">
      <div className="py-2 flex items-center gap-2">
        <div className="bg-neutral-300 rounded-full h-16 w-16 overflow-hidden">
          {userImage ? (
            <img
              src={userImage}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={30} className="text-neutral-400 m-4" />
          )}
        </div>
        <div className="text-black flex flex-col gap-1">
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm">{user.email}</p>
          <button
            className="btn-primary text-sm flex items-center justify-center gap-2"
            onClick={() => {
              navigate("/app/dashboard/profile");
            }}
          >
            View Profile <LucideLink size={15} />
          </button>
        </div>
      </div>
      <hr />
      <Link
        to={"/app/dashboard/upload"}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Upload size={20} /> Upload Resource
      </Link>
      <Link
        to={"/app/dashboard/library"}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Library size={20} /> My Library
      </Link>
      {user.role === "ADMIN" && (
        <>
          <hr />
          <Link
            to={"/app/dashboard/collection/add"}
            className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2 text-accent"
          >
            <LayersPlus size={20} /> Add Collection
          </Link>
        </>
      )}
      <hr />
      {user.role === "ADMIN" && (
        <Link
          to={"/app/dashboard/create-admin"}
          className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2 text-red-500"
        >
          <Layers size={20} /> Create Admin
        </Link>
      )}

      <Link
        to={"/app/dashboard/profile"}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Save size={20} /> Manage Address
      </Link>
      <button
        onClick={() => handleLogout()}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex gap-2"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default UserMenu;
