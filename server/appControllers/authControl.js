import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";

 
export const signUp=async(req,res)=>{
    try {
        const {fullName,email,password}=req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length<6){
            return  res.status(400).json({message:"Password must be atleast 6 characters long"})
        }

        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User with the email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword,
        })
        try {
            await newUser.save();
            console.log("User saved successfully. Generating token...");
            
        } catch (error) {
            console.log("2",error.message)
        }
        

        

    
        generateToken(newUser._id,res)
        res.status(201).json(newUser)
        
       

        
    } catch (error) {
        console.log("1",error.message);
        res.status(500).json({message:"Internal Server error"})
        
    }
}


export const logIn=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect Password"});
        }

        generateToken(user._id,res);
        res.status(201).json({_id:user._id,fullName:user.fullName,email:user.email});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}



export const logOut=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(201).json({message:"Logged Out successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {

        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}


export const deleteAccount=async(req,res)=>{
    try {
        const user =req.user;
        if(!user){
            return res.status(400).json({message:"No User"});
        }
        const deletedUser = await User.findByIdAndDelete(user._id);
        if(!deletedUser){
            return res.status(400).json({message:"User Not found in db"});
        }
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:"false"
        })
        res.status(200).json(deletedUser);


    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const resetPassword=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters long"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const existingUser=await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({message:"User not found-Check your email"});
        }

        await User.updateOne({email},{password:hashedPassword});
        res.status(200).json({message:"Password Updated Successfully"})

        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}