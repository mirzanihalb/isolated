import "./Login.css"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
function Register(props){
  const navigate = useNavigate();
  // write here register fetch for api/register
  const [warning,setWarning] = useState(false)
  const [userdata,setUserData] = useState({
    firstname:"",
    username:"",
    email:"",
    password:"",
    confirm_password:""

  })
  const handleinput = (e) => {
    const {name,value} = e.target
    setUserData({...userdata,[name]:value})
    
  }


  const handleSubmit = (e) =>{
    e.preventDefault();

    if(userdata.password===userdata.confirm_password){
      fetch("/api/register/", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
    })
    .then(response => response.json()) // Add 'return' here
    .then(data => {

        console.log(data);
        if(data.success==="True"){
          props.setUserLoggedIn(true)
          navigate('/')
        }
    })
    .catch(error => {
        console.error(error);
    });
    
    }
    
   
    
  };

  return(
    
          <form onSubmit={handleSubmit}>
            <div className="login_form">
                <input name="firstname" value = {userdata.firstname} onChange={handleinput} type="text" placeholder="firstname" />
                <input name="username" value = {userdata.username} onChange={handleinput} type="text" placeholder="username" />
                <input name="email" value = {userdata.email} onChange={handleinput} type="email" placeholder="email"/>
                <input name="password" value = {userdata.password} onChange={handleinput} type="password" placeholder="password"/>
                <input name="confirm_password" value = {userdata.confirm_password} onChange={handleinput} type="password" placeholder="confirm_password"/>
                <button >Register</button>
                <div className="lined">
                <div>Already a User?</div>
                <button onClick={props.toggle}>Login</button>
                
                </div>
                
            </div>
            </form>
          
  );
}
export default Register;