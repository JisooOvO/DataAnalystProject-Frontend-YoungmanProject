import { useState } from "react";
import CustomInput from "../../component/common/CustomInput"
import CustomButton from "../common/CustomButton"
import CustomCircle from "../common/CustomCircle";
import SearchIcon from "../../image/SearchIcon";
import { BACKENDURL } from "../common/Common";

const ChangePWBox = () => {
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const regex = /^[a-zA-Z0-9]{5,10}$/;
  const PASSWORDTEXT = "비밀번호는 5 ~ 10자 이내 영어, 숫자의 조합입니다.";

  const handleClickChangePW = () => {
    const originalPW = document.querySelector("#originalPW").value;
    const changePW = document.querySelector("#changePW").value;
    const checkPassword = document.querySelector("#checkPassword").value;


    fetch(BACKENDURL+"/login",{
      method: "post",
      body: JSON.stringify({
        "username" : sessionStorage.getItem("username"),
        "password" : originalPW
      })
    })
    .then(res => {
      if(res.status !== 200){
        alert("현재 비밀번호가 일치하지 않습니다.");
        return;
      }else{
        if(changePW !== checkPassword){
          alert("변경할 비밀번호 확인 후 진행해주십시오.");
          return;
        }
        if(!regex.test(changePW)){
          alert(PASSWORDTEXT);
          return
        }
        fetch(BACKENDURL+"/api/private/member/changePassword",{
          method: "put",
          headers: {
            "Authorization" : sessionStorage.getItem("token"),
            "Content-Type" : "application/json",
          },
          body : JSON.stringify({
            "password" : changePW
          })
        })
        .then(res => {
          if(res.status === 200){
            alert("비밀번호가 변경되었습니다.");
          }else{
            alert("데이터 전송 중 에러 발생");
          }
        })
        .catch(e => {
          console.log(e);
        })
      }
    })
  }

  const handlePasswordTyping = () => {
    const password = document.querySelector("#changePW").value;
    const checkPassword = document.querySelector("#checkPassword").value;
    const passwordCheckMsg = document.querySelector("#passwordCheckMsg");

    if(password === checkPassword) {
        setPasswordCheckMsg("비밀번호가 일치합니다.");
        passwordCheckMsg.classList.add("text-blue-500");
        passwordCheckMsg.classList.remove("text-red-500");
    }

    if(password !== checkPassword) {
        setPasswordCheckMsg("비밀번호가 일치하지 않습니다.");
        passwordCheckMsg.classList.remove("text-blue-500");
        passwordCheckMsg.classList.add("text-red-500");        
    }

    if(password === ""){
        setPasswordCheckMsg("");
    }
  }

  const handleMaskingButton = (e,targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(`#${targetId}`);
    if (targetElement.type === "text") targetElement.type = "password";
    else targetElement.type = "text";
  }

  return (
    <div className="w-full border bg-gray-200 flex flex-col items-center rounded-xl shadow-md h-fit py-10 px-5">
      <p className="mb-3 w-[90%]">현재 비밀번호</p>
      <div className="h-12 w-[90%] mb-10 relative">
        <CustomInput id={"originalPW"} type={"password"} placeholder={"현재 비밀번호"}/>
        <button tabIndex={-1} onClick={(e)=>{handleMaskingButton(e,"originalPW")}} className="w-9 h-9 absolute top-[6px] right-4"><CustomCircle svg={<SearchIcon/>}/></button>
      </div>
      <p className="mb-3 w-[90%]">변경할 비밀번호</p>
      <div className="h-12 w-[90%] mb-14 relative">
        <CustomInput id={"changePW"} type={"password"} func={handlePasswordTyping} placeholder={"변경할 비밀번호"}/>
        <button tabIndex={-1} onClick={(e)=>{handleMaskingButton(e,"changePW")}} className="w-9 h-9 absolute top-[6px] right-4"><CustomCircle svg={<SearchIcon/>}/></button>
        <p className="text-sm mt-2 text-gray-700">{PASSWORDTEXT}</p>
      </div>
      <p className="mb-3 w-[90%]">비밀번호 확인</p>
      <div className="h-12 w-[90%] mb-5 relative">
        <CustomInput id={"checkPassword"} type={"password"} func={handlePasswordTyping} placeholder={"비밀번호 확인"}/>
        <button tabIndex={-1} onClick={(e)=>{handleMaskingButton(e,"checkPassword")}} className="w-9 h-9 absolute top-[6px] right-4"><CustomCircle svg={<SearchIcon/>}/></button>
      </div>
      <p id="passwordCheckMsg" className="h-10 mb-5 w-[90%]">{passwordCheckMsg}</p>
      <button onClick={handleClickChangePW} className="w-[90%] h-12 text-white font-bold mb-5">
        <CustomButton title={"비밀번호 변경"}/>
      </button>
    </div>
  )
}

export default ChangePWBox