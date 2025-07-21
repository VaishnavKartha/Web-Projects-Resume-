import { getSocketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/userModel.js";


export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggestInUser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggestInUser}}).select("-password");  
        res.status(200).json(filteredUsers);
    } catch (error) {

        console.log(error.message)
        res.status(500).json({message:"internal Server Error"});
        
    }
}


export const getMessages=async(req,res)=>{
    try{
        const {id:recieverId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({$or:[{senderId:myId,recieverId:recieverId},{senderId:recieverId,recieverId:myId}]});
        res.status(200).json(messages);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"internal Server Error"});
    }
}

export const sendMessages=async(req,res)=>{
    try{
        const {id:recieverId}=req.params;
        const myId=req.user._id;
        const {text}=req.body;
        const message=new Message({
            senderId:myId,
            recieverId,
            text,
        })

        await message.save();

        const recieverSocketId=getSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",message);
        }

        res.status(201).json(message);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"internal Server Error"});
    }
}