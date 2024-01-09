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
             <>
                <p>해당 이메일에 일치하는 아이디는</p>&nbsp;
                <p className="font-bold text-custom-blue">{data}</p>
                <p>입니다.</p>
             </>);
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
        <div className="h-12 flex items-center text-xl mb-4">
            {txt}
        </div>
        <button onClick={handleGoLogin} 
        className="w-full h-16 font-bold text-2xl text-white"><CustomButton title={"로그인 하러가기"}/></button>
    </div>
  )
}

export default FindUsername