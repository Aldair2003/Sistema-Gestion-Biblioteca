const Loan = require('../models/loanModel');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.getAllLoans();
    res.json({ loans });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los préstamos', error: error.message });
  }
};

exports.getLoanDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.getLoanById(id);
    if (!loan) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }
    res.json({ loan });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles del préstamo', error: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const { bookId, userId, dueDate } = req.body;
    const loan = await Loan.createLoan(bookId, userId, dueDate);
    res.status(201).json({ loan });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el préstamo', error: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedLoan = await Loan.updateLoan(id, status);
    res.json({ loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el préstamo', error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Loan.returnBook(id);
    res.json({ message: 'Libro devuelto exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la devolución', error: error.message });
  }
};

exports.getOverdueLoanNotifications = async (req, res) => {
  try {
    const notifications = await Loan.getOverdueLoanNotifications();
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notificaciones de préstamos vencidos', error: error.message });
  }
};