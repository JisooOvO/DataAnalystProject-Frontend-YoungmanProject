import { useNavigate, useParams } from "react-router-dom";
import { BACKENDURL } from "../common/Common";
import CustomButton from "../common/CustomButton"
import CustomInput from "../common/CustomInput"
import { useState } from "react";

const CodeInput = () => {
  const navigate = useNavigate();
  const [isTouched, setIsTouched] = useState(false);
  const slot = useParams().slot;
  const handleSubmitCode = (e) => {
    e.preventDefault();
    if(isTouched) return;
    const code = document.querySelector("#code").value;
    setIsTouched(true);
    fetch(BACKENDURL+"/api/public/verifyCode",{
      method: "post",
      headers: {
          "Content-Type" : "application/json",
      },
      body: JSON.stringify({
          "codeNumber" : code,
      })
    })
    .then(res => {
      if(res.status === 200){
          alert("코드 인증에 성공하셨습니다.\n다음 페이지로 이동합니다.");
          navigate("/find?target="+slot);
      }else{
          alert("코드가 일치하지 않습니다.");
      }
    })
    .catch(e => {
      console.log(e);
      alert("데이터 전송 중 에러 발생");
    })
    setIsTouched(false);
  }

  return (
    <form id="codeForm" className="hidden border border-black w-full mt-10 rounded-xl shadow-md h-[14rem] p-5">
      <p className="font-bold mb-3">코드 입력</p>
      <div className="h-12"><CustomInput id={"code"} type={"text"}/></div>
      <div className="w-full flex justify-end mt-10">
        <button onClick={handleSubmitCode} className="w-44 h-12 font-bold text-white"><CustomButton title={"코드 제출"}/></button>
      </div>
    </form>
  )
}

export default CodeInput