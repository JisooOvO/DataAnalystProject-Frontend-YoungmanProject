import AlarmBox from "../component/alarm/AlarmBox"
import TitleHeader from "../component/common/TitleHeader"

const Alarm = () => {
  return (
    <div className="w-full max-w-[40rem] h-full mx-auto">
      <TitleHeader title={"COMPANY ALARM"}/>
      <AlarmBox/>
    </div>
  )
}

export default Alarm