import CustomInput from "../common/CustomInput"

const MCSearchContainer = ({title,inputId}) => {
  return (
    <div className="sm:flex items-center gap-4 w-full mb-3">
      <p className="sm:w-[10%] w-full h-12 p-2">{title}</p>
      <div className="sm:w-[40%] pl-2 w-full h-12"><CustomInput id={inputId}/></div>
    </div>
  )
}

export default MCSearchContainer