import userModel from "../../models/userModels.js"

const userDetails = async (req,res)=>{
    try{
        // console.log("userid",req.userId);
        const user = await userModel.findById(req.userId)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"User Details"
        })

        // console.log("user",user);
        
        
    }catch (err){
        res.status(400).json({
            message: err.message,
            error:true,
            success:false
        })
    }
}

export default userDetails