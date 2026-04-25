/**
 * Upload an image to Cloudinary
 *
 * SETUP REQUIRED:
 * 1. Add VITE_CLOUDINARY_CLOUD_NAME to your .env file
 * 2. Add VITE_CLOUDINARY_UPLOAD_PRESET to your .env file
 * 3. Get these values from: https://console.cloudinary.com/
 */

const uploadToCloudinary = async (
  file: File,
  resourceType: "image" | "raw" = "image"
): Promise<string> => {
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
    throw new Error(
      "Cloudinary configuration missing. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryUploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to upload ${resourceType} to Cloudinary`);
  }

  const data = await response.json();
  return data.secure_url;
};

export default uploadToCloudinary;
