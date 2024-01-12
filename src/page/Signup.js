import { useNavigate } from "react-router-dom";
import TitleHeader from "../component/common/TitleHeader"
import SignupForm from "../component/signup/SignupForm"
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(sessionStorage.getItem("token")) navigate("/");
  },[])

  return (
    <div className="w-full max-w-[40rem] h-full mx-auto">
      <TitleHeader title={"REGISTER FORM"}/>
      <SignupForm/>
      <div className="h-20"></div>
    </div>
  )
}

export default Signup
