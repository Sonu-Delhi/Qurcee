import productModel from "../../models/productModel.js";

// addProduct
const addProduct = async(req,res)=>{
    let image_filename = `${req.filename}`
    const product = new productModel({
        productName:req.body.productName,
        brandName:req.body.brandName,
        category:req.body.category,
        productImage:image_filename,
        description:req.body.description,
        price:req.body.price,
        sellingPrice:req.body.sellingPrice
    })
    try{
        await product.save()
        res.json({
            success:true,
            message:"Product Add",
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

// All product list
const listProduct = async(req,res)=>{
    try{
        const product = await productModel.find({});
        res.json({
            success:true,
            message:"All Product List",
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

// get single product

const getProduct = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        if(!product) return res.status(404).json({success:false, message: 'Product not found'});
        res.json({
            success:true,
            message:"Single Product",
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

// update product

const updateProduct = async(req,res)=>{
    try{
        let image_filename = req.file? `${req.file.filename}` : req.body.oldImage
        const product = await productModel.findByIdAndUpdate(req.params.id, {
            productName:req.body.productName,
            brandName:req.body.brandName,
            category:req.body.category,
            productImage:image_filename,
            description:req.body.description,
            price:req.body.price,
            sellingPrice:req.body.sellingPrice
        }, {new: true})

        if(!product) return res.status(404).json({success:false, message: 'Product not found'});

        res.json({
            success:true,
            message:"Product Updated",
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

// delete product

const deleteProduct = async(req,res)=>{
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
export default (addProduct,deleteProduct,getProduct,listProduct,updateProduct)