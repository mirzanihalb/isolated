import { useState,useEffect } from "react";
import "./Login.css"
import "./Room.css"
import login_required from "./login_required.png"

import user_logo from "./user1.jpg";

function Room(props){
   
    // when create button is hit you have to create a room with the user
    // and then display a new page in the right component


    // when join(in the left side (click and inputjoin)
    // when you display all the rooms that particular value you have to take when clicked and then fetch  
    //  the comments and replies of this room and display in the right comment

    // when the comment input addcomment button clicked 
    // add this comment to this room with the id of user

    // when the replyinput has changed and submitted that should be 
    // put into the reply table (with the userid and comment id and room code i think)\
    // these i should pass and save it in databse

    const [roomnumbers,setRoomnumbers] = useState([])

    const [roomcode,setRoomcode] = useState(0)

    const [roomdetail,setRoomdetail] = useState([])

    const [joinerror,setjoinerror] = useState(false)

    

    

    useEffect(() => {
        // Code for your side effect goes here
        isolated_rooms();
        // Make an HTTP GET request to "/api/isolated_rooms/"
        
      }, []);
      function isolated_rooms(){
        fetch("/api/isolated_rooms/")
          .then(response => {
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            // Use the data from the response here
            // console.log(data.room_dicts);
            setRoomnumbers(data.room_dicts)
            

          })
          .catch(error => {
            // Handle any errors that occurred during the fetch.
            console.error('Fetch error:', error);
          });
      }
      function handleroomcode(id){
        
        fetch("/api/room_details/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"id":id}),
        })
        .then(response => response.json()) // Add 'return' here
        .then(data => {
            // console.log(data.room_content)
            if(data.success==="true"){
                setRoomcode(id)
                setRoomdetail(data.room_content)
            }
            else{
                setjoinerror(true)
                setTimeout(() => {
                    setjoinerror(false)
                  }, 3000);
            }
            

            // for (const key in data.room_content) {
            //     const value = data.room_content[key];
            //     console.log("------------start---------------------")
            //     console.log(key);

            //     for (const element of value) {
            //         console.log(element);
            //     }
            //     console.log("------------end ---------------------")
            //     // here one input to reply to this comment
            // }
            
            
            // console.log(data[0]);
            // console.log(data[0])
            
        })
        .catch(error => {
            console.error(error);
        });
      }
      
    let textareaValue = '';
    const handleTextareaChange = (event) => {
        textareaValue = event.target.value;
        // set a state give it to the texarea and then update it to empty from here
      };
    

    function handleReply(comment_id){
        // console.log(comment_id)
        // console.log(textareaValue)
        fetch("/api/post_question/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({comment_id:comment_id,reply_body:textareaValue,type:"reply"}),
        })
        .then(response => response.json()) // Add 'return' here
        .then(data => {
    
            console.log(data);
            if(data.success==="True"){
              console.log("success")
              handleroomcode(roomcode)
              
              
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    function handleComment(){
        fetch("/api/post_question/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({comment_body:textareaValue,room:roomcode,type:"comment"}),
        })
        .then(response => response.json()) // Add 'return' here
        .then(data => {
    
            console.log(data);
            if(data.success==="True"){
              console.log("success")
              handleroomcode(roomcode)
              
              
              
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    function handleCreate(){
        fetch("/api/createroom/")
        .then(response => response.json()) // Add 'return' here
        .then(data => {
    
            console.log(data);
            if(data.success==="True"){
              console.log("success")
              console.log(data.roomcode)
              isolated_rooms()
              
              
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    function handleJoin(){
        // console.log(typeof(textareaValue))
        // it has to be only numbers and non empty
        // else console log
        if(!isNaN(textareaValue)){
            handleroomcode(parseInt(textareaValue, 10))
        }
        else{
            setjoinerror(true)
            setTimeout(() => {
                setjoinerror(false)
              }, 3000);
        }
        
    }
      
      
    return (<>
        {props.userloggedin?<>
            <div className="main_room">
                <div className="room_left" >
                    
                    <div className="room_lined">
                        <div className="room_lined_items" onClick={handleCreate}>create</div>
                        <div className="room_lined_items" onClick={handleJoin}>join</div>
                        <input placeholder="Enter Room Code" onChange={handleTextareaChange}/>
    
                    </div>
                    {joinerror?<div className="room_numbers" style={{color:"red"}}>Check Room Number Entered</div>:<div></div>}
                    {/* <div className="room_numbers">
                        <div> 1449</div>
                        <div className="room_number_item">1229</div>
                        
                    </div> */}
                    {/* run the map and display all the rooms of the user */}
                    <div className="room_numbers">Rooms</div>
                    <div className="room_numbers">
                    {roomnumbers.map((room, index) => (
                        <div  className="room_number_item" key={index} onClick={() => handleroomcode(room.roomcode)} >
                        {room.roomcode}
                         </div>
                         )
                        )
                    }
                    </div>
                </div>
                <div className="room_right">
                    
                    <div className="room_code">Room : {roomcode}</div>
                    <div className="question_head">
                        {/* Post A Question :  <input style={{width:"320px"}}/><span><button>+</button></span> */}
                          
                        
                        <textarea style={{width: "1009px", height: "31px"}} placeholder="Post a Question" onChange={handleTextareaChange} ></textarea>
                        <button onClick={()=>handleComment()}>+</button>
                    </div>
                    <div>
                        {/* display the questions from the databases of this room code */}
                        <div>
                {/* {Object.keys(roomdetail).map((key) => {
                    const value = roomdetail[key];
                    
                    
                    <div key={key}>
                        {value.map((element, index) => (
                        <div key={index}>
                            {element}
                        </div>
                        ))}
                    </div>
                    
                })} */}
                {roomdetail.map((element, index) => (
                       
    
                        <div className="block">
                         <div  className="comment_block" key={index}>
                        {/* {index + "   " +element} */}
                        <img src={user_logo} alt="" className="logo" />
                        {element[0][1]}
                        </div>
                        <div className="reply_block">
                            {element[1].map((reply,i)=>(
                                <div className="reply_block_item">
                                <img src={user_logo} alt="" className="logo"/>
                                {reply}
                                 </div>
                            ))}
                            <div className="reply_button">
                            <textarea style={{width: "744px", height: "38px"}} onChange={handleTextareaChange}  placeholder="Reply"></textarea>
                            <button onClick={()=>handleReply(element[0][0])}>+</button>
                            </div>
                            
                            
                        </div>
                        
                        
                        </div>
                         )
                        )
                    }
        </div>
                       
                    </div>
                </div>
                 
            </div>
            </>:<div><img src={login_required} alt=""/>
                    <div style={{color:"red"}}>Login is Required To Access This page</div>
            </div>}
            </>
    )
}
export default Room;