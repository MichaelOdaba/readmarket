import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import uploadToCloudinary from "../utils/cloudinaryUpload";
import type { ProfileFormData, UserProfile } from "../types/profile";
import { Mail, Phone, User, UserCheck, Upload, Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { auth } from "../config/firebase";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    avatar: "",
  });
  const [preview, setPreview] = useState<string>("");
  const dispatch = useDispatch();

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await customAxios({
          ...summaryApi.getUser,
        });

        if (response.data.success && response.data.data) {
          const userData: UserProfile = response.data.data;
          setProfileData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            avatar: userData.avatar || "",
          });
          if (userData.avatar) {
            setPreview(userData.avatar);
          }
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch profile"
        );
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        fetchUserData();
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const imageUrl = await uploadToCloudinary(file, "avatars");
      setProfileData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
      dispatch(
        setUser({
          avatar: imageUrl,
        })
      );
      setPreview(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    console.log(profileData);

    try {
      setIsSaving(true);
      const response = await customAxios({
        ...summaryApi.editUser,
        data: profileData,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated successfully");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="container section ">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader className="animate-spin text-primary" size={40} />
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      <div className="max-w-2xl mx-auto mt-5">
        <div className="card bg-surface p-6">
          <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b border-neutral-200">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={60} className="text-neutral-400" />
                )}
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Loader className="animate-spin text-white" size={30} />
                  </div>
                )}
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                <Upload size={18} />
                <span>
                  {isUploadingImage ? "Uploading..." : "Upload Avatar"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={isUploadingImage}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-muted">Max file size: 5MB</p>
            </div>

            {/* First Name */}
            <div className="flex flex-col items-start w-full gap-2">
              <label htmlFor="firstName" className="font-medium">
                First Name *
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-primary">
                <User size={20} className="text-neutral-600" />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="outline-none w-full"
                  placeholder="John"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col items-start w-full gap-2">
              <label htmlFor="lastName" className="font-medium">
                Last Name *
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-primary">
                <UserCheck size={20} className="text-neutral-600" />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="outline-none w-full"
                  placeholder="Doe"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-start w-full gap-2">
              <label htmlFor="email" className="font-medium">
                Email Address *
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-primary">
                <Mail size={20} className="text-neutral-600" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="outline-none w-full"
                  placeholder="you@example.com"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col items-start w-full gap-2">
              <label htmlFor="mobile" className="font-medium">
                Mobile Number
              </label>
              <div className="flex w-full items-center gap-2 input focus-within:border-primary">
                <Phone size={20} className="text-neutral-600" />
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  className="outline-none w-full"
                  placeholder="(123) 456-7890"
                  value={profileData.mobile}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSaving || isUploadingImage}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border border-primary text-primary py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
