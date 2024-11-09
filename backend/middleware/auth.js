import { JWT_SECRET } from "../utils/config.js";
import jwt from "jsonwebtoken"



export const isAuth = async (req,res,next) =>{

    try {
        
        const token  =req.cookies.token;

        if(!token){
            return res.status(400).json({
                message:"Invalid token"
            })
        }

        const decode =await jwt.verify(token,JWT_SECRET);

        if(!decode){
            return res.status(400).json({
                message:"Invalid token"
            })
        }

        //   console.log(decode);
        
        req.id = decode.userid;
        next();

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}