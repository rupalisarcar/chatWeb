import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) =>{
    const { JWT_SECRET } = ENV
    if(!JWT_SECRET){
        // throw new Error("JWT_SECRET is not configured")
    }
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookies("jwt", token, {
        maxAge : 1*24*60*60*1000, //ms
        httpOnly:true, // prevent XSS attacks : cross-site scripting
        sameSite:"strict", //csrf attacks
        secure:ENV.NODE_ENV === "development"? false : true
    })
    return token
}