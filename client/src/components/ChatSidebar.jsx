import React, { useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/useMessage'
import { Auth } from '../authContext';
import { Dot,UserRound } from 'lucide-react';

const ChatSidebar = () => {
    const {selectedUser,setSelectedUser,users,onlineUsers}=useContext(Auth);
    const { getUsers }=useMessage();
    const [filtered,setFiltered]=useState([]);
    const [isChecked,setIsChecked]=useState(false);

    useEffect(()=>{
        getUsers();
    },[])
    

    const handleChange=()=>{
      const newChecked=!isChecked;
      setIsChecked(newChecked);
      if(newChecked){
        const newUsers=users?.filter((user)=>onlineUsers.includes(user._id));
        setFiltered(newUsers);
      }
      

      


    }
  return (
    <div className='border-r border-gray-400/60 h-full px-4 py-4 md:w-2/5'>
     {users.length>0&& <div className=''>
        <div className='flex items-center'>
            <span><UserRound/></span>
            <h1 className='text-2xl max-sm:hidden'>Contacts</h1>
        </div>

        <div className='w-fit max-sm:hidden'>
            <input type='checkbox' checked={isChecked} onChange={handleChange} />
            <label className='ml-2 text-[12px]'>Show Online</label>
            <div>{`${onlineUsers.length-1} Online`}</div>
        </div>
        
      </div>}
        
    {/*contacts */}
      <div className='overflow-y-scroll overflow-x-hidden mt-7 '>
        {(!isChecked?users:filtered)?.map((user)=>{
            return <div onClick={()=>setSelectedUser(user)} key={user._id} className={`cursor-pointer flex items-center ${selectedUser?._id===user._id?"bg-base-300":""} flex gap-2 py-2 px-1`}>
                <div className='w-[40px] h-[40px] rounded-full bg-secondary relative flex justify-center items-center'>
                  <span>{user?.fullName.charAt(0).toUpperCase()}</span>
                  <span className='bg-base-200 rounded-full absolute -bottom-1.5 -right-1.5'><Dot className={`${onlineUsers.includes(user._id)?"stroke-green-600":"stroke-gray-500"} scale-[250%]`}/></span>
                </div>
                <div className='max-md:hidden'>{user.fullName}</div>
            </div>
        })}
      </div>
    </div>
  )
}

export default ChatSidebar
