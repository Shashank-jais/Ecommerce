const productmodel = require("../../models/productModel");

const SearchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        const regex = new RegExp(query, 'i', 'g')

        const product = await productmodel.find({
            '$or': [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        res.json({
            data:product,
            message: 'Product',
            success: true,
            error: false
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports = SearchProduct