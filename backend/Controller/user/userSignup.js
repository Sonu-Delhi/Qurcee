import mongoose from "mongoose";
import userModel from "../../models/userModels.js";
import bcrypt from 'bcryptjs'
const createUser= async (req,res,next)=>{
    try {
        const {email, password,name}=req.body;
        const user  = await userModel.findOne({email})
        if(user){
            throw new Error("Already user Exist")
        }
        
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hashSync(password,salt);

        if(!hashpassword){
            throw new Error("Failed to hash password")
        }

        const payload = {
            ...req.body,
            role:"GENERAL",
            password:hashpassword
        }


        const userData = new userModel(payload)
        const saveUser = await userData.save()
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message: "User created successfully",
        }) 

    }catch (err){
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
}
export default createUser