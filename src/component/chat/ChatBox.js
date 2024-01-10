import { useEffect, useRef, useState } from "react";
import CustomButton from "../common/CustomButton"
import CustomInput from "../common/CustomInput"
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs"
import MyMessage from "./MyMessage";
import ExitIcon from "../../image/ExitIcon";
import { useNavigate } from "react-router-dom";
import { BACKENDURL } from "../common/Common";

const ChatBox = () => {  
  const targetUsername = new URL(window.location).searchParams.get("username");
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [view , setView] = useState("");
  const [isLooked, setIsLooked] = useState(false);
  const lastMsg = useRef();
  const stompClient = useRef(Stomp.over(()=>{
    return socket;
  }))

  let c1 = username + "&" + targetUsername;
  let c2 = targetUsername + "&" + username;
  let roomId;

  if(c1 < c2) roomId = c1;
  else roomId = c2; 

  const socket = new SockJS('http://10.125.121.212:8080/chat');
  
  const headers = {
    "Authorization" : sessionStorage.getItem("token"),
  }

  function fetchData(){
    fetch(BACKENDURL+`/api/private/chat/getChatLogsByRoomId?chatRoomId=${encodeURIComponent(roomId)}`,{
      headers:{
        "Authorization" : sessionStorage.getItem("token"),
      }
    })
    .then(res => res.json())
    .then(data => {
      data.map((item,idx) =>
        setView(prevItem => [...prevItem,<MyMessage key={`key${idx}`} chatLog={item}/>])
      )
    })
    .catch(e => console.log(e));
  }

  useEffect(()=>{
    const text = document.querySelector("#text");
    text.focus();

    fetchData();

    let c1 = username + "&" + targetUsername;
    let c2 = targetUsername + "&" + username;
    let roomId;

    if(c1 < c2) roomId = c1;
    else roomId = c2; 

    const fetchBody = {
      "roomId" : roomId,
    }

    fetch(BACKENDURL+`/api/private/chat/postGreeting`,{
      method : "post",
      headers: {
        "Authorization" : sessionStorage.getItem("token"),
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(fetchBody)
    })
    .catch(e => console.log(e));

    stompClient.current.activate();

    stompClient.current.onDisconnect = function(){
      console.log("STOMP DISCONNECTED");
    }
    
    stompClient.current.onConnect = function(){
      console.log("STOMP CONNECT SUCCESS");
      stompClient.current.send("/app/join", headers ,JSON.stringify(sessionStorage.getItem("username")));

      stompClient.current.subscribe(`/topic/room/${roomId}`, (message) => {
        const msgBody = JSON.parse(message.body);
        lastMsg.current = msgBody;

        console.log(msgBody);

        if(msgBody["type"] === null) {
          console.log("HELLO");
          setIsLooked(true);
          setView("");
          fetchData();
        }

        if(msgBody["type"] !== null)
          setView(prevItem => [...prevItem,<MyMessage key={`key${Math.random()}`} chatLog={msgBody}/>])
      })
    };
    
    return () => {
      if(stompClient.current.connected)
        stompClient.current.deactivate();
    }
  },[])

  useEffect(()=>{
    console.log(lastMsg);
    if(isLooked && lastMsg.current["chatLogId"]){
      fetch(BACKENDURL+"/api/private/chat/updateIsLooked",{
        method : "put",
        headers : {
          "Authorization" : sessionStorage.getItem("token"),
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(lastMsg.current)
      })
      .then(res => {
        if(res.status === 200) {
          setView();
          fetchData();
        }
      })
      .catch(e => console.log(e));
    }
  },[lastMsg.current])

  useEffect(()=>{
    const chatBox = document.querySelector("#chatBox");

    if(!(chatBox.clientHeight === chatBox.scrollHeight)){
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  },[view])

  const handleSendText = (e) => {
    e.preventDefault();

    const text = document.querySelector("#text");

    if(text.value === "") return;

    const messageBody = {
      "sender" : username,
      "receiver" : targetUsername,
      "roomId" : roomId,
      "content" : text.value,
      "type" : "CHAT"
    };
    if(stompClient.current && stompClient.current.connected){
      stompClient.current.send("/app/chat.sendMessageToRoom", headers , JSON.stringify(messageBody));
    }
    text.value = "";
  }

  const handleExit = () => {
    navigate("/company/message/lobby");
  }

  return (
    <div className="border bg-gray-200 rounded-xl p-5 shadow-md w-full h-[45rem]">
      <div className="flex w-full h-12 items-center mb-5 justify-between">
        <p className="text-xl drop-shadow-md">{targetUsername+ "님과의 채팅"}</p>
        <button onClick={handleExit} className="bg-custom-blue h-full flex items-center justify-center shadow-md rounded-xl w-12">
          <ExitIcon/>
        </button>
      </div>
      <div id="chatBox" className="border h-[80%] mb-5 p-5 overflow-auto overflow-x-hidden bg-white shadow-inner">
        {view}
      </div>
      <form className="w-full h-[8%] gap-5 flex">
        <div className="w-[75%] h-full"><CustomInput placeholder={"메시지를 입력하세요"} id={"text"}/></div>
        <button onClick={handleSendText} className="h-full grow font-bold text-white tracking-widest">
          <CustomButton title={"전송"}/>
        </button>
      </form>
    </div>
  )
}

export default ChatBox