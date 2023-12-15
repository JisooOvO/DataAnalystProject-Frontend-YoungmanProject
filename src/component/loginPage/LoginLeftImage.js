import loginBackgroundImg from "../../image/loginBackgroundImg.jpg"
const LoginLeftImage = () => {
  return (
    <div className="sm:w-[50%] sm:h-full hidden sm:block relative">
      <p className="absolute top-10 w-full text-center text-5xl font-bold text-white">Welcome to my world</p>
      <p className="absolute top-48 w-full text-center text-xl font-bold text-white px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
      <img className="w-full h-full" src={loginBackgroundImg} alt="로그인 백그라운드 이미지"/>
      <p className="absolute bottom-10 w-full text-center text-xl font-bold text-white px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
    </div>
  )
}

export default LoginLeftImage
