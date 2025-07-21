import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Hero from '../components/Hero';
const Trending = () => {
    const [content,setContent]=useState([]);
    const [page,setPage]=useState(1)
      const [totalPages,setTotalPages]=useState();
    useEffect(()=>{
            const fetchdata=async()=>{
            const response=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=86e65ebe06eb361c2f2f9602b7718656&page=${page}`);
            const data=await response.json();
           // console.log(data);
            setContent(data.results);
            setTotalPages(Math.min(data.total_pages,10));
        }
        fetchdata();
    },[page]);
  return (
    <div className='w-full min-h-screen bg-[#517361] py-5 px-6 mb-24 flex flex-col items-center'>
        
        <div className='relative w-screen h-[20vh] sm:h-[80vh] bg-gradient-to-b from black to-transparent mb-5 text-center'>
          <h1 className='absolute top-0 z-20 w-full ml-auto text-white font-semibold text-2xl'>Top Trending</h1>
          <Hero movies={content.slice(0,4)}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
            {content?.map((movie)=>{
                return <MovieCard key={movie.id} 
                                title={movie.title}
                                poster={movie.poster_path}
                                media={movie.media}
                                release={movie.release_date}
                                rating={Number(movie.vote_average).toFixed(1)}
                                movie={movie}/>
            })}
        </div>

      {content.length?<Pagination page={page} updatePage={(id)=>setPage(id) } countPage={totalPages}/>:<></>}
      
    </div>
  )
}

export default Trending
