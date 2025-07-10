import Book from '../../models/Book.js'
import User from "../../models/User.js";
export const createBook = async (req, res) => {
  console.log("✅ createBook controller reached");
  try {
  
    const { title, caption, rating } = req.body;
    const file = req.file;


    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    if (!title || !rating) {
      return res.status(400).json({ message: "Title and rating are required" });
    }

    const imageUrl = file.path;

    const book = new Book({
      title,
      caption,
      image: imageUrl,
      rating,
      user: req.user._id
    });

    await book.save();

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error("Create Book Error:", JSON.stringify(error, null, 2));

    res.status(500).json({
      message: "Server error",
      error: error?.message || "Unknown error",
    });
  }
};


export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("user", "username email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalBooks: books.length,
      books,
    });
  } catch (error) {
    console.error("Get All Books Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookbyid = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId)
      .populate("user", "username email");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book });

  } catch (error) {
    console.error("Get Book by ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this book" });
    }
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("username email profileImage");
    if (!user) return res.status(404).json({ message: "User not found" });
    const books = await Book.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      user,
      recommendedBooks: books,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};