const productmodel = require("../../models/productModel")

const getProductController = async(req,res)=>{
    
    try{
        const allproducts = await productmodel.find().sort({createdAt: -1})
        res.status(200).json({
            data: allproducts,
            error : false,
            success : true,
            message : "All Product"
        })        

    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}
module.exports = getProductController