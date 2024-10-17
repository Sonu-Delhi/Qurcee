import express from "express";
import createUser from "../Controller/user/userSignup.js";
import userLogin from "../Controller/user/userSignin.js";
import userDetails from "../Controller/user/userDetails.js";
import authToken from "../middleware/authtoken.js";
import userLogout from "../Controller/user/userLogout.js";
import allUsers from "../Controller/user/allusers.js";
import updateUser from "../Controller/user/updateUser.js";
import uplaodProduct from "../Controller/product/uploadproduct.js";
import getProduct from "../Controller/product/getProduct.js";
import updateProductControllers from "../Controller/product/updateProduct.js";
import getCategoryProduct from "../Controller/user/getCategoryProduct.js";
import getCategoryWiseProduct from '../Controller/product/getCategoryviseProduct.js'
import getProductDetails from "../Controller/product/getProductDetails.js";
import addTocartController from "../Controller/user/addToCartController.js";
import countAddToCartProduct from "../Controller/user/countAddToCartProduct.js";
import addToCartViewProduct from "../Controller/user/addToCartViewProduct.js";
import updateAddToCartProduct from "../Controller/user/updateAddToCartProduct.js";
import deleteAddToCartProduct from "../Controller/user/deleteAddToCartproduct.js";
import filterProduct from "../Controller/product/filterProduct.js";
import paymentController from "../Controller/order/paymentCotroller.js";
import placeOrder from "../Controller/product/orderController.js";
// import webhooks from "../Controller/order/webhook.js";




const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', userLogin);
userRouter.get('/user-details', authToken, userDetails);
userRouter.get('/logout', userLogout);

// Admin_panel
userRouter.get("/allusers", authToken, allUsers);
userRouter.put("/updateuser", authToken, updateUser);

// Product_management
userRouter.post('/addproduct', authToken, uplaodProduct);
userRouter.get("/get-product",getProduct)
userRouter.post("/update-product",authToken,updateProductControllers)
userRouter.post("/delete-product",authToken,deleteAddToCartProduct)
userRouter.get('/getcategory',getCategoryProduct)
userRouter.post("/category-product",getCategoryWiseProduct)
userRouter.post("/product-details",getProductDetails)

// user Add to cart
userRouter.post("/addtocart",authToken,addTocartController)
userRouter.get("/countAddToCartProduct",authToken,countAddToCartProduct)
userRouter.get("/view-cart-product",authToken,addToCartViewProduct)
userRouter.post("/update-cart-product",authToken,updateAddToCartProduct)
userRouter.post("/delete-cart-product",authToken,deleteAddToCartProduct)
userRouter.post("/filter-product",filterProduct)
// userRouter.post("/contact",sendContactEmail)

// Payment Gatwey
userRouter.post("/checkout",authToken,paymentController)
// userRouter.post("/webhook",webhooks)  //api/webhook
userRouter.post("/order",authToken,placeOrder)
export default userRouter;
