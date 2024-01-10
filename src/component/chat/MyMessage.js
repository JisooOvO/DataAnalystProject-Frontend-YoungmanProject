import { useEffect, useState } from "react";
import UserIcon from "../../image/UserIcon";

const MyMessage = ({chatLog}) => {
  const [isMyMsg, setIsMyMsg] = useState(true);
  const targetUser = sessionStorage.getItem("username");
  const newDate = new Date(new Date(chatLog["timeStamp"]).getTime() + 9*60*60000).toISOString();

  useEffect(()=>{  
    if(targetUser !== chatLog["sender"]) setIsMyMsg(false);
  },[])

  return (
    <>
    {
      isMyMsg ?     
        <div className="w-full flex flex-col items-end mb-5">
          <div className="flex items-center gap-2 justify-end mb-3">
            <p className="drop-shadow-md">{chatLog["sender"]}</p>
            <div className="bg-custom-blue w-8 h-8 flex items-center justify-center rounded-[50%]"><UserIcon/></div>
          </div>
          <div className="sm:w-[50%] relative w-[80%] items-end gap-2 h-fit min-h-[2.5rem] flex">
            {
              chatLog["isLooked"] === "TRUE" ? "" : <p className="absolute -left-10 text-[75%] text-white w-6 h-6 rounded-lg flex items-center justify-center bg-custom-blue">{1}</p> 
            }
            <div className="text-end text-[75%] whitespace-nowrap">
              <p>{newDate.slice(5,7) +"월 " + newDate.slice(8,10) + "일"}</p>
              <p>{newDate.slice(11,19)}</p>
            </div>
            <p className="h-fit min-h-[2.5rem] w-[80%] break-words shadow-inner rounded-xl py-2 px-4 border">
              {chatLog["content"]}
            </p>
          </div>
        </div>
      :
        <div className="w-full flex flex-col mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-custom-blue w-8 h-8 flex items-center justify-center rounded-[50%]"><UserIcon/></div>
            <p className="drop-shadow-md">{chatLog["sender"]}</p>
          </div>
          <div className="sm:w-[50%] w-[80%] items-end gap-2 h-fit min-h-[2.5rem] flex">
            <p className="h-fit min-h-[2.5rem] w-[80%] break-words shadow-inner rounded-xl py-2 px-4 border">
              {chatLog["content"]}
            </p>
            <div className="text-[75%] whitespace-nowrap">
                <p>{newDate.slice(5,7) +"월 " + newDate.slice(8,10) + "일"}</p>
                <p className="text-end">{newDate.slice(11,19)}</p>
            </div>
          </div>
        </div>
    }
    </>
  )
}

export default MyMessage