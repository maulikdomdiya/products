const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploads/product';

const prschema = mongoose.Schema({
    prname : {
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
    },
    image : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean
    }
})

const storage = multer.diskStorage({
    destination : async (req,file,cb) => {
        cb(null, path.join(__dirname,'..',imgpath));
    },
    filename : async (req,file,cb) => {
        cb(null, file.fieldname+'-'+Date.now());
    }
})

prschema.statics.uploadimg = multer({storage : storage}).single('image');
prschema.statics.imgpath = imgpath;

const product = mongoose.model('product',prschema);
module.exports = product;