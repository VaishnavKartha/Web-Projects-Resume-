
  import { Routes,Route, Navigate } from "react-router-dom"
  import Navbar from "./components/Navbar"
  import Home from "./pages/Home"
  import SignUp from "./pages/SignUp"
  import Login from "./pages/Login"
  import Profile from "./pages/Profile"
  import Settings from "./pages/Settings"
  import { useContext, useEffect } from "react"
  import { useAuth } from "./hooks/useAuth"
  import { Auth } from "./authContext"
import Loader from "./components/Loader"
import { Toaster } from "react-hot-toast"
import { Theme } from "./ThemeContext"
import EditPassword from "./pages/EditPassword"
  function App() {
    const {checkAuth}=useAuth();
    const {authUser,isCheckingAuth,onlineUsers}=useContext(Auth);
    useEffect(()=>{
      checkAuth();
    },[])

    const {theme,setTheme}=useContext(Theme);

    //console.log(onlineUsers)
    if(!authUser && isCheckingAuth){
      return <div>
        <Loader/>
        Loading..</div>
    }

    return (
      <div data-theme={theme}>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser?<SignUp/>:<Navigate to="/"/>}/>
        <Route path="/login" element={!authUser?<Login/>:<Navigate to="/"/>}/>
        <Route path="/profile" element={authUser?<Profile/>:<Navigate to="/login"/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/reset-password" element={!authUser?<EditPassword/>:<Navigate to="/"/>}/>
      </Routes>
      </div>
    )
  }

  export default App
