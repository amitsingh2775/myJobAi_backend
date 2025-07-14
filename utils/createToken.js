
import jwt from "jsonwebtoken"
export const CreateToken=(user)=>{
    return  jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
}