import { useNavigate } from "react-router-dom";
import UserIcon from "../../image/UserIcon";
import { useEffect, useState } from "react";

const MessageUser = ({conData,data,count}) => {
  const navigate = useNavigate();
  const myName = sessionStorage.getItem("username");
  const [lastMsg, setLastMsg] = useState("상대방과 대화를 시작해보세요.");
  const [lastTime, setLastTime] = useState("");
  let unReadCount;
  let role = "";
  if(data["role"] === "WAITING") role = "대기회원"
  if(data["role"] === "ADMIN") role = "관리자"
 
  count.map((item) => {
    const cId = item["_id"];
    const indexAt = String(item["_id"]).indexOf("&");
    const c1 = cId.slice(0,indexAt);
    const c2 = cId.slice(indexAt+1);
    let targetName;

    if(c1 !== myName) targetName = c1
    else targetName = c2

    if(targetName === data["username"])
      unReadCount = item["unreadMessages"];
  })

  useEffect(()=>{
    
    conData.map(item => {
      const c1 = sessionStorage.getItem("username");
      const c2 = data["username"];
      let roomId;

      if(c1 < c2) roomId = c1 + "&" + c2;
      else roomId = c2 + "&" + c1;

      if(item["chatRoomId"] === roomId){
        setLastMsg(item["content"])
        setLastTime(()=>{
          const newDate = new Date(new Date(item["timeStamp"]) + 9*60*60000);
          return newDate.toLocaleString();
        })
      }
    })
  },[navigate])

  const handleEnterMessage = () => {
    navigate(`/company/message/chat?username=${data["username"]}`)
  }

  return (
    <div onClick={handleEnterMessage} className="border bg-white p-4 w-full hover:bg-gray-300 hover:cursor-pointer text-[80%] sm:text-xl h-40 mb-5 rounded-xl shadow-md">
      <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
              <div className="bg-custom-blue w-10 h-10 rounded-xl shadow-md flex items-center justify-center">
                <UserIcon/>
              </div>
              <p className="drop-shadow-md">{data["username"] }</p><span className="text-gray-500">{role ? "("+role+")" : ""}</span>
          </div>
          <p className="text-custom-blue">{data["association"] ? data["association"]["association"] : ""}</p>
      </div>
      <div className="mt-2 p-2 text-sm text-gray-500 flex items-center justify-between">
        <p>{lastMsg}</p>
        <div className="flex flex-col items-end">
          <p>{lastTime}</p>
          {
            unReadCount ?
            <p className="w-7 h-7 rounded-[50%] flex items-center justify-center mt-1 shadow-md bg-red-500 text-white">{unReadCount}</p> : ""
          }
        </div>
      </div>
    </div>
  )
}

export default MessageUser