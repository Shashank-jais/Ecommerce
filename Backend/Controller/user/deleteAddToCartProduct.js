const addtocartmodel = require("../../models/cartProduct")

const deleteAddToCartProduct =async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id

        const deleteProduct = await addtocartmodel.deleteOne({ _id : addToCartProductId})

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = deleteAddToCartProduct;
