import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";

const updateProductController = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }
        const { _id, ...resBody } = req.body;
        
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        if (!updateProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
};

export default updateProductController
