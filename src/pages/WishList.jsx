import React, { useContext } from "react";
import { Cart } from "../Context";
const img_300="https://image.tmdb.org/t/p/w300";
const WishList=()=>{
    const {cart,setCart}=useContext(Cart)
    return <div className="flex flex-col items-center  min-h-screen w-screen bg-gradient-to-br from-black/85 to-black/90 text-white">
        <div>
            <h1 className="text-[7vw] sm:text-[5vw]">Wish List</h1>
        </div>

        <div className="flex flex-wrap gap-5 w-fit mx-10">
            {cart?.map((movie)=>{
                return <div>
                    <img className='w-[30vw] sm:w-[20vw] object-contain ' src={`${img_300}/${movie.poster_path}`}/>
                </div>
            })}
        </div>
    </div>
}

export default WishList