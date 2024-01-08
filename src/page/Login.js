import { useEffect } from "react"
import TitleHeader from "../component/common/TitleHeader"
import LoginForm from "../component/login/LoginForm"
import OuthSection from "../component/login/OuthSection"
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(sessionStorage.getItem("token")) navigate("/");
  },[])
  
  return (
    <div className="w-full max-w-[30rem] h-full mx-auto">
      <TitleHeader title={"MEMBER LOGIN"}/>
      {/* <OuthSection/> */}
      <LoginForm/>
    </div>
  )
}

export default Login
