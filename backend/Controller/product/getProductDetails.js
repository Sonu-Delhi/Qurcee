import productModel from "../../models/productModel.js";

const getProductDetails = async(req,res)=>{
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            })
        }
        res.json({
            message: "Product details fetched successfully",
            error: false,
            success: true,
            data:product
        })
    }
    catch(err){
        res.status(401).json({
            message: err.message,
            error:true,
            success:false
        })
    }
}

export default getProductDetails