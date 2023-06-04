const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  booktitle:{
    type:String,
    default:"n/a",
  },
  bookcategory:{
    type:String,
    default:"n/a",
  },
  bookauthor:{
   type:String,
   default:"n/a",
  },
  datepublished:{
    type:String,
    default:"n/a",

  },
  quantity:{
    type:Number,
    required:true,
  },
  left:{
    type:Number,
    required:true,
  },
});

const BookModel = mongoose.model("book", bookSchema);
module.exports = BookModel;
