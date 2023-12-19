import CustomButton from "../common/CustomButton"
import Navigation from "../common/Navigation"
import { BACKEND_URL, PURPLE } from "../common/Common"
import { useNavigate } from "react-router-dom"
import SignFormInput from "../component/signupPage/SignFormInput"
import MaskingButton from "../common/MaskingButton"

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
    <div id="signupContainer" className="w-full flex flex-col items-center">
      <form style={{backgroundColor : PURPLE}} 
      className="mt-20 mb-5 w-[80%] max-w-[30rem] min-h-[30rem] h-[70%] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className="text-white w-[90%] mb-2">회원가입하시면 서비스를 이용하실 수 있습니다</p>
        <div className="border bg-white shadow-inner w-[90%] h-[80%] p-4 gap-2 rounded-lg flex flex-col justify-center">
          <SignFormInput title={"🙍‍♂️ 아이디"} type={"text"} id={"username"} subtitle={"아이디는 5 ~ 10자 이내 영문, 숫자의 조합입니다."}/>
          <div className="relative">
            <SignFormInput title={"🔒 비밀번호"} type={"password"} id={"password"} subtitle={"비밀번호는 5 ~ 10자 이내 영문, 숫자의 조합입니다."}/>
            <div className="absolute top-[40%] right-6"><MaskingButton/></div>
          </div>
          <div className="relative">
            <SignFormInput title={"🔒 비밀번호 확인"} type={"password"} id={"checkPassword"} subtitle={"비밀번호 확인을 위해 한번 더 입력해주세요"}/>
            <div className="absolute top-[40%] right-6"><MaskingButton/></div>
          </div>
        </div>
      </form>
      <div className="my-2 w-[80%] flex justify-center mb-5">
          <CustomButton width={30 +'rem'} height={3+'rem'} title={"회원가입하기"} func={handleSignup}/>
      </div>
      <div className="w-[80%] max-w-[30rem] flex items-center">
        <span className="w-[34%] h-0 border border-white"></span>
        <div className="grow text-gray-700">
          <Navigation title={"로그인하기"} url={"/login"}/>
        </div>
        <span className="w-[34%] h-0 border border-white"></span>
      </div>
    </div>
  )
}

export default SignupPage
