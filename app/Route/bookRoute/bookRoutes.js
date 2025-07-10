import express from "express";
import { createBook, getBookbyid,deleteBook,getAllBooks,getUser } from "../../controllers/bookControllers/bookController.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { upload } from "../../utils/cloudinary.js";
const router = express.Router();
router.post('/books', authenticate, upload.single('image'), createBook);
router.get("/getbook/:id", authenticate, getBookbyid);
router.delete("/books/:id", authenticate, deleteBook);
router.get("/getuser",authenticate, getUser);
router.get("/getall", authenticate, getAllBooks);
export default router;



