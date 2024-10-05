import productModel from "../../models/productModel.js"

const getCategoryProduct = async(req,res)=>{
    try{
        const product = await productModel.distinct("category")
        console.log("category", product);
        const productByCategory = []
        for(const category of product){
            const products = await productModel.findOne({category})
            if(products){
                productByCategory.push(products)
            }
        }

        res.json({
            message:"Category product",
            data:productByCategory,
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

export default getCategoryProduct;