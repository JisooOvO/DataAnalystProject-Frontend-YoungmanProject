import { useEffect, useState } from "react";
import { BACKENDURL } from "../common/Common";

const AlarmContainer = ({item}) => {
  console.log(item);
  
  const alarmTime = new Date(new Date(item["timeStamp"]) + 9*60*60000);
  const username = sessionStorage.getItem("username");
  const [circle, setCircle] = useState(<div id="alarmCircle" className="w-7 h-7 bg-red-500 rounded-[50%] flex items-center justify-center absolute shadow-md -top-2 -left-2">❕</div>)

  const handleClick = () => {
    
    fetch(BACKENDURL+"/api/private/notice/updateUserHistoryInLog",{
      method:"put",
      headers:{
        "Authorization" : sessionStorage.getItem("token"),
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(data => {
      const alarmCircle = document.querySelector("#alarmCircle");
      if(data["userHistory"].includes(username)){
        setCircle(<div id="alarmCircle" className="w-7 h-7 bg-gray-500 rounded-[50%] flex items-center justify-center text-white absolute shadow-md -top-2 -left-2">✔</div>)
      }
    })
    .catch(e => console.log(e));
  }

  useEffect(()=>{
    const alarmCircle = document.querySelector("#alarmCircle");
    if(item["userHistory"].includes(username)){
      setCircle(<div id="alarmCircle" className="w-7 h-7 bg-gray-500 rounded-[50%] flex items-center justify-center text-white absolute shadow-md -top-2 -left-2">✔</div>)
    }
  },[])

  return (
    <div onClick={handleClick} className="relative p-4 border my-2 rounded-xl shadow-md text-sm sm:text-base hover:cursor-pointer hover:bg-gray-300">
      {circle}
      <p className="mb-1">{alarmTime.toLocaleString()}</p>
      <p className="pl-3">{item["content"]}</p>
    </div>
  )
}

export default AlarmContainer