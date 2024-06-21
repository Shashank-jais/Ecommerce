const addtocartmodel = require("../../models/cartProduct")

const countAddToCart =async(req,res)=>{
    try{
        const userId = req.userId
        const count = await addtocartmodel.countDocuments({userId:userId})
        res.json({
            data:{
                count:count
            },
            message:'ok',
            error:false,
            success:true
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}
module.exports = countAddToCart