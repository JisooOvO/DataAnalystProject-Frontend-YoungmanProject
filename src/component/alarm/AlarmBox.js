import { useEffect, useState } from "react";
import { AtomAlarmCount, BACKENDURL } from "../common/Common";
import AlarmContainer from "./AlarmContainer";
import CustomButton from "../common/CustomButton";
import { useRecoilState } from "recoil";

const AlarmBox = () => {
  const [view, setView] = useState("");
  const [alarmCnt, setAlarmCnt] = useRecoilState(AtomAlarmCount);

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
    .catch(e => console.log(e))
  },[])

  useEffect(()=>{
    const viewContainer = document.querySelector("#viewContainer");
    viewContainer.scrollTop = -viewContainer.scrollHeight;
  },[view])

  const handleButtonClick = () => {
    fetch(BACKENDURL+"/api/private/notice/updateUserHistoryInAllLog",{
      method: "put",
      headers: {
        "Authorization" : sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      const len = data.length;
      if(len <= 0) return;
      data.map((item,idx) => 
        setView(prevItem => [...prevItem.slice(0,-len), <AlarmContainer key={`alarmKey${idx}`} item={item}/>])
      )
      fetch(BACKENDURL+"/api/private/notice/getNoticeLogsCounts",{
        headers : {
          "Authorization" : sessionStorage.getItem("token") 
        }
      })
      .then(res => res.json())
      .then(data => setAlarmCnt(+data["message"]))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  return (
    <div className="border w-full bg-gray-200 h-fit shadow-md rounded-xl px-5 py-10">
      <div className="w-full flex items-center justify-between pb-4 border border-custom-blue border-t-0 border-x-0">
        <p className="text-custom-blue text-xl">새 소식</p>
        <button onClick={handleButtonClick} className="text-white w-28 h-9"><CustomButton title={"전체 읽음"}/></button>
      </div>
      <div id="viewContainer" className="w-full bg-white rounded-xl h-[30rem] overflow-auto overflow-x-hidden shadow-inner mt-5 p-4 flex flex-col-reverse">
        {view}
      </div>
    </div>
  )
}

export default AlarmBox