import { BACKEND_URL } from "../../common/Common"

const UsernameDupleCheckButton = ({checkDupleID,setCheckDupleId}) => {
  const handleUsernameDuplicatedCheckButton = () => {
    if(checkDupleID) return;
    const username = document.querySelector("#username").value;
    const regex = /^[a-zA-Z0-9]{5,10}$/;

    if(!regex.test(username)){
      alert("아이디는 5 ~ 10자 이내 영문, 숫자의 조합입니다.")
      return;
    }

    fetch(BACKEND_URL+"/api/public/doubleCheck",{
      method : "post",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "username" : username,
      })
    })
    .then(res => {
      if(res.status === 226){
        alert("중복된 아이디입니다.");
      }
      if(res.status === 200){
        alert("사용 가능한 아이디입니다.");
        setCheckDupleId(true);
      }
    })
  }

  return (
    <div
    id="checkDupleIdButton"
    onClick={handleUsernameDuplicatedCheckButton}
    className="hover:cursor-pointer flex justify-center items-center w-20 sm:w-28 bg-[#898FCB] border-b border-[#818181] text-white font-extrabold rounded-md shadow-md hover:bg-[#F0A16D]">
        중복검사
    </div>
  )
}

export default UsernameDupleCheckButton
