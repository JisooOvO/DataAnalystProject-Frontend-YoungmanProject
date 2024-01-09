import TitleHeader from "../component/common/TitleHeader"
import ManageNav from "../component/manage/ManageNav"
import ManageForm from "../component/manage/ManageForm"
import { useRecoilState } from "recoil"
import { AtomChangeTable } from "../component/common/Common"
import ManageFormCard from "../component/manage/ManageFormCard"
import ModalImage from "../component/manage/ModalImage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ManageReceipt = () => {
  const [isTable, setIsTable] = useRecoilState(AtomChangeTable);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
    }

    if(sessionStorage.getItem("role") === "[ROLE_WAITING]"){
      alert("승인되지 않은 사용자입니다.");
      navigate("/");
    }
  },[])

  return (
    <div className="w-full max-w-[80rem] h-full mx-auto relative">
      <TitleHeader title={"RECEIPT MANAGEMENT"}/>
      <ModalImage/>
      <ManageNav/>
      {
        isTable ?
          <ManageForm/>
        :
          <ManageFormCard/>
      }
      <div className="h-10"></div>
    </div>
  )
}

export default ManageReceipt
