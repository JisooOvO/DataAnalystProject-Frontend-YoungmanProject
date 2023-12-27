import TitleHeader from "../component/common/TitleHeader"
import ManageNav from "../component/manage/ManageNav"
import ManageForm from "../component/manage/ManageForm"

const ManageReceipt = () => {

  return (
    <div className="w-full max-w-[80rem] h-full mx-auto">
      <TitleHeader title={"RECEIPT MANAGEMENT"}/>
      <ManageNav/>
      <ManageForm/>
    </div>
  )
}

export default ManageReceipt
