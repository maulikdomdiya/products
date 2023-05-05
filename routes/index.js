const express = require('express');

const routes = express.Router();

const controller = require('../controller/index');

const addcart = require('../models/addtocart');

const passport = require('passport');
const { route } = require('./mainpr');

routes.get('/', controller.frontmain);

routes.get('/viewmore', controller.viewmore);
    
routes.get('/shopnow/:id', controller.shopnow);

routes.post('/addtocart', addcart.addimgupload ,controller.addtocart);

routes.get('/admin', passport.checkauthentication, controller.dashboard);

routes.post('/sessioncreate', passport.authenticate('local', {failureRedirect : '/login'}),controller.sessioncreate);

routes.get('/adduser', passport.checkauthentication, controller.addadmin);

routes.post('/insertuser', passport.checkauthentication, controller.insertuser);

routes.get('/viewuser', passport.checkauthentication, controller.viewuser);

routes.get('/deleteuser/:id', passport.checkauthentication, controller.deleteadmin);

routes.get('/updateuser/:id', passport.checkauthentication, controller.updateuser);

routes.post('/upuserid', passport.checkauthentication, controller.upuserid);

routes.get('/userprofile/:id', passport.checkauthentication, controller.userprofile);
routes.get('/userprofileview/:id', passport.checkauthentication, controller.userprofileview);

routes.use('/products', require('./mainpr'));

routes.use('/sub_products', require('./sub_pr'));

routes.use('/extra_products', require('./extra_pr'));

routes.get('/register', controller.register);
routes.post('/addregister', controller.addregister);

routes.get('/login', controller.login);
// routes.post('/addlogin', controller.addlogin);

routes.get('/logout', async (req,res,next) => {
    req.logOut(function(err){
        if(err)
        {
            return next(err);
        }
        return res.redirect('/login');
    })
})

// change password
routes.get('/changepass', passport.checkauthentication, controller.changepass);
routes.post('/editpassword', passport.checkauthentication, controller.editpassword);

// forgor password
routes.get('/forgetpass', controller.forgetpass);
routes.post('/forgotpassword', controller.forgotpassword);

module.exports = routes;