import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    profilPic:String,
    role:String,
},{
    timestamps : true
})

const userModel = mongoose.model("user",userSchema);
export default userModel