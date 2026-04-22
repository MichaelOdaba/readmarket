import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader, Upload as UploadIcon } from "lucide-react";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";

interface FormData {
  name: string;
  image: string;
  description: string;
}

interface CloudinaryResponse {
  url: string;
}

const AddCollectionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    try {
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "readmarket"
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dq7l0z3ql"
        }/image/upload`,
        {
          method: "POST",
          body: formDataCloud,
        }
      );

      const data: CloudinaryResponse = await response.json();
      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setImagePreview(null);
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.image
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await customAxios({
        ...summaryApi.addCollection,
        data: formData,
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: "", image: "", description: "" });
        setImagePreview(null);

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard/library");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to create collection");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the collection"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container section">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-primary hover:text-secondary mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Add New Collection
          </h1>
          <p className="text-secondary-text mb-8">
            Create a new collection for your ebooks and PDFs
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">
                Collection created successfully! Redirecting...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Collection Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Collection Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Mathematics, Science"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Collection Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this collection contains..."
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Collection Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Collection Image *
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-sm text-secondary-text">
                      {formData.image && "Image uploaded successfully"}
                    </p>
                    <label
                      htmlFor="image"
                      className="inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                    >
                      Change Image
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon size={40} className="mx-auto text-border" />
                    <div>
                      <p className="text-sm font-medium text-primary-text">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-secondary-text">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <label
                      htmlFor="image"
                      className="inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                    >
                      Select Image
                    </label>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!formData.image}
                />
              </div>
              {!formData.image && !imagePreview && (
                <p className="mt-2 text-sm text-red-600">Image is required</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Collection"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-3 bg-border text-primary-text rounded-lg font-medium hover:bg-opacity-80 transition-colors"
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

export default AddCollectionPage;
