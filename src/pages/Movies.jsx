import React from 'react'
import MovieCard from '../components/MovieCard';
import Genre from '../components/Genre';
import Pagination from '../components/Pagination';
import { useState,useEffect } from 'react'
const Movies = () => {
  const [page,setPage]=useState(1);
  const [content,setContent]=useState([]);
  const [genreLink,setGenreLink]=useState("");
    const [totalPages,setTotalPages]=useState();
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=86e65ebe06eb361c2f2f9602b7718656&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreLink}`)
      const data=await response.json();
      //console.log(data);
      setContent(data.results);
      setTotalPages(Math.min(data.total_pages,10));
    }
    fetchData();
  },[page,genreLink])
  return (
    <div className='px-10 w-full h-full bg-[#517361] mb-24 flex flex-col items-center'>
      <h1 className='text-center mb-5 pt-3 text-white font-semibold text-3xl'>Discover Movies</h1>

      <Genre type="movie" genreLink={genreLink} setGenreLink={setGenreLink}/>

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

export default Movies
