const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type: String,
        default:'None'
    }
})

const Toydb = mongoose.model('toydb',schema);
module.exports = Toydb;