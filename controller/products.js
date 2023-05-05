const product = require('../models/products');
const user = require('../models/user');
const path = require('path');
const fs = require('fs'); 
const { log } = require('console');

module.exports.addproducts = async (req,res) => {
    return res.render('add_products');
}

module.exports.insertpr = async (req,res) => {
    // console.log(req.body);
    req.body.isactive = 'true';
    // var imgPath = '';
    // if(req.file){
    //     var imgPath = product.imgpath+"/"+req.file.filename;
    // }
    // req.body.primg = imgPath;
    // let prdata = await product.create(req.body);
    // return res.redirect('back');

        var imgPath = '';
        if(req.file)
        {
            var imgPath = product.imgpath+"/"+req.file.filename;
        }
        req.body.name = req.body.fname+" "+req.body.lname;
        req.body.image = imgPath; 
        let admindata = await product.create(req.body);
        if(admindata)
        {
            console.log("recored inserted");
            return res.redirect('back');
        }
        else
        {
            console.log("recored not inserted !!");
        }
}


module.exports.viewproducts = async(req,res) =>{
    // let productdata = await product.find(req.body);
    // return res.render('viewshoes',{
    //     prdata : productdata
    // }); 

    let active = await product.find({'isactive' : true});
    let deactive = await product.find({'isactive ' : false});
    // return res.render('viewshoes',{
    //     isactivedata : active,
    //     deactivedata : deactive
    // }); 
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    let page = 2;
    if(req.query.page){
        page = req.query.page
    }
    // console.log(req.query.page);
    var p_page = 5;

    let admindata = await product.find({
        $or : [
            {name : {$regex : '.'+search+'.'}}
            // {email : {$regex : '.'+search+'.'}}
        ]
    })
    .skip((page -1) * p_page)
    .limit(p_page)
    .exec();

    let countdata = await product.find({
        $or : [
            {name : {$regex : '.'+search+'.'}},
            // {email : {$regex : '.'+search+'.'}}
        ]
    }).countDocuments();

    return res.render('view_products',{
        'isactivedata' : active,
        'deactivedata' : deactive,
        'countrecored' : Math.ceil(countdata/p_page),
        'searchrecored' : search
    })
}
// module.exports.viewproducts = async (req,res) => {
//     // let prdata = await product.find(req.body);
//     // return res.render('view_products',{
//     //     'prd' : prdata
//     // });
//     let active = await product.find({'isactive': true});
//     let deactive = await product.find({'isactive': false});

//     // // console.log(req.body);   
//     // let active = await product.find({'isactive': true});
//     // let deactive = await product.find({'isactive': false});
//     // console.log(active);
//     // console.log(deactive);
//      return res.render('view_products',{
//         activedata : active,
//         deactivedata : deactive
//     });

//     // let search = '';
//     // if(req.query.search){
//     //     search = req.query.search;
//     // }
    
//     // let page = 1;
//     // if(req.query.page){
//     //     page = req.query.page
//     // }
//     // // console.log(req.query.page);
//     // var p_page = 5;

//     // let admindata = await product.find({
//     //     $or : [
//     //         {prname : {$regex : '.*'+search+'.*'}}
//     //     ]
//     // })
//     // .skip((page -1) * p_page)
//     // .limit(p_page)
//     // .exec();

//     // let countdata = await product.find({
//     //     $or : [
//     //         {prname : {$regex : '.*'+search+'.*'}}
//     //     ]
//     // }).countDocuments();

//     // return res.render('view_products',{
//     //     'activedata' : active,
//     //     'deactivedata' : deactive,
//     //     'countrecored' : Math.ceil(countdata/p_page),
//     //     'searchrecored' : search
//     // })
// }


module.exports.deactive = async (req,res) => {
    let prdata = await product.findByIdAndUpdate(req.params.id,
        {
            isactive : 'false'
        });
    return res.redirect('back');
}

module.exports.active = async (req,res) => {
    let prdata = await product.findByIdAndUpdate(req.params.id,
        {
            isactive : 'true'
        });
    return res.redirect('back');
}

module.exports.prupadatedit = async (req,res) => {
    let prdata = await product.findById(req.body.predit);
    if(prdata)
    {
        let prdeitl = await product.findByIdAndUpdate(req.body.predit, req.body);
        if(prdeitl)
        {
            return res.redirect('viewproducts');
        }
        return res.redirect('back');
    }
    return res.redirect('back');
}