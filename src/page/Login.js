import TitleHeader from "../component/common/TitleHeader"
import LoginForm from "../component/login/LoginForm"
import OuthSection from "../component/login/OuthSection"
const Login = () => {
  return (
    <div className="w-[85%] max-w-[40rem] h-full mx-auto">
      <TitleHeader title={"MEMBER LOGIN"}/>
      <OuthSection/>
      <LoginForm/>
    </div>
  )
}

export default Login
