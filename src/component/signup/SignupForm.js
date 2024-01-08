import { useEffect, useState } from "react"
import SearchIcon from "../../image/SearchIcon"
import { BACKENDURL } from "../common/Common"
import CustomButton from "../common/CustomButton"
import CustomCircle from "../common/CustomCircle"
import SignupFormComponent from "./SignupFormComponent"
import { useNavigate } from "react-router-dom"
import CheckIcon from "../../image/CheckIcon"
import CustomInput from "../common/CustomInput"
const SignupForm = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [isIdTyping, setIsIdTyping] = useState(true);
  const navigate = useNavigate();
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const IDTEXT = "아이디는 5 ~ 10자 이내 영어, 숫자의 조합입니다.";
  const PASSWORDTEXT = "비밀번호는 5 ~ 10자 이내 영어, 숫자의 조합입니다.";
  const regex = /^[a-zA-Z0-9]{5,10}$/;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const calWidth = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(()=>{
    window.addEventListener('resize',calWidth)
    return ()=> {
        window.removeEventListener('resize',calWidth);
    }
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(innerWidth > 768) 
        setDupleBt(
            <div onClick={handleDupleIdcheckButton} className="w-24 h-9 text-white font-bold top-[44%] absolute right-2 hover:cursor-pointer">
                <CustomButton id={"checkDupleIdButton"} title={"중복확인"}/>
            </div>
        )
    else 
        setDupleBt(
            <div onClick={handleDupleIdcheckButton} className="w-9 h-9 absolute top-[44%] right-2">
                <CustomCircle id={"checkDupleIdButton"} svg={<CheckIcon/>}/>
            </div>
    )
    // eslint-disable-next-line
  },[innerWidth])

  const handleDupleIdcheckButton = (e) => {
    e.preventDefault();
    if(!isIdTyping) return;
    const username = document.querySelector("#username").value;
    
    if(!regex.test(username)){
        alert(IDTEXT);
        return;
    }

    if(username === ""){
        alert("아이디를 입력하세요");
        return;
    }

    fetch(BACKENDURL+"/api/public/doubleCheck",{
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "username" : username
        })
    })
    .then(res => {
        if(res.status === 200){
            alert("사용 가능한 아이디입니다.");
            setIsIdTyping(false);
        }else{
            alert("이미 사용 중인 아이디입니다.");
        }
    })
    .catch(e => {
        console.log(e);
        alert("데이터 전송 중 에러 발생");
    });
    
  }

  const [dupleBt, setDupleBt] = useState(
    <CustomButton id={"checkDupleIdButton"} title={"중복확인"} func={handleDupleIdcheckButton}/>
  );


  const handleSignupButton = (e) => {
    e.preventDefault();

    if(isTouched) return;
    const username = document.querySelector("#username").value;
    let email = document.querySelector("#email")
    const password = document.querySelector("#password").value;
    const checkPassword = document.querySelector("#checkPassword").value;
    const association = document.querySelector("#association").value;

    if(email.validity.typeMismatch){
        alert("올바른 이메일 형식이 아닙니다.");
        return;
    }

    email = email.value;

    if(!regex.test(username)){
        alert(IDTEXT);
        return;
    }

    if(!regex.test(password)){
        alert(PASSWORDTEXT);
        return;
    }

    if(password !== checkPassword){
        alert("비밀번호 확인 후 다시 진행해주십시오.");
        return;
    }

    if(isIdTyping){
       alert("아이디 중복 확인 후 다시 진행해주십시오.");
       return; 
    }

    if(password === "" || username === "" || email === ""){
        alert("미기입된 항목이 존재합니다.");
        return;
    }
    console.log(association);
    setIsTouched(true);
    fetch(BACKENDURL+"/api/public/signup",{
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "username" : username,
            "email" : email,
            "password" : password,
            "association" : association,
        })
    })
    .then(res => {
        if(res.status === 200){
            alert("회원가입 요청이 완료되었습니다. 관리자의 승인을 기다리세요.");
            navigate("/login");
        }else{
            alert("회원가입에 실패하였습니다.");
            return res.json();
        }
        setIsTouched(false);
    })
    .then(data => console.log(data))
    .catch(e => {
        console.log(e);
        alert("데이터 전송 중 에러 발생");
    })
    setIsTouched(false);
  }

  const handleMaskingButton = (e,targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(`#${targetId}`);
    if (targetElement.type === "text") targetElement.type = "password";
    else targetElement.type = "text";
  }

  useEffect(()=>{
    const checkDupleIdButton = document.querySelector("#checkDupleIdButton");
    if(isIdTyping){
        checkDupleIdButton.classList.add("bg-custom-blue");
        checkDupleIdButton.classList.remove("hover:cursor-not-allowed")
        checkDupleIdButton.classList.add("hover:opacity-70");
        checkDupleIdButton.classList.remove("bg-red-500");        
    }else{
        checkDupleIdButton.classList.remove("bg-custom-blue");
        checkDupleIdButton.classList.add("hover:cursor-not-allowed")
        checkDupleIdButton.classList.remove("hover:opacity-70");
        checkDupleIdButton.classList.add("bg-red-500");
    }
  },[isIdTyping]);

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

  return (
    <form className="w-full h-fit border border-black rounded-xl shadow-md p-5 sm:p-10">
      <div className="w-full mb-8 relative">
          <SignupFormComponent title={"아이디"} id={"username"} placeholder={"아이디"} state={setIsIdTyping}
          type={"text"} subtitle={IDTEXT}/>
          {dupleBt ? dupleBt : ''}
      </div>
      <div className="w-full mb-4">
          <SignupFormComponent title={"이메일"} id={"email"} placeholder={"이메일"} 
          type={"email"}/>
      </div>
      <div className="w-full mb-4">
        <div className="w-full h-24">
          <p className="mb-3 font-bold">소속</p>
            <select id="association" className="w-full h-12 rounded-xl border border-black shadow-inner p-2 hover:cursor-pointer">
              <option value={"0"}>나인온스</option>  
              <option value={"1"}>부산대학교</option> 
            </select>
        </div>
      </div>
      <div className="w-full mb-8 relative">
          <SignupFormComponent func={handlePasswordTyping} title={"비밀번호"} id={"password"} placeholder={"비밀번호"} type={"password"} state={setPasswordCheckMsg}
          subtitle={PASSWORDTEXT}/>
          <div className="w-9 h-9 absolute top-[44%] right-2"><CustomCircle svg={<SearchIcon/>}
          func={(e)=>{handleMaskingButton(e,"password")}}/></div>
      </div>
      <div className="w-full mb-8 relative">
          <SignupFormComponent func={handlePasswordTyping} title={"비밀번호 확인"} id={"checkPassword"} placeholder={"비밀번호 확인"} type={"password"} state={setPasswordCheckMsg}
          subtitle={"비밀번호 확인을 위해 한번 더 입력하세요."}/>
          <div className="w-9 h-9 absolute top-[44%] right-2"><CustomCircle svg={<SearchIcon/>} 
          func={(e)=>{handleMaskingButton(e,"checkPassword")}}/></div>
      </div>
      <p id="passwordCheckMsg" className="h-10">{passwordCheckMsg}</p>
      <button onClick={handleSignupButton} className="w-full h-16 font-bold text-2xl text-white"><CustomButton title={"회원가입"}/></button>
    </form>
  )
}

export default SignupForm
