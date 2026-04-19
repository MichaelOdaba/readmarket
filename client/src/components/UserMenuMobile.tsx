import { LogOut, LucideLink, User, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import type { UserState } from "../store/slice/userSlice";
const UserMenuMobile = ({ close }: { close: () => void }) => {
  const user = useSelector((state: { user: UserState }) => state?.user);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  console.log(user);

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
    <div className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-black opacity-70 flex flex-col items-center justify-between py-7">
      <div className="py-2 flex items-center flex-col justify-center gap-1">
        <div className="bg-neutral-300 p-7 rounded-full">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={30} />
          )}
        </div>

        <p className="font-bold text-white text-xl">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-md text-white">{user.email}</p>
        <button className="btn-primary text-sm flex items-center justify-center gap-2 p-2">
          View Profile <LucideLink size={15} />
        </button>
      </div>

      <hr />

      <Link
        to={""}
        className="text-2xl text-white rounded-sm p-2 hover:bg-neutral-300"
      >
        Upload Resource
      </Link>
      <Link
        to={""}
        className="text-2xl text-white rounded-sm p-2 hover:bg-neutral-300"
      >
        My Library
      </Link>
      <Link
        to={""}
        className="text-2xl text-white rounded-sm p-2 hover:bg-neutral-300"
      >
        Collections
      </Link>
      <Link
        to={""}
        className="text-2xl text-white rounded-sm p-2 hover:bg-neutral-300"
      >
        Add Collection
      </Link>
      <Link
        to={""}
        className="text-2xl text-white rounded-sm p-2 hover:bg-neutral-300"
      >
        Save Address
      </Link>
      <button
        onClick={() => handleLogout()}
        className="text-2xl items-center justify-center rounded-sm p-2 text-white hover:bg-neutral-300 flex gap-2"
      >
        <LogOut /> Logout
      </button>
      <div className="text-accent" onClick={() => close()}>
        <X size={40} />
      </div>
    </div>
  );
};

export default UserMenuMobile;
