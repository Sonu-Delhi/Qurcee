import userModel from "../models/userModels.js"

const uploadProductPermission = async (userId)=>{
    const user = await userModel.findById(userId)
    if(user.role !== 'ADMIN'){
        return false
    }
    return true

}

export default uploadProductPermission