const addtocartmodel = require("../../models/cartProduct");

const addtocartview = async(req,res)=>{
    try{
        const currentUser = req.userId
        const allproduct = await addtocartmodel.find({userId:currentUser}).populate("productId")


        res.json({
            data: allproduct,
            success:true,
            error:false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = addtocartview;