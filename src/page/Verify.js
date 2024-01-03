import { useNavigate, useParams } from "react-router-dom"
import TitleHeader from "../component/common/TitleHeader"
import { useEffect, useState } from "react";
import FindBox from "../component/verify/VerifyBox";

const Verify = () => {
  const slot = useParams().slot;
  const [targetNm, setTargetNm ] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(sessionStorage.getItem("token")) navigate("/");

    if(slot === "password"){
      setTargetNm("비밀번호");
    }
    else if(slot === "username"){
      setTargetNm("아이디");
    }
  },[])

  return (
    <div className="w-full max-w-[40rem] h-full mx-auto">
      <TitleHeader title={"VERIFY EMAIL"}/>
      <FindBox targetNm={targetNm}/>
    </div>
  )
}

export default Verify
