import { useNavigate, useParams } from "react-router-dom";
import { AtomIsCodePass, BACKENDURL } from "../common/Common";
import CustomButton from "../common/CustomButton"
import CustomInput from "../common/CustomInput"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const CodeInput = () => {
  const navigate = useNavigate();
  const [isTouched, setIsTouched] = useState(false);
  const slot = useParams().slot;
  const [seconds, setSeconds] = useState(900000);
  const [d, setD] = useState(new Date(900000));
  const [isCodePass, setIsCodePass] = useRecoilState(AtomIsCodePass);
  
  useEffect(()=>{
    const intervalFunc = setInterval(()=>{
      setSeconds(prevSec => {
        const newSec = prevSec - 1000
        if(newSec <= 0 ) return 0;
        else return newSec;
      })
    },1000)

    return () => clearInterval(intervalFunc);
  },[])

  useEffect(()=>{
    setD(new Date(seconds));
  },[seconds])

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
          setIsCodePass(true);
          navigate("/find?target="+slot);
      }else{
          alert("코드가 일치하지 않습니다.");
      }
    })
    .catch(e => {
      console.log(e);
    })
    setIsTouched(false);
  }

  return (
    <form id="codeForm" className="hidden border bg-gray-200 w-full mt-10 rounded-xl shadow-md h-[14rem] p-5">
      <p className="font-bold my-3">코드 입력</p>
      <div className="h-12 w-full flex gap-8">
        <div className="h-full w-[70%]">
          <CustomInput id={"code"} type={"text"}/>
        </div>
        <div className="h-full flex items-center gap-2 justify-center">
          <div className="border flex justify-center items-center h-full rounded-xl bg-white font-bold w-14">
            {String(d.getMinutes()).padStart(2,"0")}
          </div>
          :
          <div className="border flex justify-center items-center h-full rounded-xl bg-white font-bold w-14">
            {String(d.getSeconds()).padStart(2,"0")}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-10">
        <button onClick={handleSubmitCode} className="w-44 h-12 font-bold text-white"><CustomButton title={"코드 제출"}/></button>
      </div>
    </form>
  )
}

export default CodeInput