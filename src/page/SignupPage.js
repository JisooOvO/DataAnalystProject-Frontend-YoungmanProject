import CustomButton from "../common/CustomButton"
import Navigation from "../common/Navigation"
import { PURPLE } from "../common/Common"
import SignFormInput from "../component/signupPage/SignFormInput"
import MaskingButton from "../common/MaskingButton"
import UsernameDupleCheckButton from "../component/signupPage/UsernameDupleCheckButton"
import FetchSignup from "../component/signupPage/FetchSignup"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const SignupPage = () => {
  const navigate = useNavigate();
  const [isSuccessSignup, setIsSuccessSignup] = useState(false);
  const [checkPassword, setCheckPassword] = useState('비밀번호 체크 메시지입니다.');
  const [checkDupleID, setCheckDupleId] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleSignup = (e,checkDupleID) => {
    e.preventDefault();
    if(isTouched) return;

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const checkPassword = document.querySelector("#checkPassword").value;
    
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    
    if(!checkDupleID){
      alert("아이디 중복 검사를 먼저 진행해주세요.");
      return;
    }

    if(password !== checkPassword){
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if(!regex.test(username)){
      alert("아이디는 5 ~ 10자 이내 영문, 숫자의 조합입니다.")
      return;
    }

    if(!regex.test(password)){
      alert("비밀번호는 5 ~ 10자 이내 영문, 숫자의 조합입니다.")
      return;
    }    

    setIsTouched(true);
    FetchSignup(username,password,setIsSuccessSignup,setIsTouched);
  }

  useEffect(()=>{
    const checkDupleIdButton = document.querySelector("#checkDupleIdButton");

    if(checkDupleID){
      checkDupleIdButton.classList.remove("bg-[#898FCB]");
      checkDupleIdButton.classList.remove("hover:cursor-pointer");
      checkDupleIdButton.classList.remove("hover:bg-[#F0A16D]");
      checkDupleIdButton.classList.add("bg-slate-500");
      checkDupleIdButton.classList.add("hover:cursor-not-allowed");
    }else{
      checkDupleIdButton.classList.add("bg-[#898FCB]");
      checkDupleIdButton.classList.add("hover:cursor-pointer");
      checkDupleIdButton.classList.add("hover:bg-[#F0A16D]");
      checkDupleIdButton.classList.remove("bg-slate-500");
      checkDupleIdButton.classList.remove("hover:cursor-not-allowed");     
    }
  },[checkDupleID])

  useEffect(()=>{
    if(isSuccessSignup)
      navigate("/login");
    // eslint-disable-next-line
  },[isSuccessSignup])

  return (
    <div id="signupContainer" className="w-full h-full flex flex-col items-center">
      <form style={{backgroundColor : PURPLE}} onSubmit={(e)=>{e.preventDefault()}}
      className="mt-20 mb-5 w-[80%] max-w-[30rem] min-h-[34rem] h-[70%] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
        <p className="text-white w-[90%] mb-2 font-extrabold">회원가입을 위해 입력해주세요</p>
        <div className="border bg-white shadow-inner w-[90%] h-[85%] p-4 gap-2 rounded-lg flex flex-col justify-center">
          <div className="relative">
            <SignFormInput title={"🙍‍♂️ 아이디"} type={"text"} id={"username"} setCheckDupleId={setCheckDupleId} setCheckPassword={setCheckPassword} subtitle={"아이디는 5 ~ 10자 이내 영문, 숫자의 조합입니다."}/>
            <div id="responsiveUsername" className="absolute top-[18px] right-6"><UsernameDupleCheckButton checkDupleID={checkDupleID} setCheckDupleId={setCheckDupleId}/></div>
          </div>
          <div className="relative">
            <SignFormInput title={"🔒 비밀번호"} type={"password"} id={"password"} setCheckPassword={setCheckPassword} subtitle={"비밀번호는 5 ~ 10자 이내 영문, 숫자의 조합입니다."}/>
            <div id="responsivePassword" className="absolute top-[56px] right-6"><MaskingButton/></div>
          </div>
          <div className="relative">
            <SignFormInput title={"🔒 비밀번호 확인"} type={"password"} id={"checkPassword"} setCheckPassword={setCheckPassword} subtitle={"비밀번호 확인을 위해서 비밀번호를 한 번 더 입력해주세요."}/>
            <div id="responsivePassword" className="absolute top-[56px] right-6"><MaskingButton/></div>
          </div>
          <p id="checkMessage" className="h-8 opacity-0 font-extrabold sm:text-base text-[70%]">{checkPassword}</p>
        </div>
      </form>
      <div className="my-2 w-[80%] flex justify-center mb-5">
          <CustomButton width={30 +'rem'} height={3+'rem'} title={"회원가입하기"} func={(e)=>{handleSignup(e,checkDupleID)}}/>
      </div>
      <div className="w-[80%] max-w-[30rem] flex items-center">
        <span className="w-[34%] h-0 border border-white"></span>
        <div className="grow text-white px-4 whitespace-nowrap">
          <Navigation title={"로그인하기"} url={"/login"}/>
        </div>
        <span className="w-[34%] h-0 border border-white"></span>
      </div>
    </div>
  )
}

export default SignupPage
