const BorrowModel = require('../models/Borrow');
const BookModel = require('../models/book');

exports.submitBorrow = async (req, res) => {
  try {
    const { studentid, firstname, middlename, lastname, course, section, borrowed,borrowdate, quantity } = req.body;


    const newBorrow = new BorrowModel({
      studentid,
      firstname,
      middlename,
      lastname,
      course,
      section,
      borrowed,
      borrowdate,
      quantity
    });


    await newBorrow.save();

    const book = await BookModel.findOne({ booktitle: borrowed });

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    const quantityToDeduct = parseInt(quantity);
    if (book.left >= quantityToDeduct) {
      book.left -= quantityToDeduct;
      await book.save();
      return res.status(200).json({ message: 'Book borrowed successfully.' });
    } else {
      return res.status(400).json({ error: 'Insufficient quantity for borrowing.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to borrow the book.' });
  }
};

exports.getBorrow = async (req, res) => {
  try {
    const borrows = await BorrowModel.find();
    res.json(borrows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch borrow books.' });
  }
};
