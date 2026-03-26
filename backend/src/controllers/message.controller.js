import Messages from "../model/message.model.js";
import User from "../model/user.model.js";

export const getAllContacts = async(req,res)=>{
    try{
        const loggedInUSer = req.user._id;
        const filterContacts =  await User.find({_id:{$ne:loggedInUSer}}).select("-password")
        res.status(200).json(filterContacts)
    }catch(err){
        console.log("fetchContact user",err)
        res.status(500).json({message:"Internal Server error"})
    }   
}

export const getmessagesById = async(req,res) =>{
    try{
        const myId = req.user._id;
        const chatUserID = req.params.id;
        
        const messages = await Messages.find({
            $or:[
                {senderId:myId , receiverId : chatUserID},
                {senderId:chatUserID , receiverId : myId}
            ]
        })
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}
export const getAllChats = async(req,res)=>{
    try{
        const loggedInUSer = req.user._id
        const messages = await Messages.find({
            $or:[{ senderId:loggedInUSer}, {receiverId: loggedInUSer}]
        })
        const chatPartnersIDs = [...new Set(messages.map((msg)=>{
            msg.senderId.toString() === loggedInUSer ? msg.receiverId.toString() : msg.senderId.toString()
        }))]

        const chatPartner = await User.find({_id : {$in:chatPartnersIDs}}).select("-password")
        res.status(200).json(chatPartner)
    }catch(err){
        console.log("Error iin getting all caht", err)
        res.status(500).json({message:"Internal Server error"})
    }
}
export const sendMessage = async(req,res) =>{
    const { text, image } = req.body;
    try{
        const senderId = req.user._id;
        const chatUserID = req.params.id;

        if(!text || !image) return res.status(400).json({message : "Text or Image is required"})
        if(senderId.equals(chatUserID)) return res.status(400).json({message : "You can not message yourself"})
        
        const reciverExist  = await User.exists(chatUserID)   
        if(!reciverExist) return res.status(400).json({message:"Receiver does not exist"}) 
        const message = new Messages({
            senderId,
            receiverId:chatUserID,
            text,
            image
        })
        await message.save()
        res.status(201).json(message)
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}
