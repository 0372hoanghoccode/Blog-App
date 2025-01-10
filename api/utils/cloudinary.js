import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'blog',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    });
    return result;
  } catch (error) {
    console.error('Cloudinary error:', error);
    throw new Error(`Error uploading image: ${error.message}`);
  }
};

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Error deleting image: ${error.message}`);
  }
};

export default cloudinary;
