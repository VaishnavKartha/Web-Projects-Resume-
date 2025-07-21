import React, { useContext, useEffect, useRef, useState } from 'react'
import { Auth } from '../authContext'
import {Send, XIcon} from 'lucide-react'
import { useMessage } from '../hooks/useMessage';
import toast from 'react-hot-toast';

const ChatComponent = () => {
    const {selectedUser,setSelectedUser,messages,authUser,onlineUsers}=useContext(Auth);
    const {getMessages,sendMessage,subscribeToMessages,unSubscribeFromMessages}=useMessage();
    const [typed,setTyped]=useState("");
    const sliderRef=useRef(null);
    const currentUser=authUser

    useEffect(()=>{
        getMessages(selectedUser._id)

        subscribeToMessages();

        return()=>unSubscribeFromMessages();
    },[selectedUser._id,getMessages,subscribeToMessages])

    
    

    useEffect(()=>{
        sliderRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])

    const handleClick=()=>{
        if(!typed.trim())return

        sendMessage(typed);
        setTyped("")
    }
    //if (!authUser || !authUser._id || !selectedUser) return toast.error("Not");
    console.log(authUser)
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full flex justify-between p-5 border-b border-gray-400/60'>
        <div className='flex gap-3 items-center'>
            <div className='w-[40px] h-[40px] bg-secondary rounded-full '/>
            <div>
              <span>{selectedUser.fullName}</span>
              <div className='block text-sm text-gray-400'>{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</div>
            </div>
            
        </div>

        <button onClick={()=>setSelectedUser(null)} className='cursor-pointer'><XIcon/></button>

      </div>



      <div className='w-full h-full overflow-y-auto bg-base-200'>
        {authUser&&messages.map((msg)=>{
            return <div className={`w-full flex ${msg.senderId?.toString()===currentUser._id?.toString()?"justify-end":"justify-start"}  px-3 py-2`}>
                <div className={`max-w-[200px] break-words border border-gray-500/70 px-4 py-2 rounded ${msg.senderId.toString()===currentUser._id.toString()?"bg-accent":"bg-neutral"}`}>{msg.text}</div>
            </div>
        })}

        <div ref={sliderRef}/>
      </div>





      <div className='w-full border-t border-gray-400/60 flex max-md:px-2 px-7 gap-4 py-3'>
      <input type='text' value={typed} onChange={(e)=>setTyped(e.target.value)} className='w-full focus:outline-0 input input-bordered' placeholder='Type your message here.......'/>
      <button onClick={handleClick} disabled={!typed} className='cursor-pointer max-md:px-1  px-2 py-2 bg-primary hover:bg-primary/80 rounded '><Send/></button>
        
      </div>
    </div>
  )
}

export default ChatComponent
