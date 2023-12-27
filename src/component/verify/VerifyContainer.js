import CustomButton from "../common/CustomButton"
import CustomInput from "../common/CustomInput"

const VerifyContainer = ({targetNm,handleSubmitClick}) => {
  return (
    <div className="border border-black h-[20rem] rounded-xl shadow-md p-5">
        <div className="w-full h-12 font-bold flex flex-col justify-center sm:text-base text-sm text-center">
          <p>회원가입시 입력한 이메일을 통해 </p>
          <p>{targetNm}를 { targetNm === "아이디" ? "찾을" : "변경 할" } 수 있습니다.</p>
        </div>
        <form className="mt-10">
            <div className="w-full h-24 mb-3">
                <p className="mb-3 font-bold">이메일</p>
                <div className="h-12"><CustomInput id={"email"} type={"email"}/></div>
            </div>
            <div className="w-full h-12 flex justify-end mt-10">
              <button onClick={handleSubmitClick} className="w-44 h-full font-bold text-white">
                  <CustomButton title={"이메일 검증"}/>
              </button>
            </div>
        </form>
    </div>
  )
}

export default VerifyContainer