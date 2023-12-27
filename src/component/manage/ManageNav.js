import CustomInput from "../common/CustomInput"

const ManageNav = () => {
  const today = new Date().toISOString().slice(0,10);
  return (
    <div className="w-full border border-black mb-2 rounded-xl shadow-md py-2 px-6">
      <div className="flex gap-2">
        <div className="w-[12%]"><CustomInput type={"date"} defaultValue={today}/></div>
        <div className="h-full text-2xl">~</div>
        <div className="w-[12%]"><CustomInput type={"date"} defaultValue={today}/></div>
      </div>
    </div>
  )
}

export default ManageNav