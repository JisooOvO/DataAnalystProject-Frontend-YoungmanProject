import loginBackgroundImg from "../../image/loginBackgroundImg.png"
const LoginLeftImage = () => {
  return (
    <div className="sm:w-[50%] sm:h-full hidden sm:block relative">
      <img className="w-full min-h-full" src={loginBackgroundImg} alt="로그인 백그라운드 이미지"/>
    </div>
  )
}

export default LoginLeftImage
