import { useRecoilState } from "recoil"
import TitleHeader from "../component/common/TitleHeader"
import TransformBox from "../component/transform/TransformBox"
import { AtomIsLoading, AtomIsLogin } from "../component/common/Common"
import Loading from "../component/common/Loading"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const TransformReceipt = () => {
  const [isLoading, setIsLoading] = useRecoilState(AtomIsLoading);
  const [isLogin, setIsLogin] = useRecoilState(AtomIsLogin);
  const [headerHeight, setHeaderHeight] = useState(Math.max(
    document.body.scrollHeight, document.body.offsetHeight,
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
  ));
  const navigate = useNavigate();

  const handleResize = () => {
    setHeaderHeight(Math.max(
      document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
    ));
  };

  const handleScroll = () => {
    setHeaderHeight(Math.max(
      document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
    ));
  };

  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
    }

    if(sessionStorage.getItem("role") === "[ROLE_WAITING]"){
      alert("승인되지 않은 사용자입니다.");
      navigate("/");
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <div className="w-full max-w-[80rem] h-full mx-auto">
      { isLoading ? <div style={{ width : window.innerWidth, height : headerHeight }} className="absolute top-0 left-0 z-[9999] opacity-70 bg-gray-500 "><Loading/></div> : '' }
      <TitleHeader title={"TRANSFORM RECEIPT"}/>
      <TransformBox/>
    </div>
  )
}

export default TransformReceipt
