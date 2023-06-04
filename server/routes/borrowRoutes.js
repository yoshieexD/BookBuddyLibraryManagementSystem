const express = require('express');
const  borrowController = require('../controllers/borrowController');

const router = express.Router();

router.post('/submit', borrowController.submitBorrow);
router.get('/getall', borrowController.getBorrow);

module.exports = router;