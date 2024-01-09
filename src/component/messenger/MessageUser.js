import { useNavigate } from "react-router-dom";
import UserIcon from "../../image/UserIcon";

const MessageUser = ({data}) => {
  const navigate = useNavigate();
  let role = "";
  if(data["role"] === "WAITING") role = "대기회원"
  if(data["role"] === "ADMIN") role = "관리자"

  const handleEnterMessage = () => {
    navigate(`/company/message/chat?username=${data["username"]}`)
  }

  return (
    <div onClick={handleEnterMessage} className="border bg-white p-4 w-full hover:bg-gray-300 hover:cursor-pointer text-[80%] sm:text-xl h-40 mb-5 rounded-xl shadow-md">
      <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
              <div className="bg-custom-blue w-10 h-10 rounded-xl shadow-md flex items-center justify-center">
                <UserIcon/>
              </div>
              <p className="drop-shadow-md">{data["username"] }</p><span className="text-gray-500">{role ? "("+role+")" : ""}</span>
          </div>
          <p className="text-custom-blue">{data["association"] ? data["association"]["association"] : ""}</p>
      </div>
      <div className="my-4 p-2">
        gg
      </div>
    </div>
  )
}

export default MessageUser