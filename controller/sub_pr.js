const product = require('../models/products');
const subpr = require('../models/su_pr');

module.exports.addsubproducts = async (req,res) => {
    let adsubpr = await product.find(req.body);
    return res.render('add_subpr',{
        csdata : adsubpr
    })
}

module.exports.insertsubpr = async (req,res) => {
    req.body.isactive = 'true';
    let adsubpr = await subpr.create(req.body);
    return res.redirect('back');
}

module.exports.viewsubproducts = async (req,res) => {
    // let viewsubpr = await subpr.find({}).populate('productid').exec();
    //     return res.render('view_subpr',{
    //         scdata : viewsubpr
    //     })

    let active = await subpr.find({'isactive' : true}).populate('productid').exec();
    let deactive = await subpr.find({'isactive' : false}).populate('productid').exec();
    return res.render('view_subpr',{
        activedata : active,
        deactivedata : deactive
    })
}

module.exports.deactive = async (req,res) => {
    let prdata = await subpr.findByIdAndUpdate(req.params.id,
        {
            isactive : 'false'
        });
    return res.redirect('back');
}

module.exports.active = async (req,res) => {
    let prdata = await subpr.findByIdAndUpdate(req.params.id,
        {
            isactive : 'true'
        });
    return res.redirect('back');
}