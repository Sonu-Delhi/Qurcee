import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import Signup from "../Pages/Signup";
import AdminPanel from "../Pages/AdminPanel";
import Allusers from "../Pages/Allusers";
import Product from "../Pages/Product";
import ProductCategory from '../Pages/ProductCategory'
import Alpha from "../Pages/Alpha";
import Addtocart from "../Pages/Addtocart";
import TermsAndCond from "../Components/TermsAndCond";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/forget-password",
                element:<ForgetPassword/>
            },
            {
                path:"/sign-up",
                element:<Signup/>
            },
            {
                path:"/productcategory/:categoryName",
                element:<ProductCategory/>
            },
            {
                path:"/product/:id",
                element:<ProductDetails/>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/alpha-series",
                element:<Alpha/>
            },
            {
                path:"/addtocart",
                element:<Addtocart/>
            },
            {
                path:"/terms&conditions",
                element:<TermsAndCond/>
            },
            {
                path:"/admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path:"all-users",
                        element:<Allusers/>
                    },
                    {
                        path:"product",
                        element:<Product/>
                    },

                    // Add more routes for other admin functionalities if needed.
                ]
            },
        ]
    }
])

export default router;