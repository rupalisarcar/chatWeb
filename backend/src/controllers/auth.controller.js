import { generateToken } from '../lib/utils.js';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import path from "path";
import multer from "multer";

export const signUp = async(req, res) =>{
    const {fullname,email, password, profilePic} = req.body;
    const name = typeof fullname === 'string' ? fullname.trim() : "";
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : "";
    const pass = typeof password === 'string' ? password : ""
    try{
        if(!name || !normalizedEmail || !pass) 
            return res.status(400).json({message : "All fields are required"})
        if(pass.length<6)
            return res.status(400).json({message : "Password must be atleast 6 characters"})

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(normalizedEmail))
             return res.status(400).json({message : "Invalid email format"})
        const user = await User.findOne({email:normalizedEmail})
        if(user) return res.status(400).json({message: "Email already exists"}) 
        
        const salt =  await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(pass,salt)
        
        const newUser = new User({
            fullname:name,
            email:normalizedEmail,
            password:hashedPassword,
            profilePic
        })
        if(newUser){
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullname : newUser.fullname, 
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            console.log(err)
            res.status(400).json({message:'Invalid user data'})
        }
    }catch(err){
        console.log("error in sign up controller",err)
        res.status(500).json({message:'Internal server error'});
    }
}

export const login = async ( req,res ) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message:"Email and Passwords are required"})
    const registerdEmail = typeof email === 'string'  ? email.trim().toLowerCase():"";
    
    try{
        const user = await User.findOne({email : registerdEmail})
        
        if(!user) return res.status(400).json({message : "Invalid credentials"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid credentials"})

        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullname : user.fullname,
            email:user.email,
            profilePic:user.profilePic
        })
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logOut = ( _,res ) =>{
    res.cookie("jwt","",{
        maxAge:0
    })
    res.status(200).json({message:"Log out succssfully"})
}

export const updatedProfile = async(req,res) =>{
    const user =req.user;
    try{
        if(!req.file) return res.status(400).json({message:"No file is uploaded"})
        const updatedUser = await User.findByIdAndUpdate(user._id,{profilePic:req.file?.path},{new:true})
        res.status(200).json({message:'File uploaded successfully', updatedUser})
    }catch(err){
        res.status(500).json({error:"Failed to upload file"})
    }
}