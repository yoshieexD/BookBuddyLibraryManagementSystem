const mongoose = require('mongoose');
const { Schema } = mongoose;

const borrowSchema = new Schema({
    studentid:{
    type:String,
    default:"n/a",

    },
    firstname:{
    type:String,
    default:"n/a",

    },
    middlename:{
    type:String,
    default:"n/a",

    },
    lastname:{
    type:String,
    default:"n/a",

    },
    course:{
    type:String,
    default:"n/a",

    },
    borrowed:{
    type:String,
    required:true,

    },
    borrowdate:{
    type:String,
    required:true,
    },
    quantity:{
    type:Number,
    required:true,
    },
});

const BorrowModel = mongoose.model("borrow", borrowSchema);
module.exports = BorrowModel;
