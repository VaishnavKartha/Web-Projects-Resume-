import React, { useContext } from 'react'
import ShopIcon from '@mui/icons-material/Shop';
import { Cart } from '../Context';
import { Link } from 'react-router-dom';
const Header = () => {
  const {cart}=useContext(Cart)
  return (
    <div className='flex justify-end sticky top-0 w-full  z-100 bg-[#3c4547] shadow-[0_5px_5px_rgba(0,0,0,0.25)] px-4 py-3'>
      <h1 className=' mr-auto font-bold text-3xl text-white'>Movie App</h1>
      <Link to="/wishlist">
        <div className='flex flex-col items-center text-white cursor-pointer'>
          {cart.length?<label>{cart.length}</label>:<span></span>}
          <span className='hover:animate-bounce'>
            <ShopIcon/>
          </span>
          
        </div>
      </Link>
      
    </div>
  )
}

export default Header
