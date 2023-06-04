const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/submit', bookController.submitBook);
router.get('/getall', bookController.getBook);
router.delete('/delete/:id', bookController.deleteBookById);

module.exports = router;