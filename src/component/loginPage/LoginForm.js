import FormInput from "../../common/FormInput"
import FormInputHeader from "../../common/FormInputHeader"
import CustomButton from "../../common/CustomButton"
import Navigation from "../../common/Navigation"
import { BACKEND_URL } from "../../common/Common"

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch(BACKEND_URL+"/public/login",{
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
    <form className="w-[80%] border bg-white min-h-[30rem] h-[60%] rounded-md shadow-lg flex flex-col gap-2 justify-center items-center">
        <FormInputHeader title={"로그인이 필요한 서비스입니다."}/>
        <FormInput title={"🙍‍♂️ 아이디"} type={"text"} id={"username"}/>
        <FormInput title={"🔒 비밀번호"} type={"password"} id={"password"}/>
        <div className="my-2">
            <CustomButton width={10+'rem'} height={3+'rem'} title={"로그인하기"} func={handleLogin}/>
        </div>
        <Navigation title={"회원가입하기"} url={"/signup"}/>
    </form>
  )
}

export default LoginForm
