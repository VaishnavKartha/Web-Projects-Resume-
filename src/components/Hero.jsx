import React, { useState, useEffect, useRef } from 'react'
import one from '../assets/homeImage.jpg'
import two from '../assets/homeImage2.jpg'
import three from '../assets/homeImage3.png'
import four from '../assets/homeImage4.jpg'
const img_300="https://image.tmdb.org/t/p/w300";
const img_500="https://image.tmdb.org/t/p/w500";
const Hero = ({movies}) => {
  //const images = [one, two, three, four]
  const [currentImage, setCurrentImage] = useState(0)
  const intervalRef = useRef(null)
  const startInterval=()=>{
    intervalRef.current = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % (movies.length||1))
    }, 3000)
  }
  useEffect(() => {
    
    startInterval();
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleEnter=()=>{
    clearInterval(intervalRef.current);
  }
  const handleLeave=()=>{
    startInterval();
  }
  return (
<div className="relative w-full h-full overflow-hidden">
  <div
    className="flex transition-transform duration-700 ease-in-out h-full"
    style={{
      transform: `translateX(-${currentImage * 100}vw)`,
      width: `${(movies?.length || 1) * 100}vw`
    }}
  >
    {movies?.map((img, index) => (
      <div
        key={index}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="w-screen h-full flex-shrink-0 relative"
      >
        <img
          src={`${img_500}/${img.poster_path}`}
          alt={`Slide ${index}`}
          className="w-full h-full object-cover"
        />
        <div className='pb-8 absolute inset-0 z-40 w-full h-full flex justify-around items-center bg-gradient-to-br from-black to-transparent'>
          <img
            src={`${img_300}/${img.poster_path}`}
            className='w-1/4 hover:scale-105 transition-all duration-500 ease-in-out'
          />
          <h1 className='text-xl sm:text-3xl md:text-4xl text-white font-bold tracking-widest self-end'>
            {img.title}
          </h1>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Hero
