const product = require('../models/products');
const subpr = require('../models/su_pr');
const extra = require('../models/extra_pr');

module.exports.addextraproducts = async (req,res) => {
    let extrapr = await product.find({});
    return res.render('add_extra',{
        csdata : extrapr
    });
}

module.exports.subdata = async (req,res) => {
    // console.log(req.body.mainpr)
    let extrapr = await subpr.find({'productid' : req.body.mainpr});
    return res.render('subdata',{
        prid : extrapr
    })
}

module.exports.insertextrapr = async (req,res) => {
    let extrapr = await extra.create(req.body);
    return res.redirect('back');
}

module.exports.viewextraproducts = async (req,res) => {
    let extrapr = await extra.find({}).populate('productid').populate('subpr').exec();
    return res.render('view_extra',{
        exd : extrapr
    })
}

module.exports.deleteadmin = async (req,res) => {
    let admindelet = await extra.findByIdAndDelete(req.params.id,);
    return res.redirect('back');
}

module.exports.updateadmin = async (req,res) => {
    
}