const addtocartmodel = require("../../models/cartProduct");

const addToCartController = async(req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId
        const isProductAvailable = await addtocartmodel.findOne({ productId })
        // console.log("isProductAvailable", isProductAvailable);
        if(isProductAvailable){
            return res.json({
                message: "Product already added to the cart ",
                success:false,
                error:true,
            })
        }
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }
        const newAddToCart = new addtocartmodel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            message:"Product added successfully",
            data:saveProduct,
            success:true,
            error:false

        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = addToCartController;