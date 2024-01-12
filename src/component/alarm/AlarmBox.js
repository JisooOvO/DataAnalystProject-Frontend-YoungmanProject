import { useEffect, useState } from "react";
import { BACKENDURL } from "../common/Common";
import AlarmContainer from "./AlarmContainer";

const AlarmBox = () => {
  const [view, setView] = useState("");

  useEffect(()=>{

    fetch(BACKENDURL+"/api/private/notice/getNoticeLogs",{
      headers: {
        "Authorization" : sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      data.map((item,idx) => 
        setView(prevItem => [...prevItem, <AlarmContainer key={`alarmKey${idx}`} item={item}/>])
      )
    })
    .catch(e => console.log(e));

  },[])

  return (
    <div className="border w-full bg-gray-200 h-fit shadow-md rounded-xl px-5 py-10">
      <p className="text-custom-blue pb-4 border border-custom-blue border-t-0 border-x-0 text-xl">새 소식</p>
      <div className="w-full bg-white rounded-xl h-[30rem] overflow-auto overflow-x-hidden shadow-inner mt-5 p-4 flex flex-col-reverse">
        {view}
      </div>
    </div>
  )
}

export default AlarmBox