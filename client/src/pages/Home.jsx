import React, { useContext } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import { useMessage } from '../hooks/useMessage'
import PlaceHolderComp from '../components/PlaceHolderComp';
import ChatComponent from '../components/ChatComponent';
import { Auth } from '../authContext';

const Home = () => {
    const {selectedUser}=useContext(Auth);
  return (
    <div className='h-screen w-full bg-base-200/70 flex justify-center '>
        <div className='h-[calc(100vh-5rem)] w-full md:w-[75vw] border border-gray-400/60 bg-base-300 flex '>

            <ChatSidebar/>
            {selectedUser?<ChatComponent/>:<PlaceHolderComp/>}
        </div>
      
    </div>
  )
}

export default Home
