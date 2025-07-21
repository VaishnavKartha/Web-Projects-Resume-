import React from 'react'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
const MainNav = () => {
  return (
    <div className='z-100 w-full h-fit fixed bg-[#3c4547] bottom-0'>
      <div className='w-full sm:w-fit sm:m-auto text-white flex justify-between gap-5 px-10 py-4'>
        <Link to='/'>
            <div className='navIcons'>
                <WhatshotIcon/>
                <span>Trending</span>
            </div>
        </Link>
        
        <Link to='/movies'>
            <div className='navIcons'>
                <MovieIcon/>
                <span>Movies</span>
            </div>
        </Link>
        
        <Link to='/series'>
            <div className='navIcons'>
                <TvIcon/>
                <span>Watch</span>
            </div>
        </Link>
        
        <Link to='/search'>
            <div className='navIcons'>
                <SearchIcon/>
                <span>Search</span>
            </div>
        </Link>
        
      </div>
    </div>
  )
}

export default MainNav
