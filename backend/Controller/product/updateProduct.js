import uploadProductPermission from "../../helpers/permission.js"
import productModel from "../../models/productModel.js"

const updateProductControllers = async (req,res)=>{
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
        const {_id, ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        res.json({
            message:"Product update successfuly",
            data:updateProduct,
            success:true,
            error:false
        })
        
    }
    catch (err){
        res.status(400).json({
            message: err.message,
            error:true,
            success:false
        })
    }
}

export default updateProductControllers