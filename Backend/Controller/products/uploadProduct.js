const uploadProductPermissions = require("../../helper/permission")
const productmodel = require("../../models/productModel")

async function uploadProductController(req,res){
    try{
        const sessionuserId =req.userId
        if(!uploadProductPermissions(sessionuserId)){
            throw new Error("Permission denied")

        }
        const uploadProduct = new productmodel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(200).json({
            data: saveProduct,
            error : false,
            success : true,
            message : "Product successfully uploaded"
        })        

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = uploadProductController