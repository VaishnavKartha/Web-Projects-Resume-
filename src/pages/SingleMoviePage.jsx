import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from '../components/Carousel';
const img_300="https://image.tmdb.org/t/p/w300";
const img_500="https://image.tmdb.org/t/p/w500";
//`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

const SingleMoviePage = () => {
    const {media,id}=useParams();
    const [movie,setMovie]=useState({})
    console.log(id)
    useEffect(()=>{
        const getData=async()=>{
            const response=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=86e65ebe06eb361c2f2f9602b7718656&language=en-US`);
            const data=await response.json();
            console.log(data);
            setMovie(data);
        
        }
        getData();
    },[id,media]);
  return (
    <div className="w-screen min-h-screen bg-black text-white">
  {movie.poster_path && (
    <div className="relative w-full h-full">
      <img
        className="w-full h-full object-fill"
        src={`${img_500}/${movie.poster_path}`}
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-transparent px-10 py-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <h1 className="text-[5vw]">{movie.title}</h1>
        </div>
        <div className="flex flex-col justify-center px-5">
          <h1 className="text-yellow-400 text-[6vw] sm:text-[4vw] flex flex-col">Overview</h1>
          <p>{movie.overview}</p>
          {movie.vote_average&&<span className='text-yellow-500 font-bold'>{`Rating : ${movie.vote_average}`}</span>}
          {movie.release_date&&<span>{`Release : ${movie.release_date}`}</span>}
        </div>
        <div className="sm:col-span-2 text-center">
          <button className="px-10 py-2 border rounded-full hover:bg-red-600 transition">
            Watch Trailer
          </button>
        </div>
        <div className="sm:col-span-2">
          <Carousel id={movie.id} media={media} />
        </div>
      </div>
    </div>
  )}
</div>

  )
}

export default SingleMoviePage
