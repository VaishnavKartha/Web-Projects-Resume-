import { useCallback, useContext, useState } from "react"
import { Auth } from "../authContext"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

export const useAuth=()=>{
    const {authUser,setAuthUser,setIsCheckingAuth,setSigningIn,socket,setSocket,onlineUsers,setOnlineUsers}=useContext(Auth);

    const [isUpdatePassword,setIsUpdatePassword]=useState(false);
    
  const checkAuth = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      setAuthUser(response.data);
      connectSocket(response.data);
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [setAuthUser, setIsCheckingAuth])

     const signUp=async(userData)=>{
        try {
            setSigningIn(true);
            const response=await axiosInstance.post('/auth/signup',userData);
            setAuthUser(response.data);
            toast.success("Account Created Successfully")
            connectSocket(response.data);
           // console.log(response.data);
            
        } catch (error) {
            
            console.log("error in signUp",error.message);
            setAuthUser(null);
        }
        finally{
            setSigningIn(false);
        }
        
       
    }

    const signIn=async(userData)=>{
        try {
            setSigningIn(true);
            const response=await axiosInstance.post('/auth/login',userData);
            setAuthUser(response.data);
            toast.success("Logged In Successfully")
            connectSocket(response.data);
           // console.log(response.data);
            
        } catch (error) {
            
            console.log("error in login",error.message);
            setAuthUser(null);
        }
        finally{
            setSigningIn(false);
        }
        
       
    }

    const logout=async()=>{
        try {
            await axiosInstance.post('/auth/logout');
            setAuthUser(null);
            toast.success("Logged Out Successfully");
            disconnectSocket();
            
        } catch (error) {
            console.log(error.message);
        }
        
    }

    const resetPassword=async(user)=>{
        try {
            
           const res= await axiosInstance.put('/auth/resetpass',user)
           toast.success("Password Updated successfully");
           return true
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteAccount=async()=>{
        if(!authUser)return

        try {
            await axiosInstance.post('/auth/delete')
            setAuthUser(null);
            toast.success("Account Deleted");
            disconnectSocket();
        } catch (error) {
            console.log(error.message);
        }
    }

    const connectSocket=(user)=>{
        
        if(!user || socket?.connected)return
        const socketInstance=io("http://localhost:5173",{
            query:{userId:user._id},
            withCredentials: true
        });
        socketInstance.connect();
        setSocket(socketInstance);
         socketInstance.on("getOnlineUsers",(userIds)=>{
            setOnlineUsers(userIds);
        })

       

    }

    const disconnectSocket=()=>{
        if(socket?.connected){
            socket.disconnect();
            setSocket(null);
        } ;
        
    }
    
    return {checkAuth,signUp,logout,signIn,deleteAccount,resetPassword,isUpdatePassword,setIsUpdatePassword}
}