import FormInput from "./FormInput"
import CustomButton from "../../common/CustomButton"
import Navigation from "../../common/Navigation"
import { BACKEND_URL, PURPLE } from "../../common/Common"
import MaskingButton from "../../common/MaskingButton"

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch(BACKEND_URL+"/login",{
      method : "post",
      body : JSON.stringify({
        "username" : username,
        "password" : password
      })
    })
    .then(res => {
      if(res.status === 200){
        alert("로그인에 성공하셨습니다. 메인 페이지로 이동합니다.");
      }else{
        alert("잘 못 된 아이디, 비밀번호입니다.");
      }
    })
    .catch(e =>{
      console.log(e);
      alert("데이터 전송 중 오류 발생");
    });
  }

  return (
    <section className="w-[80%] my-4">
      <form 
      style={{backgroundColor : PURPLE}} 
      className="w-full h-[30rem] rounded-md shadow-lg flex flex-col gap-2 justify-center items-center">
          <p className="w-[90%] text-white font-extrabold">아이디로 로그인하기</p>
          <div className="bg-white shadow-inner w-[90%] h-[60%] rounded-lg p-5 flex justify-center items-center">
            <div className="w-full flex flex-col gap-5">
              <FormInput title={"🙍‍♂️ 아이디"} type={"text"} id={"username"}/>
              <div className="relative">
                <FormInput title={"🔒 비밀번호"} type={"password"} id={"password"}/>
                <div className="absolute top-[59%] right-6 sm:right-6 translate-y-[-50%] "><MaskingButton/></div>
              </div>
            </div>
          </div>
          <div className="my-2 w-[90%]">
              <CustomButton width={100+"%"} height={3+'rem'} title={"로그인"} func={handleLogin}/>
          </div>
          <div className="w-[90%] flex items-center">
            <span className="w-[34%] h-0 border border-white"></span>
            <div className="grow">
              <Navigation title={"회원가입"} url={"/signup"}/>
            </div>
            <span className="w-[34%] h-0 border border-white"></span>
          </div>
      </form>
    </section>
  )
}

export default LoginForm
