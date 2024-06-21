const productmodel = require("../../models/productModel");

const getCategorywiseProduct = async (req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await productmodel.find({ category })
        res.json({
            data:product,
            message:"Product",
            success:true,
            error:false
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getCategorywiseProduct;