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
import type { UserState } from "../store/slice/userSlice";

const UserMenu = ({ close }: { close: () => void }) => {
  const user = useSelector((state: { user: UserState }) => state?.user);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
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
    <div ref={menuRef} className="flex flex-col gap-3">
      <div className="py-2 flex items-center gap-2">
        <div className="bg-neutral-300 p-4 rounded-full">
          <User size={30} />
        </div>
        <div className="text-black flex flex-col gap-1">
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm">{user.email}</p>
          <button
            className="btn-primary text-sm flex items-center justify-center gap-2"
            onClick={() => {
              navigate("/dashboard/profile");
            }}
          >
            View Profile <LucideLink size={15} />
          </button>
        </div>
      </div>

      <hr />

      <Link
        to={""}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Upload size={20} /> Upload Resource
      </Link>
      <Link
        to={""}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Library size={20} /> My Library
      </Link>
      <Link
        to={""}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Layers size={20} /> Collections
      </Link>
      <Link
        to={""}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <LayersPlus size={20} /> Add Collection
      </Link>
      <Link
        to={""}
        className="text-sm font-bold rounded-sm p-2 hover:bg-neutral-300 flex items gap-2"
      >
        <Save size={20} /> Save Address
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
