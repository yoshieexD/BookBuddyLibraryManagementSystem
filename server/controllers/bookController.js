const BookModel = require('../models/book');



exports.submitBook = async (req, res) => {
  try {
    const { booktitle, bookcategory, bookauthor, datepublished, quantity, left } = req.body;

    const newBook = new BookModel({
      booktitle,
      bookcategory,
      bookauthor,
      datepublished,
      quantity,
      left,
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getBook = async (req,res) => {
    try{
        const books = await BookModel.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to fetch books' });
    }
};
exports.deleteBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await BookModel.findByIdAndRemove(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
