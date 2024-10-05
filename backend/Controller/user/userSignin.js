import userModel from "../../models/userModels.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        // console.log("checkpassword",checkPassword);
        
        if(checkPassword){
            const tokenData ={
                _id:user._id,
                email:user.email
            }
            const token =await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8})
            const tokenOptons ={
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,tokenOptons).json({
                message:"Login successfully",
                data:token,
                success:true,
                error:false
            })
        }else{
            throw new Error("Invalid password")
        }


    }catch (err){
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

export default userLogin