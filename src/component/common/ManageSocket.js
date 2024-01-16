import SockJS from "sockjs-client";
import { AtomAlarmCount, AtomIsLogin, BACKENDURL } from "./Common";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const ManageSocket = () => {
  const navigate = useNavigate();
  const socket = new SockJS(BACKENDURL+'/chat');
  const username = sessionStorage.getItem("username");
  const stompClient = useRef(Stomp.over(()=>{
    return socket;
  }))
  const [isLogin, _] = useRecoilState(AtomIsLogin);
  const headers = {
    "Authorization" : sessionStorage.getItem("token"),
  }
  const [msg, setMsg] = useState("");
  const [alarmCnt, setAlarmCnt] = useRecoilState(AtomAlarmCount);

  useEffect(()=>{
    const alertMsg = document.querySelector("#alertMsg");
    
    if(msg === "") {
      alertMsg.classList.add("hidden");
      alertMsg.classList.remove("fade-out");
    }else{
      alertMsg.classList.remove("hidden");
      alertMsg.classList.add("fade-out");
      setTimeout(()=>{setMsg("")},2000);
    }
  },[msg])

  useEffect(()=>{
    stompClient.current.onConnect = function(){
      console.log("MAIN STOMP CONNECTED");

      stompClient.current.subscribe(`/topic/public`, (message) => {
        const parseMsg = JSON.parse(message.body);

        if(parseMsg["sender"] === username) return;

        setMsg(parseMsg["content"]);

        fetch(BACKENDURL+"/api/private/notice/getNoticeLogsCounts",{
          headers : {
            "Authorization" : sessionStorage.getItem("token") 
          }
        })
        .then(res => res.json())
        .then(data => setAlarmCnt(+data["message"]))
        .catch(e => console.log(e));
      })
    }

    stompClient.current.onDisconnect = function(){
      console.log("MAIN STOMP DISCONNECTED");
    }

    if(isLogin){
      if(!stompClient.current.connected){
        stompClient.current.activate();
      }
    }else{
      stompClient.current.deactivate();
    }
  },[isLogin])

  return (
    <div id="alertMsg" 
    onClick={()=>{
      const urlName = "/manage_receipt";
      if(window.location.pathname === urlName)
        window.location.reload();
      else
        navigate(urlName);
    }} 
    className="hidden border hover:cursor-pointer bg-gray-300 text-custom-blue font-bold p-5 rounded-xl shadow-xl fixed left-[50%] bottom-[20%] translate-x-[-50%] z-[9999]">
      {msg}
    </div>
  )
}

export default ManageSocket