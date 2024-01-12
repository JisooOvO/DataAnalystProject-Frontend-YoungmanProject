import { useRecoilState } from "recoil"
import CustomButton from "../common/CustomButton"
import { AtomEmail, AtomIsCodePass, BACKENDURL } from "../common/Common"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FindUsername = () => {
  const [userEmail, setUserEmail] = useRecoilState(AtomEmail);
  const [txt, setTxt] = useState('');
  const [_, setIsCodePass] = useRecoilState(AtomIsCodePass);
  const navigate = useNavigate();

  useEffect(()=>{
    if(userEmail){
        fetch(BACKENDURL+"/api/public/findId",{
            method: "post",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                "email" : userEmail
            })
        })
        .then(res => {
            if(res.status === 200){
                return res.text();
            }else{
                return res.json();
            }
        })
        .then(data => {
            setTxt(
             <div className="h-fit mt-4 mb-8 sm:flex sm:items-center text-xl">
                <p>해당 이메일과 일치하는 아이디는</p>&nbsp;
                <p className="font-bold text-custom-blue ml-4 sm:ml-0">{data}</p>
                <p className="mt-6 sm:mt-0">입니다.</p>
             </div>
            );
            setUserEmail("");
            setIsCodePass(false);
        })
        .catch(e => {
            console.log(e);
            alert("데이터 전송 중 에러 발생");
        })
    }
  },[userEmail])

  const handleGoLogin = () => {
    setIsCodePass(false);
    navigate("/login");
  }

  return (
    <div className="border h-fit bg-gray-200 rounded-xl shadow-md p-5 sm:text-base text-sm">
      {txt}
      <button onClick={handleGoLogin} 
      className="w-full h-16 font-bold text-2xl text-white"><CustomButton title={"로그인 하러가기"}/></button>
    </div>
  )
}

export default FindUsername