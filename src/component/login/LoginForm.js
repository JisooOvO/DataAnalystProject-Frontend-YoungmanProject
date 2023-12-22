import FormComponent from "../login/FormComponent"
import LoginFormNav from "../login/LoginFormNav"
import CustomButton from "../common/CustomButton"
import CustomCircle from "../common/CustomCircle"
import SearchIcon from "../../image/SearchIcon"
import { BACKENDURL } from "../common/Common"

const LoginForm = () => {
  const handleLoginButton = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch(BACKENDURL + "/login",{
      method : "post",
      body : JSON.stringify({
        "username" : username,
        "password" : password
      })
    })
    .then(res => {
      if(res === 200){
        alert("로그인에 성공하셨습니다. 메인 페이지로 이동합니다.");
      }else{
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    })
    .catch(e => console(e));
  }

  const handleMaskingButton = (e) => {
    e.preventDefault();
    const password = document.querySelector("#password");
    if(password.type === "text") password.type = "password";
    else password.type = "text";
  }

  return (
    <form className="w-full h-[30rem] border border-black rounded-xl shadow-md p-10">
        <FormComponent title={"아이디"} type={"text"} placeholder={"아이디를 입력해주세요."} id={"username"}/>
        <div className="w-full mt-5 relative">
          <FormComponent title={"비밀번호"} type={"password"} placeholder={"비밀번호를 입력해주세요."} id={"password"}/>
          <div className="w-9 h-9 absolute top-[44%] right-4"><CustomCircle svg={<SearchIcon/>} func={handleMaskingButton}/></div>
        </div>
        <LoginFormNav/>
        <div className="mt-20 w-full h-16 font-bold text-2xl text-white"><CustomButton title={"로그인"} func={handleLoginButton}/></div>
    </form>
  )
}

export default LoginForm
