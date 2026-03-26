import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async(req,res,next) =>{
    try{
        const authToken = req.cookies.jwt;
        if(!authToken) return res.status(401).json({message:"Unauthorized - No token provided"})
            
        const decoded = jwt.verify(authToken, ENV.JWT_SECRET)
        if(!decoded) return res.status(401).json({message:"Unauthorized - Invalid token"})
        
        const user = await User.findById(decoded.userId).select("-password")  
        if(!user)return res.status(404).json({message:"User not found"})

        req.user = user;
        next()
    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}   