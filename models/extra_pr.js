const mongoose = require('mongoose');

const extraschema = mongoose.Schema({
    productid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
        required : true
    },
    subpr : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subpr",
        required : true
    },
    extrapr : {
        type : String,
        required : true
    }
})

const extra = mongoose.model('extra', extraschema);

module.exports = extra;