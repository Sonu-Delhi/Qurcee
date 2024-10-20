import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";

const deleteProductController = async(req,res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({success:false, message: 'Product not found'});

        res.json({
            success:true,
            message:"Product Deleted",
            data:product,
            error:false
        })
    }
    catch(err){
        console.log(err);
        res.json({
            success:false,
            message:err.message,
            error:true
        })
    }
}
export default deleteProductController