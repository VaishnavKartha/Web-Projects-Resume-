import React from 'react'
import { useState,useEffect } from 'react'
const Genre = ({ type,genreLink,setGenreLink }) => {
  const [genres,setGenres]=useState([]);
  const [selected,setSelected]=useState([]);
  useEffect(()=>{
    const fetchGenre=async()=>{
      const response=await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=86e65ebe06eb361c2f2f9602b7718656&language=en-US`)
      const data=await response.json();
     // console.log(data);
      setGenres(data.genres);
    }
    fetchGenre();
  },[])
  useEffect(()=>{
    const url=selected?.reduce((acc,cur)=>acc+=cur.id+',',"");
    setGenreLink(url);
    //console.log(url);
    
  },[selected])
  const handleSelect=(gen)=>{
        //const presentGenres=[...selected];
        
        setSelected([...selected,gen]);
        const newGenre=genres.filter((g)=>g.id!==gen.id);
        setGenres(newGenre);

    }
    const handleRemove=(gen)=>{
        //const presentGenres=[...selected];
        
        setGenres([...genres,gen]);
        const newSelectedGenre=selected.filter((g)=>g.id!==gen.id);
        setSelected(newSelectedGenre);

    }


 
  return (
    <div className='flex flex-wrap gap-2 mb-5'>
      {selected?.map((g)=>{
        return<span key={g.id} className='bg-[#de9059] text-white px-1 text-[15px] sm:text-[18px] sm:px-3 sm:py-1 cursor-pointer flex gap-2'>
              {g.name}
              <span onClick={()=>handleRemove(g)}>X</span>
            </span>
      })}
      {genres?.map((genre)=>{
        return <span onClick={()=>handleSelect(genre)} key={genre.id} className={` text-white border-1 px-1 text-[15px] sm:text-[18px] sm:px-3 sm:py-1 cursor-pointer`}>
        {genre.name}
     
              </span>
      })}
    </div>
  )
}

export default Genre
