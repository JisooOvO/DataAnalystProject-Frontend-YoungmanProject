import { useEffect, useState } from "react";
import UserIcon from "../../image/UserIcon";

const MyMessage = ({chatLog}) => {
  const [isMyMsg, setIsMyMsg] = useState(true);
  const targetUser = sessionStorage.getItem("username");

  useEffect(()=>{
    if(targetUser !== chatLog["sender"]) setIsMyMsg(false);
  },[])

  return (
    <>
    {
      isMyMsg ?     
        <div className="w-full flex flex-col items-end mb-3">
          <div className="flex items-center gap-2 justify-end">
            <p className="drop-shadow-md">{chatLog["sender"]}</p>
            <div className="bg-custom-blue w-8 h-8 flex items-center justify-center rounded-[50%]"><UserIcon/></div>
          </div>
          <p className="flex h-fit min-h-[2.5rem] items-center shadow-inner rounded-xl px-4 border my-2 w-[45%]">{chatLog["content"]}</p>
        </div>
      :
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-2">
            <div className="bg-custom-blue w-8 h-8 flex items-center justify-center rounded-[50%]"><UserIcon/></div>
            <p className="drop-shadow-md">{chatLog["sender"]}</p>
          </div>
          <p className="flex h-fit min-h-[2.5rem] items-center shadow-inner rounded-xl px-4 border my-2 w-[45%]">{chatLog["content"]}</p>
        </div>
    }
    </>
  )
}

export default MyMessage