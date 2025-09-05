import { uploadFile } from "../lib/upload.js";
import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  try {
    const { title, image, caption, rating } = req.body;

    if (!title || !image || !caption || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = await uploadFile(req.file);

    // Create new book
    const newBook = new Book({
      title,
      image: imageUrl,
      caption,
      rating,
      user: req.user._id,
    });
    // Save book to database
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {}
};

export const getBooks = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 2;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 }) //descending order
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); // Populate user details

    res.status(200).json({
      books,
      currentPage: page,
      totalBooks: Math.ceil((await Book.countDocuments()) / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
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
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this book" });
    }

    if (book.image) {
      try {
        const imageKey = book.image.split("/").pop();

        await supabase.storage.from("books").remove([imageKey]);
      } catch (error) {
        console.error("Error deleting image from Supabase:", error);
      }
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
};
