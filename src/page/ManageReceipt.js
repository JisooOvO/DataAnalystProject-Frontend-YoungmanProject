import TitleHeader from "../component/common/TitleHeader"
import ManageNav from "../component/manage/ManageNav"
import ManageForm from "../component/manage/ManageForm"
import { useRecoilState } from "recoil"
import { AtomChangeTable } from "../component/common/Common"
import ManageFormCard from "../component/manage/ManageFormCard"
import ModalImage from "../component/manage/ModalImage"

const ManageReceipt = () => {
  const [isTable, setIsTable] = useRecoilState(AtomChangeTable);
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
