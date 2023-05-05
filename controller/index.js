const user = require('../models/user');
const register = require('../models/regiter');
const { use } = require('passport');
const passport = require('passport');
const nodemailer = require('nodemailer');
const product = require('../models/products');
const addcart = require('../models/addtocart');

module.exports.sessioncreate = async (req,res) => {
    let admindata = await user.find({});
    return res.render('electronics',{
        'admindata' : admindata
    });
}

module.exports.dashboard = async (req,res) => {
    return res.render('electronics');
}

module.exports.addadmin = async (req,res) => {
    return res.render('add_user');
}

module.exports.insertuser = async (req,res) => {
    let userdata = await user.create(req.body);
    return res.redirect('back');
}

module.exports.viewuser = async (req,res) => {
    // let userdata = await user.find(req.body);
    // return res.render('view_user',{
    //     addata : userdata
    // });

    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    let page = 1;
    if(req.query.page){
        page = req.query.page
    }
    // console.log(req.query.page);
    var p_page = 3;

    let admindata = await user.find({
        $or : [
            {name : {$regex : '.*'+search+'.*'}},
            {email : {$regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1) * p_page)
    .limit(p_page)
    .exec();

    let countdata = await user.find({
        $or : [
            {name : {$regex : '.*'+search+'.*'}},
            {email : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();

    return res.render('view_user',{
        'addata' : admindata,
        'countrecored' : Math.ceil(countdata/p_page),
        'searchrecored' : search
    })
}

module.exports.deleteadmin = async (req,res) => {
    // let userdata = await user.findById(req.params.id);
    let userdel = await user.findByIdAndDelete(req.params.id);
   
    return res.redirect('back');
}

module.exports.updateuser = async (req,res) => {
    let userup = await user.findById(req.params.id);
    return res.render('update_user',{
        'updata' : userup 
    });
}

module.exports.upuserid = async (req,res) => {
    let userup = await user.findById(req.body.edituser);
    if(userup){
        let userupid = await user.findByIdAndUpdate(req.body.edituser, req.body);
        if(userupid){
            return res.redirect('/viewuser');
        }
        return res.redirect('back');
    }
    return res.redirect('back');
}

module.exports.register = async (req,res) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('registre');
}

module.exports.addregister = async (req,res) => {
    // console.log(req.body);
    let userdata = await register.findOne({email : req.body.email});
    if(userdata){
        console.log("Invaliad email !!");
        return res.redirect('back');
    }
    else{
        if(req.body.password == req.body.cpassword){
            let userreg = await register.create({
                email : req.body.email,
                password : req.body.password
            })
            return res.redirect('/login');
        }
        else{
            console.log("Password Not Match !!");
            return res.redirect('back');
        }
    }
}

module.exports.login = (req,res) => {
    if(req.isAuthenticated()){
        return next();  
    }
    return res.render('login');
}

// module.exports.addlogin = async (req,res) => {
//     console.log(req.body);
//     let finddata = await register.findOne({'email' : req.body.email});
//     if(finddata){
//         if(finddata.password == req.body.password){
//             return res.redirect('/');
//         }
//         else
//         {
//             console.log("Password Not Match!!");
//             return res.redirect('back');
//         }
//     }
//     console.log("Email Not Match!!");
//     return res.redirect('back');
// }

module.exports.userprofile = async (req,res) => {
    let userdata = await user.findById(req.params.id);
    return res.render('viewprofile',{
        userdata : userdata
    })
}
module.exports.userprofileview = async (req,res) => {
    let userdata = await user.find({});
    return res.render('viewprofile',{
        userdata : userdata
    })
}

module.exports.changepass = async (req,res) => {
    // let userpass = await user.find
    return res.render('chnagepassword');
}

module.exports.editpassword = async (req,res) => {
    // console.log(req.body);
    var oldpass = req.user.password;
    var opass = req.body.opass;
    var npass = req.body.npass;
    var cpass = req.body.copass;
    if(oldpass == opass) {
        if(opass != npass){
            if(npass == cpass){
                let userpass = await register.findByIdAndUpdate(req.user.id, {password : npass});
                // if(userpass){
                //     console.log('Something Want Wrong !!');
                //     return res.redirect('back');
                // }    
                return res.redirect('/logout');
            }
            else{
                console.log("New & Confirm Are Not Match !!");
                return res.redirect('back');
            }
        }
        else{
            console.log("Old Password & New Are Match !!");
            return res.redirect('back');
        }
    }
    else{
        console.log("Old Password Not Match !!");
        return res.redirect('back');
    }
}

module.exports.forgetpass = async (req,res) => {
    return res.render('forgotpass');
}

module.exports.forgotpassword = async (req,res) => {
    let forgetpass = await register.findOne({email : req.body.email});
    if(forgetpass){
        var otp = Math.ceil(Math.random()*10000);
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "bb070dd026dd3e",
                  pass: "f58400efd2fecf"
                }
              });

              let info = transport.sendMail({
                from: 'maulikpatel4723@gmail.com', // sender address
                to: forgetpass.email, // list of receivers
                subject: "Testing", // Subject line
                text: "First line", // plain text body
                html: `<b>Here this OTP : ${otp}</b>`, // html body
              });
    }
}

module.exports.frontmain = async (req,res) => {
    let frontdata = await product.find(req.body);
    return res.render('frontmain',{
        'frontdata' : frontdata
    })
}

module.exports.viewmore = async (req,res) => {
    let viewmore = await product.find(req.body);
    return res.render('viewmore',{
        'viewmore' : viewmore
    })
}

module.exports.shopnow = async (req,res) => {
    let shopnow = await product.findById(req.params.id);
    // console.log(req.params.id);
    return res.render('shopnow',{
        shopnow : shopnow
    })
}

module.exports.addtocart = async (req,res) => {
    // console.log(req.body);
    let cartdata = await addcart.create(req.body);
    return res.redirect('/');
}