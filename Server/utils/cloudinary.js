import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export const uploadmedia = async (file) => {
  try {
    const uploadresponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadresponse;
  } catch (err) {
    console.error(err);
  }
};
export const deletemedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error(err);
  }
};

export const deletevideo = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (err) {
    console.error(err);
  }
};
