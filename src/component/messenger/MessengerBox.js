import { useEffect, useState } from "react";
import { AtomIsMobile, BACKENDURL } from "../common/Common";
import MessageUser from "./MessageUser";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useRecoilState } from "recoil";
import CustomCircle from "../common/CustomCircle";
import SearchIcon from "../../image/SearchIcon";

const MessengerBox = () => {
  const [view , setView] = useState("");
  // eslint-disable-next-line
  const [isMobile, _] = useRecoilState(AtomIsMobile);
  const username = sessionStorage.getItem("username");

  useEffect(()=>{
    fetch(BACKENDURL+"/api/private/member/getOurMembers",{
      headers: {
          "Authorization" : sessionStorage.getItem("token"),
      }
    })
    .then(res => res.json())
    .then(data => {
      setView("");
      data.map((item,idx) => {
        // eslint-disable-next-line
        if(item["username"] === username) return;
        // eslint-disable-next-line
        if(item["role"] === "WAITING") return;
        return (
          setView(prevItem => [...prevItem, <MessageUser key={`key${Math.random()}`} data ={item}/>])
        )
      })
    })
    .catch(e => console.log(e));
  },[])

  const handleClickSearchButton = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    fetch(BACKENDURL+`/api/private/member/getOurMembers?searchCriteria=username&searchValue=${username}`,{
      headers:{
        "Authorization": sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      setView("");
      data.map((item,idx) => {
        // eslint-disable-next-line
        if(item["username"] === username) return;
        // eslint-disable-next-line
        if(item["role"] === "WAITING") return;
        return (
          setView(prevItem => [...prevItem, <MessageUser key={`key${Math.random()}`} data ={item}/>])
        )
      })
    })
    .catch(e => console.log(e));
  }
    
  return (
    <div className="border w-full bg-gray-300 h-fit pt-10 px-5 pb-5 rounded-xl shadow-md">
      <div className="w-full bg-custom-blue h-12 mb-5 flex items-center shadow-md text-white text-xl pl-4 rounded-xl">YOUNG TALK</div>
      <p className="h-10 flex items-center text-xl drop-shadow-md">검색</p>
      <form className="h-12 mt-1 mb-2 flex gap-5">
        <div className="w-[80%] h-12"><CustomInput id={"username"} placeholder={"회원명으로 검색할 수 있습니다."}/></div>
        <button onClick={handleClickSearchButton} className="grow h-full flex justify-center items-center text-white font-bold">
            {
                isMobile ? 
                <div className="w-9 h-9">
                  <CustomCircle svg={<SearchIcon/>}/>
                </div> 
                :<CustomButton title={"회원 검색"}/> 
            }
        </button>
      </form>
      <p className="h-10 mt-5 flex items-center text-xl drop-shadow-md">채팅</p>
      <div className="h-[40rem] bg-white overflow-x-hidden p-4 border rounded-xl mt-2 shadow-inner">{view}</div>
    </div>
  )
}

export default MessengerBox