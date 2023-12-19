import CustomButton from "../../common/CustomButton"
import FormInputHeader from "../../component/loginPage/FormInputHeader"
import LoginForm from "./LoginForm"

const LoginRightComponent = () => {
  const handleGoogleLogin = () => {

  }
  
  return (
    <div className="w-full sm:w-[50%] h-full flex flex-col items-center">
        <FormInputHeader title={"로그인이 필요한 서비스입니다"}/>
        <div className="mb-10 w-full flex justify-center">
          <CustomButton height={3+'rem'} width={80+"%"} title={"구글 로그인"} func={handleGoogleLogin}/>
        </div>
        <LoginForm/>
    </div>
  )
}

export default LoginRightComponent
