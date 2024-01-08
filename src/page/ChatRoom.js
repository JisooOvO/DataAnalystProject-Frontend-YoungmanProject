import ChatBox from "../component/chat/ChatBox"
import TitleHeader from "../component/common/TitleHeader"

const ChatRoom = () => {
  return (
    <div className="w-full max-w-[50rem] h-full mx-auto">
      <TitleHeader title={"CHAT"}/>
      <ChatBox/>
    </div>
  )
}

export default ChatRoom