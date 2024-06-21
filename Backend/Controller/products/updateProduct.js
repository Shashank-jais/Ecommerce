const uploadProductPermissions = require("../../helper/permission");
const productmodel = require("../../models/productModel");

async function updateproductController(req, res) {

    try {
        const sessionuserId =req.userId
        if(!uploadProductPermissions(sessionuserId)){
            throw new Error("Permission denied")

        }
        const {_id,...rebody}=req.body;
        const updateproduct = await productmodel.findByIdAndUpdate(_id,rebody);

        res.json({
            data: updateproduct,
            error : false,
            success : true,
            message : "Product successfully updated"
        })        


    }
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports = updateproductController