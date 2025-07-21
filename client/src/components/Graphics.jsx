import React from 'react'

const Graphics = () => {
  return (
    <div className='flex flex-col items-center gap-10 px-20'>
        <h1 className='font-bold text-3xl'>Welcome to Our Community</h1>

        <div className='grid grid-cols-3 w-full gap-5'>

            {new Array(9).fill().map((_,index)=>{
                return <div className={`w-full h-auto aspect-square bg-gray-500/60 ${((index+1)%2)!==0?"animate-pulse":""}`}/>
            })}
        </div>
      
    </div>
  )
}

export default Graphics
