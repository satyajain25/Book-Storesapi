import express from "express";
import { createBook, getBooks,deleteBook } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { upload } from "../../utils/cloudinary.js";


const router = express.Router();

router.post("/books", authenticate, upload.single("image"), createBook);
router.get("/getbook", authenticate, getBooks);
router.delete("/books/:id", authenticate, deleteBook);
export default router;
