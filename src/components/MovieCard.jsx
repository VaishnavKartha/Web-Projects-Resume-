import React, { useContext } from 'react'
import { useState } from 'react';
import { Cart } from '../Context';
import { Link } from 'react-router-dom';
const img_300="https://image.tmdb.org/t/p/w300";
const MovieCard = ({title,poster,media,release="",rating, movie }) => {
  const {cart,setCart}=useContext(Cart);
  const [disable,setDisable]=useState(false);
  let ids=[];
  const isInCart = cart?.some((item) => item.id === movie.id);

  const addToWishlist=()=>{
    ids=cart?.map((item)=>item.id);
    if(!ids.includes(movie.id)){
      setCart([...cart,movie]);
      //setDisable(true);
    }
  }

  const removeFromWishList=()=>{
    ids=cart?.map((item)=>item.id);
    if(ids.includes(movie.id)){
      const newCart=cart.filter((item)=>item.id!==movie.id);
      setCart(newCart)
      //setDisable(false);
    }

  }

  return (
    
    <div className='relative w-fit flex flex-col items-center bg-[#84988c] px-4 py-4 transform hover:-translate-y-2.5 hover:shadow-[0_5px_1  5px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out'>
      <Link to={`/${movie.media_t}/${movie.id}`}>
      <h1 className='text-white font-bold sm:text-xl text-[15px]'>{title}</h1>
      <div className='mb-5 mt-3'>
        <img src={`${img_300}/${poster}`} className='object-contain'/>
      </div>
      <div className='w-full flex justify-around'>
        <span className='text-white text-[13px] sm:text-[18px]'>{media==="movie"?"Series":"Movie"}</span>
        {release&&<span className='text-white text-[13px] sm:text-[18px]'>{release ||"Unknown" }</span>}
      </div>
       </Link>
      {!(rating==="0.0") &&<div className='absolute -right-1 -top-1 text-white bg-yellow-400 rounded-full px-1 py-0.5'>{rating}</div>}
      {!isInCart?<button onClick={addToWishlist} className='text-white bg-yellow-500 rounded-full px-3 py-1 mt-4'>Add to WishList</button>:
        <button onClick={removeFromWishList} className='text-white bg-yellow-500 rounded-full px-3 py-1 mt-4'>Remove from WishList</button>}
    </div>
   
  )
}

export default MovieCard
