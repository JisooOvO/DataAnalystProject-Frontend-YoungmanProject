import { BEIGE } from "../../common/Common"

const SignFormInput = ({title,type,id,subtitle,setCheckPassword,setCheckDupleId}) => {
  const handleClearDupleCheck = (e) => {
    if(e.target.id === "username"){
      setCheckDupleId(false);
    }
  }

  const handleCheckPassword = () => {
    const password = document.querySelector("#password").value;
    const checkPassword = document.querySelector("#checkPassword").value;
    const checkMessage = document.querySelector("#checkMessage");
    const regex = /^[a-zA-Z0-9]{5,10}$/;

    if(password === checkPassword){
      setCheckPassword("비밀번호가 일치합니다.");
      checkMessage.classList.remove("opacity-0");
      checkMessage.classList.remove("text-red-500");
      checkMessage.classList.add("text-blue-500");
    }
    else{
      setCheckPassword("비밀번호가 일치하지 않습니다.");
      checkMessage.classList.remove("opacity-0");
      checkMessage.classList.remove("text-blue-500");
      checkMessage.classList.add("text-red-500");
    }

    if(!regex.test(password)){
      setCheckPassword("비밀번호 형식이 올바르지 않습니다.");
      checkMessage.classList.remove("opacity-0");
      checkMessage.classList.remove("text-blue-500");
      checkMessage.classList.add("text-red-500");
    }    

    if(password === "" && checkPassword === "")
      checkMessage.classList.add("opacity-0");

  }
  return (
    <div style={{backgroundColor : BEIGE}} className="w-full border rounded-xl px-4 py-2 h-32 flex flex-col justify-center">
      <div className="flex w-[40%] justify-center items-center mt-2 mb-2">
        <div className="w-full drop-shadow flex items-center whitespace-nowrap">
            {title}
        </div>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <input maxLength={10} onKeyDown={handleClearDupleCheck} onKeyUp={handleCheckPassword} type={type} id={id} name={id} className="border w-full h-12 rounded-xl shadow-inner px-2"/>
        <p className="text-gray-700 text-[60%] mt-1">{subtitle}</p>
      </div>
    </div>
    )
}

export default SignFormInput
