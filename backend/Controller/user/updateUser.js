import userModel from "../../models/userModels.js";

const updateUser = async (req, res) => {
    try {
        const sessionUser = req.userId
        const { userId, name, email, role } = req.body;
        
        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };
        const user = await userModel.findById(sessionUser)
        console.log("userUpdate",user);
        
        const updateUser = await userModel.findByIdAndUpdate(userId,payload);

        res.status(200).json({
            data:updateUser,
            message: "User updated successfully",
            error: false,
            success: true,
            data: updateUser,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
};

export default updateUser