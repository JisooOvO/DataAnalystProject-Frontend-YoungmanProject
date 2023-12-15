import FormInput from "../../common/FormInput"
import FormInputHeader from "../../common/FormInputHeader"
import CustomButton from "../../common/CustomButton"
import Navigation from "../../common/Navigation"

const LoginForm = () => {
  return (
    <form className="w-[80%] border bg-white min-h-[30rem] h-[60%] rounded-md shadow-lg flex flex-col gap-2 justify-center items-center">
        <FormInputHeader title={"로그인이 필요한 서비스입니다."}/>
        <FormInput title={"🙍‍♂️ 아이디"} type={"text"}/>
        <FormInput title={"🔒 비밀번호"} type={"password"}/>
        <div className="my-2">
            <CustomButton width={10+'rem'} height={3+'rem'} title={"로그인하기"}/>
        </div>
        <Navigation title={"회원가입하기"} url={"/signup"}/>
    </form>
  )
}

export default LoginForm
