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
  const messages = useRef([]);
  const unReadMsgs = useRef([]);
  const isLooked = useRef(false);
  const lastMsg = useRef("");
  const socket = new SockJS(BACKENDURL+'/chat');
  const stompClient = useRef(Stomp.over(()=>{
    return socket;
  }))

  let c1 = username + "&" + targetUsername;
  let c2 = targetUsername + "&" + username;
  let roomId;

  if(c1 < c2) roomId = c1;
  else roomId = c2; 

  
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
      data.map((item,idx) => {
        messages.current.push(item);
        setView(prevItem => [...prevItem,<MyMessage key={`key${idx}`} chatLog={item}/>]);
      })
    })
    .catch(e => console.log(e));
  }

  useEffect(()=>{
    const text = document.querySelector("#text");
    text.focus();

    console.log(stompClient.current);

    fetchData();

    stompClient.current.activate();

    stompClient.current.onDisconnect = function(){
      console.log("STOMP DISCONNECTED");
    }

    stompClient.current.onConnect = function(){
      console.log("STOMP CONNECT SUCCESS");

      stompClient.current.send("/app/chat.setRoomId", headers , JSON.stringify({"sender" : username , "roomId" : roomId}));

      stompClient.current.subscribe(`/topic/room/${roomId}`, (message) => {
        const msgBody = JSON.parse(message.body);

        lastMsg.current = msgBody;


        // 상대방의 진입 이벤트 발생
        if(msgBody["type"] === "JOIN") {
          isLooked.current = true;
          fetch(BACKENDURL+`/api/private/chat/getChatLogsByRoomId?chatRoomId=${encodeURIComponent(roomId)}`,{
            headers:{
              "Authorization" : sessionStorage.getItem("token"),
            }
          })
          .then(res => res.json())
          .then(data => {
            for(let i = data.length - 1  ; i >= 0 ; i--){
              if(messages.current[i]["isLooked"] === "TRUE") break;
              unReadMsgs.current.push(data[i]);
            }
            setView(prevItem => {
              if (unReadMsgs.current.length > 0)
                return (
                [
                  ...prevItem.slice(0,-unReadMsgs.current.length),
                  ...unReadMsgs.current.reverse().map(item => <MyMessage key={`msgkey${Math.random()}`} chatLog={item}/>)
                ])
              else
                return [...prevItem]
            })
          })
          .catch(e => console.log(e));
        }

        // 상대방이 나감
        if(msgBody["type"] === "LEAVE"){
          isLooked.current = false;
          unReadMsgs.current = [];
        }

        if(msgBody["type"] === "CHAT") {
          setView(prevItem => [...prevItem,<MyMessage key={`msgkey${Math.random()}`} chatLog={msgBody}/>])
          messages.current.push(msgBody);
          if(isLooked.current){
            // 상대방이 접속 중임
            fetch(BACKENDURL+"/api/private/chat/updateIsLooked",{
              method : "put",
              headers : {
                "Authorization" : sessionStorage.getItem("token"),
                "Content-Type" : "application/json",
              },
              body : JSON.stringify(msgBody)
            })
            .then(res => res.json())
            .then(data => {
              // 마지막 메시지 재 렌더링
              setView(prevItem => [...prevItem.slice(0,-1), <MyMessage key={`msgkey${Math.random()}`} chatLog={data}/>])
              messages.current = [...messages.current.slice(0,-1), data]
            })
            .catch(e => console.log(e));
          }
        }
        console.log(messages.current);
      })
    };
    
    return () => {
      if(stompClient.current.connected)
        stompClient.current.deactivate();
    }
  },[])

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