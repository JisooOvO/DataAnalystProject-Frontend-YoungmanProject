import { useState } from "react"
import SearchIcon from "../../image/SearchIcon"
import CustomButton from "../common/CustomButton"
import CustomCircle from "../common/CustomCircle"
import SignupFormComponent from "../signup/SignupFormComponent"
import { useRecoilState } from "recoil"
import { AtomEmail, BACKENDURL } from "../common/Common"
import { useNavigate } from "react-router-dom"

const FindPassword = ({targetNm}) => {
    const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const [userEmail, setUserEmail] = useRecoilState(AtomEmail);
    const navigate = useNavigate();
  
    const handlePasswordTyping = () => {
      const password = document.querySelector("#password").value;
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
  
    const handleChangePassword = (e) => {
      e.preventDefault();
      if(isTouched) return;
      setIsTouched(true);
      const password = document.querySelector("#password").value;
      fetch(BACKENDURL+"/api/public/findPassword",{
          method : "put",
          headers: {
              "Content-Type": "application/json",
          },
          body : JSON.stringify({
              "password" : password,
              "email" : userEmail,
          })
      })
      .then(res => {
          if(res.status === 200){
              alert("비밀번호 변경에 성공하셨습니다.\n로그인 페이지로 이동합니다.");
              setUserEmail("");
              navigate("/login");
          }else{
              alert("데이터 전송 중 에러 발생");
          }
      })
      .catch(e => {
          console.log(e);
          alert("데이터 전송 중 에러 발생");
      })
      setIsTouched(false);
    }
  
  return (
    <div className="border border-black h-[26rem] rounded-xl shadow-md p-5">
      <form className="w-full">
        <div className="mb-10 relative h-24">
            <SignupFormComponent id={"password"} func={handlePasswordTyping}
            title={"변경할 비밀번호"}
            subtitle={targetNm === "password" ? "비밀번호는 5 ~ 10자 이내 영어, 숫자의 조합입니다." : "아이디는 5 ~ 10자 이내 영어, 숫자의 조합입니다."}/>
            <div className="w-9 h-9 absolute top-[44%] right-2"><CustomCircle svg={<SearchIcon/>}
            func={(e)=>{handleMaskingButton(e,"password")}}/></div>
        </div>
        <div className="w-full relative h-24 mb-8">
            <SignupFormComponent id={"checkPassword"} func={handlePasswordTyping}
            title={"비밀번호 확인"}
            subtitle={"비밀번호 확인을 위해 한번 더 입력하세요."}/>
            <div className="w-9 h-9 absolute top-[44%] right-2"><CustomCircle svg={<SearchIcon/>}
            func={(e)=>{handleMaskingButton(e,"checkPassword")}}/></div>            
        </div>
        <p id="passwordCheckMsg" className="h-10">{passwordCheckMsg}</p>
        <button onClick={handleChangePassword} className="w-full h-16 font-bold text-2xl text-white"><CustomButton title={"비밀번호 변경"}/></button>
      </form>
    </div>
  )
}

export default FindPassword