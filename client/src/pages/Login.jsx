import { Eye, EyeOff } from 'lucide-react';
import React, { useContext, useState } from 'react'
import Graphics from '../components/Graphics';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../authContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const {signIn}=useAuth();
    const {isSigningIn}=useContext(Auth);
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    })

     const handleSubmit=(e)=>{
        e.preventDefault();
        if( !formData.email || !formData.password){
            return toast.error("All fields are required")
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            return toast.error("Invalid Email")
        }

        if(formData.password.length<6){
            return toast.error("Password must be atleast 6 character long")
        }

        signIn(formData);



    }



  return (
    <div className='w-full min-h-screen grid lg:grid-cols-2 '>
        <div className='px-10 md:px-17 lg:px-30 py-30'>
            <h1 className='text-center font-bold text-3xl mb-20'>Log In To Your Account</h1>

            <form className='' onSubmit={handleSubmit}>
                <div className='flex flex-col w-full mb-5'>
                    <label>Email</label>
                    <div className='w-full'>
                        <input 
                        type='text' 
                        value={formData.email}
                        onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        placeholder='your email'
                        className='w-full sm:w-7/10 input input-bordered focus:outline-none'/>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label>Password</label>
                    <div className='relative w-full sm:w-7/10'>
                        <input 
                        type={showPassword?"text":"password"}
                        value={formData.password}
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        placeholder='password'
                        className='w-full input input-bordered focus:outline-none'/>

                        <button type='button' onClick={()=>setShowPassword(!showPassword)} className='cursor-pointer z-2 absolute right-0 inset-y-0'>
                            {showPassword?<Eye/>:<EyeOff/>}
                        </button>
                    </div>
                    <Link to="/reset-password" ><span className='text-sm hover:underline text-blue-600/70'>Forgot Password?</span></Link>
                </div>

                <button disabled={isSigningIn} className=' w-full md:w-7/10 border py-2 mt-10 cursor-pointer'>
                    {isSigningIn?<Loader/>:"Sign In"}
                </button>
            </form>

            <div>
                <div className='mt-4'>Dont have an Account? <Link to="/signup"><span className='text-blue-700 font-semibold'>SignUp</span></Link></div>
            </div>

        </div>
        <div className='max-lg:hidden px-20'>
            <Graphics/>
        </div>
      
    </div>
  )
}

export default Login
