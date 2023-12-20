import MaskingButton from "../myPage/MaskingButton"
import CustomButton from "../../common/CustomButton"

const ChangeMyInformation = () => {
  
  const handleChangePassword = () => {

  }

  return (
    <div className="w-full h-full">
      <p className="font-bold mb-2 text-xl drop-shadow-sm whitespace-nowrap">내 정보 변경</p>
      <div className="w-full border border-black h-0"></div>
      <div className="w-full h-[80%] mt-10">
        <div className="w-full relative">
            <p className="font-bold mb-2">비밀번호 수정</p>
            <input className="px-4 shadow-inner border rounded-md w-full h-12" type="password"/>
            <div className="absolute top-[48%] right-4"><MaskingButton/></div>
        </div>
      </div>
      <div className="absolute bottom-3 right-4">
            <CustomButton title={"설정 저장"} width={8+'rem'} height={2+'rem'} func={handleChangePassword}/>
      </div>
    </div>
  )
}

export default ChangeMyInformation
