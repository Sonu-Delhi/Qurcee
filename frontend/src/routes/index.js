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
import Shippingdelivery from "../Pages/Sippinganddelivery";
import PaymentSecurityHelp from "../Pages/PaymentSecurityHelp";
import FurnitureCareHelp from "../Pages/FurnitureCareHelp";
import QurceeWarrantyHelp from "../Pages/QurceeWarrantyHelp";
import AboutQurceeFurniture from "../Pages/AboutQurceeFurniture";
import Service from "../Pages/Service";
import ContactUs from "../Pages/ContactUs";
import PlaceOrder from "../Pages/PlaceOrder";
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
              path:"/about",
              element:<AboutQurceeFurniture/>  
            },
            {
                path:"/service",
                element:<Service/>
            },
            {
                path:"/contact-us",
                element:<ContactUs/>
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
                path:"/product-category",
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
                path:"/order",
                element:<PlaceOrder/>
            },
            {
                path:"/buy",
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
                path:"/sipping&delivery",
                element:<Shippingdelivery/>
            },
            {
                path:"/payment-security",
                element:<PaymentSecurityHelp/>
            },
            {
                path:"/furniture-care",
                element:<FurnitureCareHelp/>
            },
            {
                path:"/warranty",
                element:<QurceeWarrantyHelp/>
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