import "./Login.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom"
function Login(props){
  const navigate = useNavigate();
  // write here login fetch for api/login
  const [userlogindata,setUserloginData] = useState({
    username:"",
    password:"",
  })
  const handleinput = (e) => {
    const {name,value} = e.target
    setUserloginData({...userlogindata,[name]:value})
    // console.log(userdata)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    fetch("/api/login/", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userlogindata),
  })
  .then(response => response.json()) // Return the result of response.json()
  .then((data) => {
      if(data.success==="True"){
      console.log(data.message);
      props.setUserLoggedIn(true)
      navigate("/")
      
    }
  })
  // Handles errors by JSON
  .catch(error => {
      console.error(error);
  });
  
  };

  
  return(
    
          <form onSubmit={handleSubmit}>
            <div className="login_form">
                
                  <input name="username" value = {userlogindata.username} onChange={handleinput} type="text" placeholder="username" />
                  <input name="password" value = {userlogindata.password} onChange={handleinput} type="password" placeholder="password"/>
                  <button type="submit">Log In!</button>
                  <div className="lined">
                    <div>New User?</div>
                    <button onClick={props.toggle}>Register  </button> 
                    {/* here not div its a link to use afterwards */}
                  </div>
                
            </div>
            </form>
          
  );
}
export default Login;