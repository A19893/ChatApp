import React, { useEffect, useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Message from "./Message";
import Input from "./Input";
import OwnerMessage from "./OwnerMessage";
import { useSelector } from "react-redux";
import { getDocs, collection,doc,updateDoc,arrayUnion,onSnapshot } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Timestamp } from "firebase/firestore";
const ParticularUser = () => {
  const chatRoomId = useSelector(
    (state) => state.userdetails.CurrentChatRoomId
  );
  const senderid = useSelector(
    (state) => state.userdetails.UserDetail.senderid
  );
  console.log(senderid)
  const[currentUser,setCurrentUser]=useState([]);
  const[msg,setMsg]=useState("");
  const[updatedid,setupdateid]=useState("");
  const[messages,setMessages]=useState(null);
  var selectedid=null;
  console.log(chatRoomId)
  useEffect(() => {
    // if(chatRoomId){
    //   const dbRef = doc(db, "Chats",chatRoomId );
    //  const unsub = onSnapshot(dbRef, (doc) => {
    //   console.log(doc.data());
    //   doc.exists && setMessages(doc.data().messages)
    //  })
    //  const fetchData = async () => {
    //   const chatRoom = await getDocs(collection(db, "Chats"));
    //     const users = chatRoom?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //     const curentUser=users?.filter((item)=>{
    //         console.log(item.chatRoomId)
    //      return chatRoomId===item.chatRoomId
    //     })
    //     console.log("mera user",curentUser)
    //     setCurrentUser(curentUser);
    //     selectedid=curentUser[0]?.id;
    //     setupdateid(currentUser[0]?.id)
    //     console.log(updatedid);
    //     // setTimeout(()=>{
    //       console.log("id update jp ki",selectedid)
    //       const unsub = onSnapshot(doc(db, "Chats",updatedid ), (doc) => {
    //       console.log(doc?.data());
    //       doc.exists && setMessages(doc.data().messages)
    //      })
    //     // },1000);
    // };
    const fetchData = async () => {
      const chatRoom = await getDocs(collection(db, "Chats"));
        const users = chatRoom.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const curentUser=users.filter((item)=>{
            console.log(item.chatRoomId)
         return chatRoomId===item.chatRoomId
        })
         setupdateid(curentUser[0]?.id)
        console.log("mera user",curentUser)
        setCurrentUser(curentUser);
    };
    fetchData();
  // }
  },[chatRoomId,updatedid]);
  const clickHandler=async()=>{
    console.log(updatedid);
    const date=new Date();
    console.log(date.getDate());
   const dRef = doc(db, "Chats", updatedid);
   await updateDoc(dRef,{messages: arrayUnion({
    message:msg,
    senderid:senderid,
    date:Timestamp.now()
   })});
   setMsg(" ");
  }
  const particularUser = useSelector((state) => state.userdetails?.ParticularUser);
  return (
    <>
      <div className="chat-container">
        <div className="user-name">
          <h3
            style={{
              fontWeight: "lighter",
              margin: "0px",
              paddingTop: "25px",
              fontSize: "22px",
              paddingLeft: "10px",
              color: "lightgray",
            }}
          >
            {particularUser?.name}
          </h3>
          <div>
            <VideoCallIcon fontSize="large" className="videoicon" />
            <PersonAddAlt1Icon fontSize="large" className="videoicon" />
            <MoreHorizIcon fontSize="large" className="videoicon" />
          </div>
        </div>
            <div className="chatBox">
            {
            // currentUser[0]?.
            currentUser[0]?.messages?.map((item)=>{
            return(
                <>
                {console.log("aagya",item.senderid,"jisne likha",senderid,"date",item.date)}
                {item.senderid===senderid ?<OwnerMessage msg={item.message} timestamp={item.Date}/>:<Message msg={item.message} timestamp={item.Date}/>}
                </>
            )
            })
        }
        </div>
        <Input msg={msg} clickHandler={clickHandler} setMsg={setMsg}/>
      </div>
    </>
  );
};

export default ParticularUser;
