const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/crmuser');

const db = mongoose.connection;

db.once('open', (err) => {
    if(err)
    {
        console.log('Mongodb Is Not Connected !!');
    }
    console.log('Mongodb Is Connected');
})

module.exports = db;