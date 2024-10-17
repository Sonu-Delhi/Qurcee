import contactusModel from "../../models/contactModel.js";
const sendContactEmail = async(req,res)=>{
    try{
        const {name,email,phone, message}=req.body;
        const newContact = new contactusModel({name,email,phone,message});
        await newContact.save();
        res.status(201).json({message:"Email sent successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export default sendContactEmail;