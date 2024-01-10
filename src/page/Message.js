import { useEffect } from 'react'
import TitleHeader from '../component/common/TitleHeader'
import MessengerBox from '../component/messenger/MessengerBox'
import { useNavigate } from 'react-router-dom'

const Message = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");      
    }
    if(sessionStorage.getItem("role") === "[ROLE_WAITING]"){
      alert("승인되지 않은 사용자입니다.");
      navigate("/");
    }
// eslint-disable-next-line
  },[])
  return (
    <div className="w-full max-w-[50rem] h-full mx-auto">    
      <TitleHeader title={"COMPANY MESSENGER"}/>
      <MessengerBox/>
      <div className='h-10'></div>
    </div>
  )
}

export default Message