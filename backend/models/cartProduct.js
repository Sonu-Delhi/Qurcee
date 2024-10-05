import mongoose from "mongoose";
const addToCartSchema=mongoose.Schema({
    productId:{
        ref:"product",
        type:String
    },
    quantity:Number,
    userId:String
},{
    timestamps: true
})

const addToCartModel = mongoose.model("addtocart",addToCartSchema)

export default addToCartModel;