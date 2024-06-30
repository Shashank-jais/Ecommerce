import SearchProduct from "../pages/SearchProduct"

// const { default: SignUp } = require("../pages/SignUp");
const backendDomain = "https://e-commerce-api-blond.vercel.app"
const summaryApi = {
    SignUp: {
        url:`${backendDomain}/api/sign-up`,
        method:"post",
    },
    SignIn: {
        url:`${backendDomain}/api/sign-in`,
        method:"post",
    },
    UpdatePassword: {
        url:`${backendDomain}/api/updatepassword`,
        method:"post",
    },
    currentUser:{
        url:`${backendDomain}/api/user-details`,
        method:"post",
    },
    logout_user:{
        url:`${backendDomain}/api/userLogout`,
        method:"get",
    },
    AllUser:{
        url:`${backendDomain}/api/all-user`,
        method:"get",
    },
    updateUser:{
        url:`${backendDomain}/api/updateUser`,
        method:"post",
    },
    uploadProduct:{
        url:`${backendDomain}/api/uploadProduct`,
        method:"post",
    },
    allProducts:{
        url:`${backendDomain}/api/getproduct`,
        method:"get",
    },
    updateProduct:{
        url:`${backendDomain}/api/updateproduct`,
        method:"post",
    },
    categoryproduct:{
        url:`${backendDomain}/api/getcategoryprodduct`,
        method:"get",
    },
    categorywiseProduct:{
        url:`${backendDomain}/api/category-product`,
        method:"post",
    },
    productDetails:{
        url:`${backendDomain}/api/product-details`,
        method:"post",
    },
    addToCartProduct:{
        url:`${backendDomain}/api/addtocart`,
        method:"post",
    },
    countAddToCart:{
        url:`${backendDomain}/api/countAddToCart`,
        method:"get",
    },
    addtocartview:{
        url:`${backendDomain}/api/addtocartview`,
        method:"get"
    },
    updateCartProduct : {
        url:`${backendDomain}/api/update-cart-product`,
        method:"post"
    },
    deleteCartProduct : {
        url:`${backendDomain}/api/delete-cart-product`,
        method:"post"
    },
    SearchProduct:{
        url:`${backendDomain}/api/search`,
        method:"get"
    },
    filterProduct : {
        url:`${backendDomain}/api/filter`,
        method:"post"
    }
    
}

export default summaryApi