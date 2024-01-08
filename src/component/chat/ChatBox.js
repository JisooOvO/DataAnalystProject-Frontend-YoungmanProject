import { useEffect, useRef, useState } from "react";
import CustomButton from "../common/CustomButton"
import CustomInput from "../common/CustomInput"
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs"
import MyMessage from "./MyMessage";

const ChatBox = () => {  
  const targetUsername = new URL(window.location).searchParams.get("username");
  const username = sessionStorage.getItem("username");
  const [view , setView] = useState("");
  const stompClient = useRef(Stomp.over(()=>{
    return socket;
  }))

  const socket = new SockJS('http://10.125.121.212:8080/chat');
  
  const headers = {
    "Authorization" : sessionStorage.getItem("token"),
  }

  useEffect(()=>{
    const text = document.querySelector("#text");
    text.focus();

    stompClient.current.activate();

    stompClient.current.onDisconnect = function(){
        console.log("STOMP DISCONNECTED");
      }
    
    stompClient.current.onConnect = function(){
      console.log("STOMP CONNECT SUCCESS");
      stompClient.current.subscribe('/topic/private', (message) => { 
        setView(prevItem => [...prevItem,<MyMessage key={`key${Math.random()}`} chatLog={JSON.parse(message.body)}/>])
      })
    };
  },[])

  const handleSendText = (e) => {
    e.preventDefault();

    const text = document.querySelector("#text");
    const messageBody = {
        "sender" : username,
        "receiver" : targetUsername,
        "content" : text.value,
        "type" : "CHAT"
    };
    if(stompClient.current && stompClient.current.connected){
      console.log(JSON.stringify(messageBody));
      stompClient.current.send("/app/chat.sendMessage", headers , JSON.stringify(messageBody))
    }
    text.value = "";
  }

  return (
    <div className="border border-black rounded-xl p-5 shadow-md w-full h-[45rem]">
      <p className="text-xl drop-shadow-md mb-5">{targetUsername+ "님과의 채팅"}</p>
      <div className="border h-[80%] mb-5 p-5 overflow-auto overflow-x-hidden shadow-inner border-black">
        {view}
      </div>
      <form className="w-full h-[8%] gap-5 flex">
        <div className="w-[75%] h-full"><CustomInput id={"text"}/></div>
        <button onClick={handleSendText} className="h-full grow font-bold text-white tracking-widest">
            <CustomButton title={"전송"}/>
        </button>
      </form>
    </div>
  )
}

export default ChatBox