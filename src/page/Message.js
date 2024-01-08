import TitleHeader from '../component/common/TitleHeader'
import MessengerBox from '../component/messenger/MessengerBox'

const Message = () => {
  return (
    <div className="w-full max-w-[50rem] h-full mx-auto">    
      <TitleHeader title={"COMPANY MESSENGER"}/>
      <MessengerBox/>
      <div className='h-10'></div>
    </div>
  )
}

export default Message