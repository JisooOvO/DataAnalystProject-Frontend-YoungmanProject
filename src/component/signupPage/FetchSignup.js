import { BACKEND_URL } from "../../common/Common";

export default function FetchSignup(username, password,setIsSuccessSignup,setIsTouched){
    fetch(BACKEND_URL+"/api/public/signup",{
      method : "post",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "username" : username,
        "password" : password
      })
    })
    .then(res => {
      if(res.status === 200){
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        setIsSuccessSignup(true);
        setIsTouched(false);
      }else{
        alert("중복된 아이디입니다.");
        setIsTouched(false);
      }
    })
    .catch(e => {
        console.log(e);
        alert("데이터 전송 중 에러 발생");    
    })
}