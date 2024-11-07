import { toast } from "sonner";
import { uploadPreset, cloudName } from "../../utils/cloudinaryDetails";

const imageUploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (response.ok === false) {
      const error = await response.json();
      toast.error(error.message, { duration: 2000 });
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    toast.error("An error occurred during image upload", { duration: 2000 });
    return null;
  }
};

export default imageUploadToCloudinary;
