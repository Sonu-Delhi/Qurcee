import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";
const uplaodProduct = async (req,res)=>{
    try{
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
        const product = new productModel(req.body);
        const saveProduct = await product.save()
        res.status(201).json({
            message: 'Product upload successfully',
            error:false,
            success:true,
            data: saveProduct
            });
    }
    catch(err){
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

export default uplaodProduct;