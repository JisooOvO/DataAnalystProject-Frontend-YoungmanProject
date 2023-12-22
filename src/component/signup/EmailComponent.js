import { useEffect, useRef, useState } from "react";

const EmailComponent = () => {
  const selectRef = useRef();
  const [selection, setSelection] = useState("naver");
  const handleSelectChange = () => {
    setSelection(selectRef.current.value);
  }

  useEffect(()=>{
    const hostEmailTyping = document.querySelector("#hostEmailTyping");
    const typingHostEmail = document.querySelector("#typingHostEmail");
    if(selection === "other"){
      hostEmailTyping.classList.remove("hidden");
      typingHostEmail.focus();
    }else{
      hostEmailTyping.classList.add("hidden");
    }
  },[selection])

  return (
    <div className="w-full h-24">
      <p className="mb-3 font-bold">이메일</p>
      <div className="h-12 flex items-center gap-2">
        <input
        className="border border-black h-full rounded-xl grow px-2"
        type="text" placeholder="이메일을 입력하세요." id="email"/>
        <p className="text-2xl font-bold">@</p>
        <div className="w-[40%] border border-black h-12 relative rounded-xl ">
          <select onChange={handleSelectChange} ref={selectRef} className="w-full h-full px-2 rounded-xl" id="hostEmail">
              <option value={"naver.com"}>naver.com</option>
              <option value={"google.com"}>gmail.com</option>
              <option id="other" value={"other"}>직접입력</option>
          </select>
          <div id="hostEmailTyping" className="hidden w-[90%] h-full absolute rounded-xl top-0">
            <input id="typingHostEmail" className="w-full h-full rounded-xl px-2"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailComponent
