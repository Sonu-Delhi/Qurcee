import Category from "../../models/Category.js";

  
const categoriesProduct = async(req,res)=>{
    try {
        const categories = await Category.find();
    
        if (!categories.length) {
          return res.status(404).json({ message: 'No categories found.' });
        }
    
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
      }
}

export default categoriesProduct