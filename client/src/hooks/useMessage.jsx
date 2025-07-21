import { useContext, useState } from "react"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import { Auth } from "../authContext";
import { useCallback } from "react";
export const useMessage=()=>{
    const {selectedUser,setSelectedUser,users,setUsers,messages,setMessages,socket}=useContext(Auth)
   

    const getUsers=async()=>{
       try {
             const res=await axiosInstance.get("/message/users");
             setUsers(res.data);
       } catch (error) {
            console.log("get contacts",error.message);
            toast.error(error.message);
        
       }
    }

    const getMessages = useCallback(async (userId) => {
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      setMessages(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [setMessages]);


    const sendMessage=async(messageData)=>{
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,{text:messageData})
            setMessages([...messages,res.data]);
            console.log(res.data);
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
            
        }
    }

    
  const subscribeToMessages = useCallback(() => {
    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
        if(newMessage.senderId!==selectedUser._id)return;
      setMessages((prev) => [...prev, newMessage]);
    });
  }, [socket, selectedUser, setMessages]);

    const unSubscribeFromMessages=()=>{
        const socket2=socket;
        socket2.off("newMessage");
    }

    return {getUsers,getMessages,sendMessage,subscribeToMessages,unSubscribeFromMessages}
}