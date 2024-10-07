import addToCartModel from "../../models/cartProduct.js";

const updateAddToCartProduct = async(req,res)=>{
  try{
    const currentUser = req.userId;
    const addToCartProduct = req.body._id
    const qty = req.body.quantity
    const updateProduct = await addToCartModel.updateOne({_id:addToCartProduct},{
      ...(qty && {quantity:qty})
    })
    res.json({
      message:"product Updated",
      data:updateProduct,
      error:false,
      success:true
    })
  }catch(err){
    res.json({
      message: err.meassge || err,
      success:false,
      error:true
    })
  }
}

export default updateAddToCartProduct;