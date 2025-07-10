import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // console.log("Cloudinary upload middleware hit");
    // console.log(" File received:", file?.originalname);

    return {
      folder: "book_images",
      format: file.mimetype.split('/')[1],
      transformation: [{ quality: "auto" }],
    };
  },
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // console.log(" Invalid file type:", file.mimetype);
      cb(new Error("Only image files are allowed (jpeg, png, webp)"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export { cloudinary, upload };
