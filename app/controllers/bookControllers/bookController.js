import Book from '../../models/Book.js'
export const createBook = async (req, res) => {
    try {
      const { title, caption, rating } = req.body;
      const file = req.file;
  
      // File check
      if (!file) {
        return res.status(400).json({ message: "Image file is required" });
      }
  
      // Field validation
      if (!title || !rating) {
        return res.status(400).json({ message: "Title and rating are required" });
      }
  
      const imageUrl = file.path; // Cloudinary gives the file URL in `path`
  
      const book = new Book({
        title,
        caption,
        image: imageUrl,
        rating,
        user: req.user._id, // Ensure req.user is set by an auth middleware
      });
  
      await book.save();
      res.status(201).json({ message: "Book created", book });
  
    } catch (error) {
      console.error("Create Book Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// export const getBooks = async (req, res) => {
//   try {
//     const books = await Book.find({ user: req.user._id }).populate("user", "username email");
//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Get Books Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getBooks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;  
      const limit = 5;
      const skip = (page - 1) * limit;
      const total = await Book.countDocuments({ user: req.user._id });
  
      const books = await Book.find({ user: req.user._id })
        .populate("user", "username email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        page,
        totalPages: Math.ceil(total / limit),
        totalBooks: total,
        books
      });
    } catch (error) {
      console.error("Get Books Error:", error);
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
  