import mongoose from "mongoose";
const deliveryInfoSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
})

const paymentModel = mongoose.model("payment",deliveryInfoSchema)

export default paymentModel;