import { MessagesSquare } from 'lucide-react'
import React from 'react'

const PlaceHolderComp = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-5'>
        <div className='animate-bounce border rounded-2xl p-4 border-primary'>
            <MessagesSquare/>
        </div>

        
            <h1 className='text-2xl md:text-4xl'>Welcome to chatty!!</h1>

            <p className='text-sm text-gray-300/80'>Select a conversation from sidebar to Continue</p>


      
    </div>
  )
}

export default PlaceHolderComp
