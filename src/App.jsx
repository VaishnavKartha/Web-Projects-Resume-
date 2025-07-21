import { useEffect, useState } from "react"
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import SingleMoviePage from "./pages/SingleMoviePage";
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Header/>
     <MainNav/>
      <Routes>
        <Route path="/" element={<Trending/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/series" element={<Series/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/:media/:id" element={<SingleMoviePage/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
