import React, { createContext, useState } from 'react'
export const Auth=createContext();
const AuthContext = ({children}) => {
    const [authUser,setAuthUser]=useState(null);
    const [isCheckingAuth,setIsCheckingAuth]=useState(true);
    const [isSigningIn,setSigningIn]=useState(false);


    const [selectedUser,setSelectedUser]=useState(null);
    const [users,setUsers]=useState([]);
    const [messages,setMessages]=useState([]);

    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
  return (
    <Auth.Provider value={{authUser,setAuthUser,isCheckingAuth,setIsCheckingAuth,isSigningIn,setSigningIn,selectedUser,setSelectedUser,users,setUsers,messages,setMessages,socket,setSocket,onlineUsers,setOnlineUsers}}>{children}</Auth.Provider>
  )
}

export default AuthContext
