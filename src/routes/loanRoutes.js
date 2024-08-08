const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, loanController.getAllLoans);
router.get('/:id', authMiddleware, loanController.getLoanDetails);
router.post('/', authMiddleware, loanController.createLoan);
router.put('/:id', authMiddleware, loanController.updateLoan);
router.put('/return/:id', authMiddleware, loanController.returnBook);
router.get('/notifications/overdue', authMiddleware, loanController.getOverdueLoanNotifications);

module.exports = router;
