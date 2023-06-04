const ReturnModel = require('../models/return');
const BookModel = require('../models/book');

exports.submitReturn = async (req, res) => {
    try {
      const {studentid,firstname,middlename,lastname,course,returned,returndate,quantity} = req.body;
  
      const newReturn = new ReturnModel({
        studentid,
        firstname,
        middlename,
        lastname,
        course,
        returned,
        returndate,
        quantity,
      });
  
   const savedReturn = await newReturn.save();

   const bookEntry = await BookModel.findOne({ booktitle: returned });

   if (!bookEntry) {
     return res.status(404).json({ error: 'Book entry not found.' });
   }
   bookEntry.left += parseInt(quantity);
   await bookEntry.save();

   res.status(201).json(savedReturn);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Server Error' });
 }
};

  exports.getReturn = async (req,res) => {
    try{
        const returns = await ReturnModel.find();
        res.json(returns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to fetch returned books' });
    }
};