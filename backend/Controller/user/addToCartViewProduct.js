import addToCartModel from "../../models/cartProduct.js";

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        // Check if userId is available
        if (!currentUser) {
            return res.status(400).json({
                message: "User not authenticated",
                success: false,
                error: true
            });
        }

        // Await the result of the find() query
        const allProducts = await addToCartModel.find({
            userId: currentUser
        }).populate("productId");

        // Send the response with data
        res.status(200).json({
            data: allProducts,
            message: "Products fetched successfully",
            success: true,
            error: false
        });
    } catch (err) {
        // Handle errors and send an appropriate status code
        res.status(500).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true
        });
    }
};

export default addToCartViewProduct;
