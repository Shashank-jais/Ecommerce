import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import ForgotPassword from '../pages/ForgotPassword'
import AdminPanel from '../pages/AdminPanel'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "Login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>,
            },
            {
                path: "Sign-Up",
                element:<SignUp/>,
            },
            {
                path: "product-category/:categoryname",
                element:<CategoryProduct/>,

            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path:"cart",
                element:<Cart/>,
            },
            {
                path:"Search",
                element: <SearchProduct/>
            },
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path:"allUsers",
                        element:<AllUsers/>
                    },
                    {
                        path:"allproducts",
                        element:<AllProducts/>
                    }
                ]
            }
        ]
    },
])
export default router