import React, { useEffect, useState,useRef } from 'react'
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
const Search = () => {
  const [type,setType]=useState(true)
  const [page,setPage]=useState(1);
  const [searchText,setSearchText]=useState("");
  const [content,setContent]=useState([]);
  const [totalPages,setTotalPages]=useState();
  const inputRef=useRef();
  useEffect(()=>{
    const SearchMovie=async()=>{
      const response=await fetch(`https://api.themoviedb.org/3/search/${type?"movie":"tv"}?api_key=86e65ebe06eb361c2f2f9602b7718656&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
      const data=await response.json();
      console.log(data.total_pages);
      setContent(data.results);
      setTotalPages(Math.min(data.total_pages,10));

    }
    SearchMovie();
    inputRef.current.focus();
  },[searchText,page,type])

  const handleMovies=()=>{
    setType(true);
    setPage(1);
  }

  const handleSeries=()=>{
    setType(false);
    setPage(1);
  }
  return (
    <div className='p-10 min-h-screen w-full bg-[#517361] flex flex-col items-center pb-25'>
      <div className='w-full'>
        <input ref={inputRef} value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='search for movies or series'
            className='text-white w-full rounded-full px-2 py-4  focus:outline-none focus:ring-2 focus:ring-orange-300'/>
      </div>
      <div className='w-full text-white flex justify-around mb-5'>
        <span onClick={handleMovies}className={`py-3 w-[40vw] sm:w-[20vw] text-center relative text-[18px] sm:text-2xl cursor-pointer overflow-x-hidden active:bg-[rgba(0,0,0,0.5)] transform transition-all duration-300 ease-in-out`}>Search Movies
          <span className={`absolute w-full border-b-2 bottom-0 left-0 transform transition-all duration-300 linear ${!type?"translate-x-full":"delay-300"} `}></span>
        </span>
        
        <span onClick={handleSeries} className={`py-3 w-[40vw] sm:w-[20vw] text-center relative text-[18px] sm:text-2xl cursor-pointer overflow-x-hidden`}>Search Series
          <span className={`absolute w-full border-b-2 bottom-0 left-0 transform transition-all duration-300 linear ${type?"-translate-x-full":"delay-300"} `}></span>
        </span>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-3 py-10 '>
        {content?.map((movie)=>{
          return (movie.poster_path&&<MovieCard key={movie.id} 
                            title={movie.title}
                            poster={movie.poster_path}
                            media={movie.media}
                            release={movie.release_date}
                            rating={Number(movie.vote_average).toFixed(1)}
                            movie={movie}/>)
        })}
      </div>
      {content.length?<Pagination page={page} updatePage={(id)=>setPage(id) } countPage={totalPages}/>:<></>}
      
    </div>
  )
}

export default Search
