const Book = require('../models/bookModel');

exports.createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const book = await Book.create(title, author, description);
    res.status(201).json({ book });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro', error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.getById(id);
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ book });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles del libro', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, available } = req.body;
    const updatedBook = await Book.update(id, title, author, description, available);
    res.json({ book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.delete(id);
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.search(query);
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar libros', error: error.message });
  }
};

exports.reserveBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id; // Asumiendo que tienes el usuario en req.user
    const reservation = await Book.reserve(bookId, userId);
    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({ message: 'Error al reservar el libro', error: error.message });
  }
};
