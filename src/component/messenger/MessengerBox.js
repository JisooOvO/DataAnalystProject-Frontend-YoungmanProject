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
  const [isMobile, _] = useRecoilState(AtomIsMobile);

  useEffect(()=>{
    fetch(BACKENDURL+"/api/admin/getOurMembers",{
        headers: {
            "Authorization" : sessionStorage.getItem("token"),
        }
    })
    .then(res => res.json())
    .then(data => {
        setView("");
        data.map((item,idx) => 
            setView(prevItem => [...prevItem, <MessageUser data ={item}/>])
        )
    })
    .catch(e => console.log(e));
  },[])
    
  return (
    <div className="border w-full h-fit pt-10 px-5 pb-5 rounded-xl shadow-md border-black">
      <div className="w-full bg-custom-blue h-12 mb-5 flex items-center text-white text-xl p-2 pl-4 rounded-xl">YOUNG TALK</div>
      <p className="h-10 flex items-center text-xl text-custom-blue">검색</p>
      <div className="h-12 mt-1 mb-2 flex gap-5">
        <div className="w-[80%] h-12"><CustomInput placeholder={"회원명으로 검색할 수 있습니다."}/></div>
        <div className="grow h-full flex justify-center items-center text-white font-bold">
            {
                isMobile ? 
                <div className="w-9 h-9">
                  <CustomCircle svg={<SearchIcon/>}/>
                </div> 
                :<CustomButton title={"회원 검색"}/> 
            }
        </div>
      </div>
      <p className="h-10 mt-5 flex items-center text-xl text-custom-blue">채팅</p>
      <div className="h-[40rem] overflow-x-hidden p-4 border border-black rounded-xl mt-2 shadow-inner">{view}</div>
    </div>
  )
}

export default MessengerBox