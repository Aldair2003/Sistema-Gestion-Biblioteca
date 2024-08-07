const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');

router.get('/search', authMiddleware, bookController.searchBooks);
router.post('/reserve', authMiddleware, bookController.reserveBook);

module.exports = router;