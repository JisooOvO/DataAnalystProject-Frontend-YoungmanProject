import { useEffect, useState } from "react";
import { BACKENDURL } from "../common/Common";
import MCSearchContainer from "./MCSearchContainer";
import CustomButton from "../common/CustomButton";
import ManageTable from "./ManageTable";

const ManageCompanyMemberBox = ({data}) => {
  const [view,setView] = useState(<ManageTable data={data}/>)
  const handleClickSearchButton = (e) => {
    const username = document.querySelector("#searchUsername").value;
    const searchRole = document.querySelector("#searchRole").value;
    let role;

    if(searchRole === "관리자") role = "ADMIN"
    if(searchRole === "일반회원") role = "USER"
    if(searchRole === "대기회원") role = "WAITING"

    let api = `/api/admin/getOurMembers`
    api = api + `?searchCriteria=${username ? username + "&" : ""}${role ? `role` : ""}`
    api = api + `&searchValue=${username ? username + "&" : ""}${role ? role : ""}`

    setView("");
    fetch(BACKENDURL+api,{
      headers:{
        "Authorization" : sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(d => {
      setView(<ManageTable data={d}/>);
    })
    .catch(e => console.log(e))
  }

  useEffect(()=>{
    if(data)
      sessionStorage.setItem("association", data[0]["association"]["code"])
    // eslint-disable-next-line
  },[])

  return (
    <div className="w-full border bg-gray-200 h-fit shadow-md rounded-xl p-5 pt-10">
      <div className="flex w-full justify-between items-center border-custom-blue border border-x-0 border-t-0 pb-5 text-xl">
        <p className="h-12 rounded-xl bg-custom-blue grow flex items-center text-white p-2">{data && data[0] ? data[0]["association"]["association"] : ""} 회원 관리</p>
      </div>
      <div className="mt-5 w-full">
        <div className="border bg-white w-full h-fit p-4 rounded-xl">
          <p className="mb-5 text-white bg-custom-blue rounded-xl flex items-center p-2">상세 검색</p>
          <MCSearchContainer title={"회원명"} inputId={"searchUsername"}/>
          <div className="sm:flex h-12 items-center gap-4 w-full mb-3 pl-2">
            <p className="sm:w-[10%] mb-3">권한</p>
            <select id="searchRole" className="border rounded-xl shadow-inner sm:w-[39.6%] pl-2 w-full h-12">
              <option value={"전체"}>전체</option>
              <option value={"관리자"}>관리자</option>
              <option value={"일반회원"}>일반회원</option>
              <option value={"대기회원"}>대기회원</option>
            </select>
          </div>
          <button onClick={handleClickSearchButton} className="w-full h-12 font-bold text-white tracking-widest sm:mt-5 mt-12 mb-1"> 
            <CustomButton title={"검색"}/>
          </button>
        </div>
      {view}
      </div>
    </div>
  )
}

export default ManageCompanyMemberBox