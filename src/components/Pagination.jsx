import React, { useState } from 'react'

const Pagination = ({ page,updatePage=()=>{},countPage }) => {
   // const [count,setCount]=useState(countPage);
  return (
    <div className='w-full flex justify-around sm:w-fit sm:gap-10 mt-4'>
      {Array(countPage)?.fill("").map((_,index)=>{
        return <span onClick={()=>updatePage(index+1)} key={index} className={` flex justify-center items-center transform rounded-full ${(index+1)===page?"bg-white  text-black -translate-y-1 scale-110 ":"text-white text-[15px] opacity-70 bg-[#3c4547] "} px-2.5 py-[0.5px] text-xl cursor-pointer transition-all duration-300 ease-in-out`}>{index+1}</span>
      })}
    </div>
  )
}

export default Pagination
