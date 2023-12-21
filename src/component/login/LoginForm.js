import FormComponent from "../login/FormComponent"
import LoginFormNav from "../login/LoginFormNav"
import CustomButton from "../common/CustomButton"
const LoginForm = () => {
  return (
    <section className="w-full h-[30rem] border border-black rounded-xl shadow-md p-10">
        <FormComponent title={"아이디"} type={"text"} placeholder={"아이디를 입력해주세요."}/>
        <FormComponent title={"비밀번호"} type={"password"} placeholder={"비밀번호를 입력해주세요."}/>
        <LoginFormNav/>
        <div className="mt-20 w-full h-16 font-bold text-2xl text-white"><CustomButton title={"로그인"}/></div>
    </section>
  )
}

export default LoginForm
