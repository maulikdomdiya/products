const mongoose = require('mongoose');

const subprschema = mongoose.Schema({
    productid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product',
        required : true
    },
    subprname : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean
    }
})

const subpr = mongoose.model('subpr', subprschema);

module.exports = subpr;