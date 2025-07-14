import jwt from "jsonwebtoken"

export const  requiredAuth=(req,res,next)=>{
   
    try {
         const token=req.cookies.token
         if(!token){
            return res.status(401).json({message:"User UnAuthorized"})
         }
         const decode=jwt.verify(token,process.env.JWT_SECRET)
         req.user=decode
         next();
    } catch (error) {
        res.status(500).json({ message: error});
    }

}