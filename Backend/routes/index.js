const express = require('express');
const userSignUpController = require("../Controller/user/userSignup");
const userSigninController = require('../Controller/user/userSigin');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../Controller/user/userdetail');
const userLogoutController = require('../Controller/user/userLogout');
const AllUser = require('../Controller/user/AllUser');
const updateUser = require('../Controller/user/updateUser');
const uploadProductController = require('../Controller/products/uploadProduct');
const getProductController = require('../Controller/products/getProduct');
const updateproductController = require('../Controller/products/updateProduct');
const getcategoryproduct = require('../Controller/products/getcategoryProduct');
const getCategorywiseProduct = require('../Controller/products/getcategorywiseProduct');
const getProductDetails = require('../Controller/products/getProductDetails');
const addToCartController = require('../Controller/user/addToCartController');
const countAddToCart = require('../Controller/user/countAddToCart');
const addtocartview = require('../Controller/user/addtocartview');
const updateAddToCartProduct = require('../Controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../Controller/user/deleteAddToCartProduct');
const SearchProduct = require('../Controller/products/SearchProduct');


const router = express.Router();

router.post("/sign-up",userSignUpController)
router.post("/sign-in",userSigninController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogoutController)

//admin panel
router.get("/all-user",authToken,AllUser)
router.post("/updateUser",updateUser)


//upload Product
router.post("/uploadProduct",authToken,uploadProductController)
router.get("/getproduct",getProductController)
router.post("/updateproduct",authToken,updateproductController)


router.get("/getcategoryprodduct",getcategoryproduct)
router.post("/category-product",getCategorywiseProduct)


router.post('/product-details',getProductDetails)

router.post("/addtocart",authToken,addToCartController)

router.get("/countAddToCart",authToken,countAddToCart)
router.get('/addtocartview',authToken,addtocartview)

router.post("/update-cart-product",authToken,updateAddToCartProduct)

router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.get("/search",SearchProduct)



module.exports = router