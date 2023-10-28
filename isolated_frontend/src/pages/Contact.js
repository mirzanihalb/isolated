import "./Login.css"
import { useState } from "react"

function Contact(){
  
    // write here contact fetch for api/contact
    // so that keep the data in the database and send message to the ownwer this details as mail
    const [usercontact,setUsercontact] = useState({
        name:"",
        email:"",
        message:"",
      })
      const handleinput = (e) => {
        const {name,value} = e.target
        setUsercontact({...usercontact,[name]:value})
        // console.log(userdata)
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        
        fetch("api/contact", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usercontact),
        })
          .then((response) => {
            // Return the JSON data to pass it along
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
        
      };



    return(
        <>
                <div id="reachus">Reach Us ..</div>
                <form onSubmit={handleSubmit}>
                <div className="contact">
                <input name="name" value = {usercontact.username} onChange={handleinput} type="text" placeholder="Name"/>
                <input name="email" value = {usercontact.username} onChange={handleinput} type="email" placeholder="Email"/>
                <textarea name="message" value = {usercontact.username} onChange={handleinput} rows="10" cols="50" placeholder="Enter Your Message"></textarea>
                <button>Send Message</button>
                </div>
                </form>
                
            
        </>
    )
}
export default Contact