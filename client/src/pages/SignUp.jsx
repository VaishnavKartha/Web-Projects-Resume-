import { Eye, EyeOff } from 'lucide-react';
import React, { useContext, useState } from 'react'
import Loader from '../components/Loader';
import { Auth } from '../authContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Graphics from '../components/Graphics';

const SignUp = () => {
    const {isSigningIn,setSigningIn}=useContext(Auth);
    const {signUp}=useAuth();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:"",
        })

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!formData.fullName || !formData.email || !formData.password){
            return toast.error("All fields are required")
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            return toast.error("Invalid Email")
        }

        if(formData.password.length<6){
            return toast.error("Password must be atleast 6 character long")
        }

        signUp(formData);



    }
  return (
    <div className='w-full min-h-screen grid lg:grid-cols-2 gap-10 px-8 md:px-20 lg:px-30 items-center'>
        <div className='flex flex-col gap-10 md:gap-6'>
            <div className='w-full text-center flex flex-col gap-3'>
                message-Icon
                <h1 className='text-3xl font-bold'>Create Account</h1>
                <h3 className='text-lg'>Get Started with your free account</h3>
                
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col w-full md:w-7/10'>
                    <label>Full Name</label>

                    <input 
                        type='text' 
                        value={formData.fullName} 
                        onChange={(e)=>setFormData({...formData,fullName:e.target.value})} 
                        className='relative self-start w-full input input-bordered focus:outline-none border-gray-400/80'  
                        placeholder='Enter your name'
                    />
                </div>

                <div className='flex flex-col w-full md:w-7/10'>
                    <label>Email</label>

                    <input 
                        type='text' 
                        value={formData.email} 
                        onChange={(e)=>setFormData({...formData,email:e.target.value})} 
                        className='relative self-start w-full input input-bordered focus:outline-none border-gray-400/80'  
                        placeholder='Enter your mail'
                    />
                </div>


                <div className='flex flex-col  w-full md:w-7/10'>
                    <label>Password</label>

                    <div className='relative w-full'>
                         <input 
                            type={showPassword?"text":"password"} 
                            value={formData.password} 
                            onChange={(e)=>setFormData({...formData,password:e.target.value})} 
                            className='input w-full input-bordered focus:outline-none border-gray-400/80'  
                            placeholder='password'
                        />

                       {!showPassword? <button type='button' onClick={()=>setShowPassword(true)} className='z-10 absolute inset-y-0 right-0'>
                            <EyeOff/>
                        </button> : <button type='button' onClick={()=>setShowPassword(false)} className='z-10 absolute inset-y-0 right-0'>
                                <Eye/>
                            </button>}
                    </div>

                   

                    
                </div>
                

                <button disabled={isSigningIn}   className='w-7/10  border px-7 py-3 font-bold cursor-pointer'>
                    {isSigningIn?<Loader/>:"Create Account"}
                </button>
                
                
            </form> 

            <div className='w-7/10 text-center'>
                <div className='text-sm'>Already have an account? <Link to="/login"><span className='font-semibold text-md text-blue-600/90'>SignIn</span></Link></div>
            </div>

        </div>
        <div className='max-lg:hidden'>
            <Graphics/>
        </div>
      
    </div>
  )
}

export default SignUp
