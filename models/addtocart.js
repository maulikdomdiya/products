const mongoose = require('mongoose');

const path = require('path');

const addpath = '/uploads/product';

const multer = require('multer');

const addtocartschema  = mongoose.Schema({
    prname : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    prprice : {
        type : String,
        required : true
    },
    prdet : {
        type : String,
        required : true
    }
})

const storage = multer.diskStorage({
    destination : async (req,file,cb) => {
        cb(null, path.join(__dirname,'..',addpath));
    },
    filename : async (req,file,cb) => {
        cb(null, file.fieldname+'-'+Date.now());
    }
})

addtocartschema.statics.addimgupload = multer({storage : storage}).single('image');
addtocartschema.statics.addpath = addpath;

const addcart = mongoose.model('addcart', addtocartschema);
module.exports = addcart;