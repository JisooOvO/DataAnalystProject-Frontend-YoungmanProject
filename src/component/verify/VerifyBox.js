import { useEffect, useState } from "react"
import FindContainer from "./VerifyContainer";
import { AtomEmail, BACKENDURL } from "../common/Common"
import { useRecoilState } from "recoil";
import CodeInput from "./CodeInput";

const VerifyBox = ({targetNm}) => {
  const [container, setContainer] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [_, setUserEmail] = useRecoilState(AtomEmail);

  useEffect(()=>{
    setContainer(<FindContainer targetNm={targetNm} handleSubmitClick={handleSubmitClick}/>);        
  },[targetNm]);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const email = document.querySelector("#email");
    if(isClick) return;
    if(email.validity.typeMismatch) {
        alert("유효한 이메일 형식이 아닙니다.");
        return;
    }
    fetch(BACKENDURL+"/api/public/verifyEmail",{
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "email" : email.value,
      })
    })
    .then(res => {
      if(res.status === 200){
        const codeForm = document.querySelector("#codeForm");
        codeForm.classList.remove("hidden");
        alert("해당 이메일로 코드를 전송했습니다.\n해당 코드를 아래에 입력하세요");
        setUserEmail(email.value);
        fetch(BACKENDURL+"/api/public/sendCodeToMail",{
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "email": email.value,
          })
        })
        .then(res => {
          if(res.status !== 200){
            alert("데이터 전송 중 에러 발생");
          }
          })
        .catch(e => {
          console.log(e);
        })
      }else{
        alert("이메일과 일치하는 회원 정보가 존재하지 않습니다.");
        return res.json();
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log(e);
      alert("데이터 전송 중 에러 발생");
    })
    setIsClick(false);
  }
  return (
    <>
      {container ? container : ''}
      <CodeInput/>
    </>
  )
}

export default VerifyBox