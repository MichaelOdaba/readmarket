import { useState, useEffect } from "react";
import { Upload, X, Loader, CheckCircle, Gift } from "lucide-react";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import uploadToCloudinary from "../utils/cloudinaryUpload";
import summaryApi from "../services/SummaryAPI";

interface ProductForm {
  name: string;
  description: string;
  more_details: string;
  price: string;
  collection: string;
  coverImageUrl: string;
  coverImagePreviewUrl: string;
  publish: boolean;
  productFile: File | null;
  fileUrl: string;
}

interface Collection {
  _id: string;
  name: string;
}

const UploadPage = () => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    more_details: "",
    price: "",
    collection: "",
    coverImageUrl: "",
    coverImagePreviewUrl: "",
    publish: true,
    productFile: null,
    fileUrl: "",
  });

  const [isFree, setIsFree] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch collections on mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await customAxios({
          ...summaryApi.getCollections,
        });
        if (response.data.success) {
          setCollections(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        toast.error("Failed to load collections");
      }
    };

    fetchCollections();
  }, []);

  const handleToggleFree = (isFreeValue: boolean) => {
    setIsFree(isFreeValue);
    if (isFreeValue) {
      setForm((prev) => ({ ...prev, price: "0" }));
    } else {
      setForm((prev) => ({ ...prev, price: "" }));
    }
    setErrors((prev) => ({ ...prev, price: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(form.price)) || Number(form.price) < 0) {
      newErrors.price = "Price must be 0 or greater";
    }
    if (!form.collection) {
      newErrors.collection = "Please select a collection";
    }
    if (!form.coverImagePreviewUrl) {
      newErrors.coverImagePreviewUrl = "Please upload a cover image";
    }
    if (!form.fileUrl && !form.productFile) {
      newErrors.productFile = "Please upload the resource file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleImageSelect = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image is too large (max 5MB)");
    return;
  }

  // Keep the actual file in memory
  setImageFile(file);

  // Create a temporary local preview
  const previewUrl = URL.createObjectURL(file);

  setForm((prev) => ({
    ...prev,
    coverImagePreviewUrl: previewUrl,
  }));

  setErrors((prev) => ({
    ...prev,
    coverImagePreviewUrl: "",
  }));
};

  const handleProductFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error("File is too large (max 100MB)");
      return;
    }

    // Validate file type (allow common document and ebook formats)
    const allowedTypes = [
      "application/pdf",
      "application/epub+zip",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
      "application/zip",
      "application/x-rar-compressed",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error(
        "Invalid file type. Allowed: PDF, EPUB, DOC, DOCX, TXT, ZIP, RAR"
      );
      return;
    }

    setForm((prev) => ({
      ...prev,
      productFile: selectedFile,
    }));
    setErrors((prev) => ({ ...prev, productFile: "" }));
    toast.success(`File selected: ${selectedFile.name}`);
  };

  const uploadProductFile = async (): Promise<string | null> => {
    if (!form.productFile) return null;

    try {
      const fileUrl = await uploadToCloudinary(form.productFile, "productFiles", "raw");
      setForm((prev) => ({
        ...prev,
        fileUrl: fileUrl,
        productFile: null,
      }));
      return fileUrl;
    } catch (error) {
      console.error("Product file upload failed:", error);
      toast.error("Failed to upload product file. Please try again.");
      return null;
    }
  };

  const removeProductFile = () => {
    setForm((prev) => ({
      ...prev,
      productFile: null,
      fileUrl: "",
    }));
    setErrors((prev) => ({ ...prev, productFile: "" }));
  };

  const removeCoverImage = () => {
    if (form.coverImagePreviewUrl) {
      URL.revokeObjectURL(form.coverImagePreviewUrl);
    }
    setForm((prev) => ({
      ...prev,
      coverImagePreviewUrl: "",
    }));
    setErrors((prev) => ({ ...prev, coverImageUrl: "" }));
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    // 1. Upload the actual image file to Cloudinary
    let uploadedImageUrl = "";

    if (imageFile) {
      uploadedImageUrl = await uploadToCloudinary(
        imageFile,
        "productImages",
        "image"
      );
      setUploadingImage(true);
    }

    // 2. Upload product file if necessary
    let finalFileUrl = form.fileUrl;

    if (form.productFile && !finalFileUrl) {
      const uploadedFileUrl = await uploadProductFile();

      if (!uploadedFileUrl) return;

      finalFileUrl = uploadedFileUrl;
    }

    // 3. Now send everything to your backend
    const response = await customAxios({
      ...summaryApi.uploadProduct,
      data: {
        name: form.name.trim(),
        description: form.description.trim(),
        more_details: form.more_details.trim(),
        price: parseFloat(form.price),
        collectionId: form.collection,
        coverImageUrl: uploadedImageUrl,
        fileUrl: finalFileUrl,
        publish: form.publish,
      },
    });

    if (response.data.success) {
      toast.success("Product uploaded successfully!");
    }

  } catch (error: any) {
    console.error("Upload error:", error);
    toast.error(
      error.response?.data?.message ||
      "Failed to upload product"
    );
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-neutral py-8">
      <div className="max-w-2xl mx-auto px-4 md:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Upload a Product
          </h1>
          <p className="text-secondary">
            Share your ebook or resource with our community
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-lg shadow-md p-6 md:p-8 space-y-6"
        >
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name (e.g., 'Advanced React Patterns')"
              value={form.name}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Describe your product in detail. What will buyers learn or get?"
              value={form.description}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, description: e.target.value }));
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* More Details */}
          <div>
            <label
              htmlFor="more_details"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Additional Details
            </label>
            <textarea
              id="more_details"
              placeholder="Any additional information (optional)"
              value={form.more_details}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, more_details: e.target.value }))
              }
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
            />
          </div>

          {/* Price and Collection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-4 top-2 text-secondary font-semibold">
                    $
                  </span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="499"
                    value={form.price}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, price: e.target.value }));
                      setErrors((prev) => ({ ...prev, price: "" }));
                      setIsFree(false);
                    }}
                    disabled={isFree}
                    className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition disabled:bg-neutral-100 disabled:cursor-not-allowed ${
                      errors.price
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-300"
                    }`}
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => handleToggleFree(e.target.checked)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    <Gift size={16} className="text-accent" />
                    Make this product free
                  </span>
                </label>
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Collection */}
            <div>
              <label
                htmlFor="collection"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Collection <span className="text-red-500">*</span>
              </label>
              <select
                id="collection"
                value={form.collection}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, collection: e.target.value }));
                  setErrors((prev) => ({ ...prev, collection: "" }));
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.collection
                    ? "border-red-500 focus:ring-red-500"
                    : "border-neutral-300"
                }`}
              >
                <option value="">Select a collection</option>
                {collections.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.name}
                  </option>
                ))}
              </select>
              {errors.collection && (
                <p className="text-red-500 text-sm mt-1">{errors.collection}</p>
              )}
            </div>
          </div>

          {/* Product File Upload */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Product File <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-secondary mb-3">
              Upload the actual resource/file (PDF, EPUB, DOC, etc.) that
              customers will receive
            </p>

            {/* Upload Area */}
            <label
              htmlFor="product-file-input"
              className="flex flex-col items-center border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
            >
              <input
                id="product-file-input"
                type="file"
                accept=".pdf,.epub,.doc,.docx,.txt,.zip,.rar"
                onChange={handleProductFileSelect}
                disabled={isLoading}
                className="hidden"
              />
              <Upload className="mx-auto mb-3 text-secondary" size={32} />
              <p className="text-primary font-semibold mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-secondary">
                PDF, EPUB, DOC, DOCX, TXT, ZIP, RAR up to 100MB
              </p>
            </label>

            {errors.productFile && (
              <p className="text-red-500 text-sm mt-2">{errors.productFile}</p>
            )}

            {/* Uploaded File */}
            {form.fileUrl && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={24} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-primary">
                      File uploaded successfully
                    </p>
                    <p className="text-xs text-secondary break-all">
                      {form.productFile?.name || "Product file"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeProductFile}
                  className="text-red-500 hover:bg-red-100 p-2 rounded transition"
                  aria-label="Remove file"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Pending File */}
            {form.productFile && !form.fileUrl && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Loader className="text-blue-500 animate-spin" size={24} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-primary">
                      Ready to upload
                    </p>
                    <p className="text-xs text-secondary break-all">
                      {form.productFile.name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeProductFile}
                  className="text-red-500 hover:bg-red-100 p-2 rounded transition"
                  aria-label="Remove file"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <label
              htmlFor="image-input"
              className="flex flex-col items-center border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
            >
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                disabled={uploadingImage || isLoading}
                className="hidden"
              />
              {form.coverImagePreviewUrl ? (
                <div className="relative w-full max-w-sm">
                  <img
                    src={form.coverImagePreviewUrl}
                    alt="Product cover preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      removeCoverImage();
                    }}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                    aria-label="Remove cover image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto mb-3 text-secondary" size={32} />
                  <p className="text-primary font-semibold mb-1">
                    Click to upload a cover image
                  </p>
                  <p className="text-sm text-secondary">PNG, JPG, or JPEG up to 5MB</p>
                </>
              )}
            </label>
            {uploadingImage && (
              <p className="mt-2 flex items-center gap-2 text-sm text-secondary">
                <Loader className="animate-spin" size={16} /> Uploading cover image...
              </p>
            )}
            {errors.coverImageUrl && (
              <p className="text-red-500 text-sm mt-2">{errors.coverImageUrl}</p>
            )}
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="publish"
              className="flex items-center cursor-pointer"
            >
              <input
                id="publish"
                type="checkbox"
                checked={form.publish}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, publish: e.target.checked }))
                }
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-primary">
                Publish immediately after upload
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || uploadingImage}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || uploadingImage ? (
              <>
                <Loader className="animate-spin" size={20} />
                {uploadingImage ? "Uploading Image..." : "Uploading..."}
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload Product
              </>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Make sure to provide clear descriptions and
            high-quality images for better visibility. Products are published
            immediately, so review all details before submitting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
