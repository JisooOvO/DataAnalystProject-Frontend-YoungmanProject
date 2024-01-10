import { useEffect } from "react";
import RemoveIcon from "../../image/RemoveIcon"
import { BACKENDURL } from "../common/Common";

const ManageTable = ({data}) => {

  const handleClickDeleteButton = (e) => {
    const username = e.target.closest("tr").children[0].innerText;

    if(!window.confirm("해당 유저를 삭제하시겠습니까?")) return;

    fetch(BACKENDURL+"/api/admin/deleteOurMember",{
        method: "delete",
        headers: {
            "Authorization" : sessionStorage.getItem("token"),
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            "username" : username
        })
    })
    .then(res => {
        if(res.status === 200) {
          alert("삭제되었습니다.");
          window.location.reload();
        }
        else return res.json();
    })
    .then(data => console.log(data))
    .catch(e => console.log(e));
  }

  const handleChangePermission = (e) => {
    if(!window.confirm("해당 유저의 권한을 변경하시겠습니까?")) {
      window.location.reload();
      return;
    }

    const username = e.target.closest("tr").children[0].innerText;
    const targetPermission = e.target.value;
    const rawBody = {
      "username" : username,
      "association" : String(sessionStorage.getItem("association")),
      "role" : targetPermission,
    }
    console.log(rawBody);
    fetch(BACKENDURL+"/api/admin/updateOurMember",{
      method: "put",
      headers: {
        "Authorization" : sessionStorage.getItem("token"),
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(rawBody)
    })
    .then(res => {
      if(res.status === 200) {
        alert("변경되었습니다");
        window.location.reload();
      }else return res.json()
    })
    .then(data => console.log(data))
    .catch(e => console.log(e));
  }

  useEffect(()=>{
    const approves = document.querySelectorAll("#approve");
    approves.forEach(item => {
      if(item.innerText === "승인")
        item.classList.add("text-green-600");
      else
        item.classList.add("text-blue-500");
    })
  },[data])

  return (
    <table className="sm:text-base text-[80%] bg-white mb-5 w-full mt-10 text-center border border-b-0">
    <thead>
      <tr className="h-12 bg-custom-blue text-white">
        <th>회원명</th>                  
        <th>권한</th>                  
        <th>승인여부</th>
        <th>회원 삭제</th>
      </tr>
    </thead>
    <tbody>
      {
          data ? data.map((item,idx) => {
              return (
              <tr key={`key${idx}`} className="border h-12">
                  <td id="username">{item.username}</td>
                  <td>
                    <select onChange={handleChangePermission} className="w-full text-center h-12" defaultValue={item.role}>
                      <option value={"ADMIN"}>관리자</option>
                      <option value={"USER"}>일반회원</option>
                      <option value={"WAITING"} className="hidden">대기회원</option>
                    </select>      
                  </td>
                  <td id="approve" className="font-bold">{item.role === "WAITING" ? "대기" : "승인"}</td>
                  <td className="flex w-full h-12 justify-center items-center">
                    <button onClick={handleClickDeleteButton} className="w-6 h-6 bg-red-500 rounded-[50%] hover:opacity-70 shadow-md">
                      <RemoveIcon/>
                    </button>
                  </td>
              </tr>
              )}) : ""
      }
    </tbody>
  </table>
  )
}

export default ManageTable