import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput"

const ManageNav = () => {
  const today = new Date().toISOString().slice(0,10);
  return (
    <div className="w-full h-fit border border-black mb-2 rounded-xl shadow-md py-4 px-3">
      <p className="mb-3 border rounded-xl p-2 bg-custom-blue text-white">상세 검색</p>
      <div className="sm:w-[70%] text-[80%] sm:text-base p-2 grid items-center gap-4">
        <div className="sm:flex gap-2 items-center w-full">
          <p className="mb-2 w-[6rem]">거래 기간</p>
          <div className="flex gap-1 grow">
            <div className="h-10 w-[40%]"><CustomInput type={"date"} id={"startDate"} defaultValue={today}/></div>
            <div className="h-full text-2xl grow text-center">~</div>
            <div className="h-10 w-[40%]"><CustomInput type={"date"} id={"endDate"} defaultValue={today}/></div>
          </div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 w-[6rem]">업체명</p>
          <div className="h-10 grow"><CustomInput type={"text"} id={"companyName"}/></div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 w-[6rem]">물품명</p>
          <div className="h-10 grow"><CustomInput type={"text"} id={"itemName"}/></div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button className="mt-3 w-full sm:w-32 h-12 font-bol text-white text-xl"><CustomButton title={"검색"}/></button>
      </div>
    </div>
  )
}

export default ManageNav