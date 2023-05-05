const express = require('express');

const routes = express.Router();

const subprcontroller = require('../controller/sub_pr');

const passport = require('passport');

routes.get('/addsubproducts',passport.checkauthentication, subprcontroller.addsubproducts);

routes.post('/insertsubpr',passport.checkauthentication, subprcontroller.insertsubpr);

routes.get('/viewsubproducts',passport.checkauthentication, subprcontroller.viewsubproducts);

routes.get('/deactive/:id',passport.checkauthentication, subprcontroller.deactive);

routes.get('/active/:id', passport.checkauthentication, subprcontroller.active);


module.exports = routes;