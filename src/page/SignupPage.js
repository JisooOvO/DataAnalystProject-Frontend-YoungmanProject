import FormInput from "../common/FormInput"
import FormInputHeader from "../common/FormInputHeader"
import CustomButton from "../common/CustomButton"
import Navigation from "../common/Navigation"
import { BACKEND_URL } from "../common/Common"
import { useNavigate } from "react-router-dom"

const SignupPage = () => {
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch(BACKEND_URL+"/public/signup",{
      method : "post",
      body : JSON.stringify({
        "username" : username,
        "password" : password
      })
    })
    .then(res => {
      if(res.status === 200){
        alert("회원가입되셨습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }else{
        alert("회원가입에 실패하셨습니다.");
      }
    })
    .catch(e => {
      console.log(e);
      alert("데이터 전송 중 에러 발생");    
    })
  }

  return (
    <div id="signupContainer" className="h-full w-full flex justify-center items-center">
      <form className="border w-[80%] max-w-[30rem] min-h-[40rem] h-[80%] gap-2 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
        <FormInputHeader title={"회원가입 페이지입니다."}/>
        <FormInput title={"🙍‍♂️ 아이디"} type={"text"} id={"username"}/>
        <FormInput title={"🔒 비밀번호"} type={"password"} id={"password"}/>
        <FormInput title={"🔒 비밀번호 확인"} type={"password"} id={"passwordCheck"}/>
        <div className="my-2">
          <CustomButton width={10+'rem'} height={3+'rem'} title={"회원가입하기"} func={handleSignup}/>
        </div>
        <Navigation title={"로그인하기"} url={"/login"}/>
      </form>
    </div>
  )
}

export default SignupPage
