import React, { useContext, useState } from 'react'
import { Auth } from '../authContext'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import {Menu, Settings, XIcon,UserPen,LogOut,MessageCircleHeart} from 'lucide-react'


const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false);
  const {authUser}=useContext(Auth)
  const navigate=useNavigate();
  const {logout}=useAuth();

  const handleLogout=()=>{
    logout();
  }
  return (
    <div className='relative w-full py-5 px-10 flex justify-between'>
      <div onClick={()=>navigate("/")} className='cursor-pointer flex text-2xl items-center'>
      <MessageCircleHeart/>
        ChatApp
      </div>

      <button onClick={()=>setIsOpen(true)} className='cursor-pointer md:hidden'><Menu/></button>
      <div className={`max-md:fixed max-md:px-5 max-md:py-4 max-md:min-h-screen max-md:z-50 max-md:backdrop-blur-md max-md:bg-black/30 max-md:w-[min(100%,20em)] pr-5 flex flex-col md:flex-row gap-5 ${isOpen?"right-0":"-right-full"}  md:right-0 max-md:transition-all duration-300 ease-in-out`}>
        <button onClick={()=>setIsOpen(false)} className='cursor-pointer md:hidden hover:bg-base-300 p-3'><XIcon/></button>
        <Link to="/settings">
        <div  onClick={()=>setIsOpen(false)} className='hover:bg-base-300 p-3 flex items-center'><Settings/>Settings</div>
        </Link>
        {authUser&&<Link to="/profile"><div  onClick={()=>setIsOpen(false)} className='hover:bg-base-300 p-3 flex'><UserPen/>Profile</div></Link>}
         {authUser&&<div onClick={()=>{handleLogout();setIsOpen(false)}} className='cursor-pointer hover:bg-base-300 p-3 flex'><LogOut/>Logout</div>}
      </div>
      
    </div>
  )
}

export default Navbar
