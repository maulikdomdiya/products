const express = require('express');

const routes = express.Router();

const extracontroller = require('../controller/extra_pr');

const passport = require('passport');

routes.get('/addextraproducts',passport.checkauthentication, extracontroller.addextraproducts);

routes.post('/subdata',passport.checkauthentication, extracontroller.subdata);

routes.post('/insertextrapr',passport.checkauthentication, extracontroller.insertextrapr);

routes.get('/viewextraproducts',passport.checkauthentication, extracontroller.viewextraproducts);

routes.get('/deleteadmin/:id', passport.checkauthentication, extracontroller.deleteadmin);

routes.get('/updateadmin/:id', passport.checkauthentication, extracontroller.updateadmin);

module.exports = routes;