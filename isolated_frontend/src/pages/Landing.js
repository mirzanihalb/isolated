import "./Login.css"
import Login from './Login'
import Register from './Register'

import {useState} from "react"

function Landing(props){
    const [showlogin,setShowlogin] = useState(true)
    
    function toggle(){
        setShowlogin(!showlogin)
    }
    
  return(

    <div className="main">
          <div className="left">
            {/* {props.showhome?<Home/>:<Contact/>} */}
            <div>"Share Rooms, Share Questions, Share Stories."</div>
            
        </div>
          
          <div className="right" >
          {showlogin ?<Login toggle={toggle} userloggedin={props.userloggedin} setUserLoggedIn={props.setUserLoggedIn}/>:<Register toggle={toggle} userloggedin={props.userloggedin} setUserLoggedIn={props.setUserLoggedIn}/>}
          
        
        </div>
          
    </div>
  );
}
export default Landing;