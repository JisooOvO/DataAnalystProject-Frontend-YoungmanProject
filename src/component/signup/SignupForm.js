import CustomButton from "../common/CustomButton"
import SignupFormComponent from "./SignupFormComponent"
const SignupForm = () => {
  const handleSignupButton = () => {

  }

  return (
    <form className="w-full h-[40rem] border border-black rounded-xl shadow-md p-10">
      <div className="w-full mb-8">
          <SignupFormComponent title={"아이디"} id={"username"} placeholder={"아이디를 입력하세요."} type={"text"} subtitle={"아이디는 5 ~ 10자 이내 영어, 숫자입니다."}/>
      </div>
      <SignupFormComponent title={"이메일"} id={"email"} placeholder={"이메일을 입력하세요."} type={"email"}/>
      <SignupFormComponent title={"비밀번호"} id={"password"} placeholder={"비밀번호를 입력하세요."} type={"password"}/>
      <SignupFormComponent title={"비밀번호 확인"} id={"checkPassword"} placeholder={"비밀번호를 한번 더 입력하세요."} type={"password"}/>
      <div className="mt-20 w-full h-16 font-bold text-2xl text-white"><CustomButton title={"회원가입"} func={handleSignupButton}/></div>
    </form>
  )
}

export default SignupForm
