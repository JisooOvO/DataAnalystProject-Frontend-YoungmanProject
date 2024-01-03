import TitleHeader from "../component/common/TitleHeader"
import ChangePWBox from "../component/changePW/ChangePWBox"

const ChangePassword = () => {
  return (
    <div className="w-full max-w-[50rem] h-full mx-auto">
      <TitleHeader title={"CHANGE PASSWORD"}/>
      <ChangePWBox/>
    </div>
  )
}

export default ChangePassword
