import React, { useEffect,useState } from 'react'
//`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const img_300="https://image.tmdb.org/t/p/w300";
const Carousel = ({id,media}) => {
    const [cast,setCast]=useState([])
    const [crew,setCrew]=useState([])
    useEffect(()=>{
        if (!id || !media) return;
        const getActors=async()=>{
            const response=await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=86e65ebe06eb361c2f2f9602b7718656&language=en-US`)
            const data=await response.json();
            console.log(data);
            setCast(data.cast);
            setCrew(data.crew)
        }
        getActors();
    },[id,media]);
  return (
  <div className="bg-black text-white">
    <h1 className='text-yellow-400 self-start text-[6vw] sm:text-[4vw]'>Top Cast</h1>
    <div className='w-full mx-2.5 flex flex-row gap-5 overflow-scroll [scrollbar-width:none]'>
      {cast?.map((actor, index) => (
        <div key={index} className='flex flex-col min-w-[6vw]'>
          {actor.profile_path
            ? <img src={`${img_300}/${actor.profile_path}`} className='object-fit mb-4' />
            : <span>No Pic...</span>}
          <span className='text-[10px] sm:text-[16px]'>{actor.name}</span>
          <span className='text-[10px] sm:text-[14px]'>{actor.character}</span>
        </div>
      ))}
    </div>

    <h1 className='text-yellow-400 self-start text-[6vw] sm:text-[4vw]'>Crew</h1>
    <div className='w-full mx-2.5 flex flex-row gap-5 overflow-scroll [scrollbar-width:none]'>
      {crew?.map((mem, index) => (
        <div key={index} className='flex flex-col min-w-[6vw]'>
          {mem.profile_path &&
            <img src={`${img_300}/${mem.profile_path}`} className='object-fit mb-4' />}
          <span className='text-[10px] sm:text-[16px]'>{mem.name}</span>
          <span className='text-[10px] sm:text-[14px]'>{mem.job}</span>
        </div>
      ))}
    </div>
  </div>
);
}

export default Carousel
