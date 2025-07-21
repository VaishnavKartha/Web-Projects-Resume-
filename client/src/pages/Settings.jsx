import React, { useContext, useEffect, useRef, useState } from 'react'
import {themeArr} from '../lib/themes'
import { Theme } from '../ThemeContext'
import { Key, Send } from 'lucide-react';
const Settings = () => {
    const {theme:t,setTheme}=useContext(Theme);
    const [messages,setMessages]=useState([{
        id:1,
        text:"Hello",
        isSent:false
    },
    {
        id:2,
        text:"Hey",
        isSent:true
    }
])  
    const [isSentcurrent,setIsSent]=useState(true);
    const [typed,setTyped]=useState("");
    const scrollRef=useRef(null);
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
    

    const sendMessage=()=>{
        if(!typed.trim())return
        const newMsg={id:12,text:typed,isSent:isSentcurrent};
        setIsSent(!isSentcurrent);
        setMessages([...messages,newMsg]);
    }
  return (
    <div className='w-full min-h-screen'>
        <div className='w-fit mx-auto'>
            <h1 className='text-3xl font-bold'>Theme</h1>
            <p className='text-md mt-10'>Choose a theme for your chat</p>

            <div className='grid grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 '>
                {themeArr.map((theme)=>{
                    return <div onClick={()=>setTheme(theme)}  className={`${theme===t?"bg-base-200":"hover:bg-base-200/50"} cursor-pointer py-2 px-1`} >
                        <div className='h-8 grid grid-cols-4 gap-2 px-2 py-1' data-theme={theme}>

                        
                            <div className='bg-primary w-8'></div>
                            <div className='bg-secondary w-8'></div>
                            <div className='bg-accent w-8'></div>
                            <div className='bg-neutral w-8'></div>
                        </div>

                        <div>{theme.charAt(0).toUpperCase()+theme.slice(1)}</div>
                        
                    </div>
                })}

            </div>
            <h1 className='mt-15 text-4xl font-semibold'>Preview</h1>
            <div className=' bg-base-300 flex justify-center'>
                <div data-theme={t} className=' w-[60%] my-4 rounded'>
                    <div className='flex gap-4'>
                        <div className='w-[50px] h-[50px] rounded-full bg-secondary'/>
                        <div className='flex flex-col'>
                            <p>John Doe</p>
                            <label>Online</label>

                        </div>
                        
                    </div>
                    <hr/>


                    <div className='relative h-[350px] overflow-scroll flex flex-col'>


                        {messages.map((msg)=>{
                            return <div key={msg} className={` my-3 w-full flex ${msg.isSent?"justify-end ":"justify-start"}`}>
                                    <div className={`${msg.isSent?"bg-accent":"bg-base-200"} max-w-[40%] px-2 py-4 mx-2 rounded break-words`}>{msg.text}</div>
                                </div>
                        })}

                        

                        
                        
                        <div ref={scrollRef}/>
                    </div>
                    

                    <hr/>
                    <div className='w-full flex px-2 md:px-10 py-2 gap-4'>
                        <input type='text' value={typed} onChange={(e)=>setTyped(e.target.value)} className='w-full input input-bordered focus:outline-0' placeholder='Type your message'/>
                        <button onClick={sendMessage} className='cursor-pointer px-2 py-2 bg-primary hover:bg-primary/80 '><Send/></button>

                    </div>
                </div>
            </div>
        </div>

      
    </div>
  )
}

export default Settings
