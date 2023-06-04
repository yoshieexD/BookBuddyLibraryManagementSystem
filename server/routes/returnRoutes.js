const express = require('express');
const  returnController = require('../controllers/returnController');

const router = express.Router();

router.post('/submit', returnController.submitReturn);
router.get('/getall', returnController.getReturn);

module.exports = router;