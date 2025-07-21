import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
export const Theme=createContext();


const ThemeContext = ({children}) => {
    const [theme,setTheme]=useState(localStorage.getItem("chat-theme")||"dark");
    useEffect(()=>{
        localStorage.setItem("chat-theme",theme);
            
    },[theme])
  return (
    <Theme.Provider value={{theme,setTheme}}>{children}</Theme.Provider>
  )
}

export default ThemeContext
