
const userLogout = async (req,res)=>{
    try {
        res.clearCookie("token")

        res.json({
            message: "Logout Successfully...!",
            error:false,
            success:true,
            data: []
        })
    } catch (err) {
        res.status(500).json({
            message:err.message,
            error:true,
            success:false 
            });
    }
}

export default userLogout