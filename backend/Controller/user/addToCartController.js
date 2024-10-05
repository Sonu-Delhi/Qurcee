import addToCartModel from "../../models/cartProduct.js";
// import productModel from "../../models/productModel.js";

const addTocartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const currentUser = req.userId;

        // Check if the product is already in the user's cart
        const isProductInCart = await addToCartModel.findOne({ productId, userId: currentUser });
        if (isProductInCart) {
            return res.status(400).json({
                message: "Product already exists in cart",
                success: false,
                error: true
            });
        }

        // Create a new cart entry
        const payload = {
            productId,
            quantity: quantity || 1, // Default quantity to 1 if not provided
            userId: currentUser
        };

        const newAddToCart = new addToCartModel(payload);
        const SaveProduct = await newAddToCart.save();
        return res.status(201).json({
            data:SaveProduct,
            message:"Product Added to cart successfully...!",
            success:true,
            error:false
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

export default addTocartController;
