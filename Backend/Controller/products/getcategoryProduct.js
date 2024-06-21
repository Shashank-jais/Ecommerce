const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
    try {
        const categories = await productModel.distinct("category");
        console.log(categories);

        const productsByCategory = [];
        for (const category of categories) {
            const product = await productModel.findOne({ category });
            if (product) {
                productsByCategory.push(product);
            }
        }

        res.json({
            data: productsByCategory,
            error: false,
            success: true,
            message: "Category Product",
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getCategoryProduct;
