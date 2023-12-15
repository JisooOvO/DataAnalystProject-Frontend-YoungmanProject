import FormInput from "../../common/FormInput"
import FormInputHeader from "../../common/FormInputHeader"
import SubmitButton from "../../common/SubmitButton"

const LoginForm = () => {
  return (
    <form className="w-[80%] border bg-white h-[60%] rounded-md shadow-lg flex flex-col gap-2 justify-center items-center">
        <FormInputHeader title={"로그인이 필요한 서비스입니다."}/>
        <FormInput title={"아이디"} type={"text"}/>
        <FormInput title={"비밀번호"} type={"password"}/>
        <div className="mt-2">
            <SubmitButton title={"로그인하기"}/>
        </div>
    </form>
  )
}

export default LoginForm
