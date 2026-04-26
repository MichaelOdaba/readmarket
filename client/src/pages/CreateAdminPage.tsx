import { toast } from "sonner";
import { useState } from "react";
import summaryApi from "../services/SummaryAPI";
import customAxios from "../utils/customAxios";
import { Eye, EyeClosed } from "lucide-react";

const CreateAdminPage = () => {
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = Object.values(formData).every((el) => el);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await customAxios({
        ...summaryApi.CreateAdmin,
        data: formData,
      });
      console.log(response);
      toast.success(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating admin account"
      );
      console.log(error);
    }
  };

  return (
    //make the elements mobile responsive and center the form in the page
    <div className="w-full container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Admin Account</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <Eye /> : <EyeClosed />}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password
          </label>
          <div className="flex items-center gap-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <Eye /> : <EyeClosed />}
            </div>
          </div>
        </div>
        <button
          type="submit"
          //button should be styled with a primary color and rounded corners like the other buttons in the application, should be disabled if the form is not valid using the validateForm variable, if disabled the button should follow the styling of the disabled buttons in the application

          disabled={!validateForm}
          className={
            validateForm
              ? "btn-primary w-full py-2 rounded-lg"
              : "btn-primary-disabled w-full py-2 rounded-lg"
          }
        >
          Create Admin Account
        </button>
      </form>
    </div>
  );
};

export default CreateAdminPage;
