import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    description: String,
    price: Number,
    sellingPrice: Number,
    productImage: [],
},{
    timestamps: true
})

const productModel = mongoose.model("product",productSchema)

export default productModel;