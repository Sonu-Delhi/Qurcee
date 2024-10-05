import jwt from 'jsonwebtoken'
const authToken = (req,res,next)=>{
    try{
        const token = req.cookies?.token
        // console.log("token",token);
        
        if(!token){
            return res.status(200).json({
                message:"Please Login...!",
                error:true,
                success:false
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            // console.log(err);
            // console.log("decoded",decoded);
            if(err){
                console.log("error auth",err);
                
            }
            req.userId= decoded._id
            next()

            
            
          });
        

    }catch(err){
        res.status(401).json({
            message: err.message,
            data:[],
            error:true,
            success:false
        })

    }
}
export default authToken