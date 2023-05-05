const mongoose = require('mongoose');

const registreschema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const register = mongoose.model('register',registreschema);
module.exports = register;