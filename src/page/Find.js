import TitleHeader from "../component/common/TitleHeader"
import FindBox from "../component/find/FindBox";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AtomIsCodePass } from "../component/common/Common";

const Find = () => {
  const url = new URL(window.location.href);
  const targetNm = url.searchParams.get("target");
  const navigate = useNavigate();
  const [isCodePass,_] = useRecoilState(AtomIsCodePass);

  useEffect(()=>{
    if(sessionStorage.getItem("token")) navigate("/");
    if(!isCodePass) navigate("/");
  },[])

  return (
    <div className="w-full max-w-[40rem] h-full mx-auto">
      <TitleHeader title={ targetNm === "password" ? "CHANGE PASSWORD" : "FIND USERNAME"}/>
      <FindBox targetNm={targetNm}/>
    </div>
  )
}

export default Find