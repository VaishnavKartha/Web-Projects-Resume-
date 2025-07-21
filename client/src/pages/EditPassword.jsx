import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
    const {resetPassword}=useAuth();
    const navigate=useNavigate();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleClick=async()=>{
        if(formData.password.length<6){
            return toast.error("Invalid credentials");
        }

         if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            return toast.error("Invalid Email")
        }

        const success=await resetPassword(formData);
        if(success){
            navigate("/login");
        }

    }
  return (
    <div className='w-full min-h-screen flex justify-center py-2'>

        <div>

        <div className='w-fit min-h-[70vh] flex flex-col px-3 md:px-10 pt-5 pb-20 bg-base-200 '>
            <h1 className='mb-8 text-3xl'>Reset Your Password</h1>
            <div className='flex flex-col mb-4'>
                <label>Email:</label>
                <input 
                type='text'
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                className='input input-bordered focus:outline-0 w-[80vw] sm:w-[60vw] md:w-[30vw] '
                placeholder='Your email'/>

            </div>

            <div className='flex flex-col mb-4'>
                <label>New Password:</label>
                <div className='relative flex'>
                    <input 
                    type={showPassword?"text":"password"}
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                    className='input input-bordered focus:outline-0 w-[80vw] sm:w-[60vw] md:w-[30vw] '
                    placeholder='Password'/>

                    <div onClick={()=>setShowPassword(!showPassword)} className='absolute right-0 top-2 cursor-pointer  z-2'>{!showPassword?<EyeOff/>:<Eye/>}</div>
                </div>

            </div>

            <button onClick={handleClick} className='self-start mx-auto w-[40%] py-2 border cursor-pointer active:bg-primary hover:bg-neutral'>Confirm</button>
        </div>

        </div>
      
    </div>
  )
}

export default EditPassword
