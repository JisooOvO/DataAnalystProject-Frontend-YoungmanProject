import FormInput from "../common/FormInput"
import FormInputHeader from "../common/FormInputHeader"
import CustomButton from "../common/CustomButton"
import Navigation from "../common/Navigation"

const SignupPage = () => {
  return (
    <div id="signupContainer" className="h-full w-full flex justify-center items-center">
      <form className="border w-[80%] max-w-[30rem] h-[80%] gap-2 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
        <FormInputHeader title={"회원가입 페이지입니다."}/>
        <FormInput title={"🙍‍♂️ 아이디"} type={"text"}/>
        <FormInput title={"🔒 비밀번호"} type={"password"}/>
        <FormInput title={"🔒 비밀번호 확인"} type={"password"}/>
        <div className="my-2">
          <CustomButton width={10+'rem'} height={3+'rem'} title={"회원가입하기"}/>
        </div>
        <Navigation title={"로그인하기"} url={"/login"}/>
      </form>
    </div>
  )
}

export default SignupPage
