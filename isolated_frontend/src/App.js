import './App.css';
import './index.css'
import Navbar from './pages/Navbar'
// import Landing from './pages/Landing'
import Room from "./pages/Room"
import Home from "./pages/Home"
import Contact from './pages/Contact';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './pages/Login';
import Landing from './pages/Landing';

function App() {
  const [userloggedin,setUserLoggedIn] = useState(false)
  useEffect(()=>{
    fetch("/api/isauthenticated/")
    .then(res => res.json())
    .then((data)=>{
      if(data.success==="true"){
        setUserLoggedIn(true)
      }
      
    })
  },[]);
  const [mode,setMode] = useState("dark_mode")
  
  function togglemode(){
    if (mode==="white_mode"){
      setMode("black_mode")
    }
    else{
      setMode("white_mode")
    }
    console.log(mode)
  }
  // Replace 'your-api-endpoint' with the actual URL you want to fetch data from.


  
  return (
    <div className="App" id={mode}>
      
      <Router>
      <nav><Navbar  toggle={togglemode} userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn}/></nav>
      <div className='main_body'>
        <Routes>
          
          <Route path='' element={<Home/>}/>
          <Route path='/login_register' element={<Landing userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn}/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/room' element={<Room userloggedin={userloggedin}/>}/>
        </Routes>
      </div>
      </Router>
      
      <footer>@copyrighths theCompany2023</footer>
      
      
      
    </div>
  );
}

export default App;
