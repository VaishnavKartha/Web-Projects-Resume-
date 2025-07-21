import React, { useContext } from 'react'
import { Auth } from '../authContext'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {authUser}=useContext(Auth);
    const {deleteAccount}=useAuth();
    const navigate=useNavigate();
    console.log(authUser)

    const formatDate=(date)=>{
        return new Date(date).toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric"});
    }

    const handleDelete=()=>{
      deleteAccount();

      if(!authUser){
        navigate('/login'); 
      }
    }
  return (
    <div className='w-full min-h-screen '>
      <div className='max-w-[500px] mx-auto flex flex-col items-center px-4 gap-3'>
        <h2>Profile</h2>
        <h3>Your Profile Information</h3>
        <div className='w-[100px] h-[100px] rounded-full border my-4 flex justify-center items-center text-2xl bg-accent border-none'>
          {authUser.fullName.charAt(0).toUpperCase()}
        </div>

        <div className='flex flex-col w-full'>
            <label>Full Name</label>
            <input type='text' value={authUser.fullName} disabled className='w-full input input-bordered'/>
        </div>


        <div className='flex flex-col w-full'>
            <label>Email</label>
            <input type='text' value={authUser.email} disabled className='w-full input input-bordered'/>
        </div>


      </div>

      <div  className='max-w-[500px] mx-auto flex flex-col px-4 gap-3 mt-10'>
        <h2>Account Information</h2>
        <hr/>
        <div className='flex justify-between'>
            <span>Member Since</span>
            <span>{formatDate(authUser.createdAt)}</span>
        </div>

        <div className='flex justify-between'>
            <span>Account Status</span>
            <span className='text-green-600'>Active</span>
        </div>

        <button onClick={handleDelete} className='w-fit text-red-600 border cursor-pointer active:bg-base-200/50 mx-auto px-3 py-2 '>Delete Account</button>

      </div>
      
    </div>
  )
}

export default Profile
