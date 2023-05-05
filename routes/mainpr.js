const express = require('express');

const routes = express.Router();

const prcontroller = require('../controller/products');

const passport = require('passport');

const product = require('../models/products');

routes.get('/addproducts', passport.checkauthentication, prcontroller.addproducts);

routes.post('/insertpr', passport.checkauthentication, product.uploadimg, prcontroller.insertpr);

routes.get('/viewproducts', passport.checkauthentication, prcontroller.viewproducts);

routes.get('/deactive/:id', passport.checkauthentication, prcontroller.deactive);

routes.get('/active/:id', passport.checkauthentication, prcontroller.active);

routes.post('/prupadatedit', passport.checkauthentication, prcontroller.prupadatedit);

module.exports = routes;