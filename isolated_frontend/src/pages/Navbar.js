import { Link } from "react-router-dom";
import "./Navbar.css"
function Navbar(props){
  

  function handlelogout(){
    const apiUrl = '/api/logout/';
    fetch(apiUrl)
  .then(response => {
    return response.json(); // You can use response.text() or other methods for different data types.
  })
  .then(data => {
    // Use the data from the response here
    console.log(data);
    if(data.success==="True"){
      props.setUserLoggedIn(false)
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch.
    console.error('Fetch error:', error);
  });
  }

  
    return (
        <nav className="navbar">
          <div className="navbar_items" id="company">@theCompany</div>
          <div className="navbar_items" ><Link to={""}>Home</Link></div>
          
          {props.userloggedin?<div className="navbar_items"><Link to={"/room"}>Isolated</Link></div>:<div></div>}
          <div   className="navbar_items"><Link to={"contact"}>Contact_Us</Link></div>
          
          
          <div id="mode">
          {props.userloggedin?<div className="navbar_items custom_link" onClick={handlelogout}>logout</div>:<div className="navbar_items" ><Link to={"/login_register"}>login</Link></div>}
          
          <div  className="navbar_items custom_link"  onClick={props.toggle}>mode</div>
          </div>
          
          
        </nav>
      );
}
export default Navbar;