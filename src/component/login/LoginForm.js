import FormComponent from "./FormComponent"
import LoginFormNav from "../login/LoginFormNav"
import CustomButton from "../common/CustomButton"
import CustomCircle from "../common/CustomCircle"
import SearchIcon from "../../image/SearchIcon"
import { AtomIsLogin, BACKENDURL } from "../common/Common"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useRecoilState } from "recoil"

const LoginForm = () => {
  const navigate = useNavigate();
  const [isTouched, setIsTouched] = useState(false);
  // eslint-disable-next-line
  const [isLogin, setIsLogin] = useRecoilState(AtomIsLogin);

  const handleLoginButton = (e) => {
    e.preventDefault();
    if(isTouched) return;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    setIsTouched(true);

    if(username === "" || password === "" ){
      alert("미기입된 항목이 존재합니다.");
      return;
    }

    fetch(BACKENDURL + "/login",{
      method : "post",
      body : JSON.stringify({
        "username" : username,
        "password" : password
      })
    })
    .then(res => {
      if(res.status === 200){
        sessionStorage.setItem("token",res.headers.get("Authorization"));
        sessionStorage.setItem("username",res.headers.get("Username"));
        sessionStorage.setItem("role",res.headers.get("Role"));
        setIsLogin(true);
        navigate("/");
        window.location.reload();
      }else{
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
      setIsTouched(false);
    })
    .catch(e => {
      console.log(e)
      alert("데이터 전송 중 에러 발생");
    });
  }

  const handleMaskingButton = (e) => {
    e.preventDefault();
    const password = document.querySelector("#password");
    if(password.type === "text") password.type = "password";
    else password.type = "text";
  }

  return (
    <form className="w-full h-[30rem] bg-gray-200 border rounded-xl shadow-md p-10">
        <FormComponent title={"아이디"} type={"text"} placeholder={"아이디"} id={"username"}/>
        <div className="w-full mt-5 relative">
          <FormComponent title={"비밀번호"} type={"password"} placeholder={"비밀번호"} id={"password"}/>
          <div className="w-9 h-9 absolute top-[44%] right-2"><CustomCircle svg={<SearchIcon/>} func={handleMaskingButton}/></div>
        </div>
        <LoginFormNav/>
        <button onClick={handleLoginButton} className="mt-20 w-full h-16 font-bold text-2xl text-white"><CustomButton title={"로그인"} /></button>
    </form>
  )
}

export default LoginForm
