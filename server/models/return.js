const mongoose = require('mongoose');
const { Schema } = mongoose;

const returnSchema = new Schema({
    studentid:{
    type:String,
    default:"n/a",

    },
    firstname:{
    type:String,
    required:true,

    },
    middlename:{
    type:String,
    required:true,

    },
    lastname:{
    type:String,
    required:true,

    },
    course:{
    type:String,
    default:"n/a",

    },
    returned:{
    type:String,
    required:true,

    },
    returndate:{
    type:String,
    required:true,
    
    },
    quantity:{
    type:Number,
    required:true,
    },
});

const ReturnModel = mongoose.model("return", returnSchema);
module.exports = ReturnModel;
