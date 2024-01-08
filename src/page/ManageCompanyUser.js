import { useEffect } from "react"
import TitleHeader from "../component/common/TitleHeader"
import ManageCompanyMemberBox from "../component/manageCompany/ManageCompanyMemberBox"
import { useNavigate } from "react-router-dom"
import { AtomCompanyManageView, BACKENDURL } from "../component/common/Common"
import { useRecoilState } from "recoil"

const ManageCompanyUser = () => {
  const navigate = useNavigate();
  const [view,setView] = useRecoilState(AtomCompanyManageView);

  useEffect(()=>{
    setView("");
    
    if(!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "[ROLE_ADMIN]") navigate("/");

    fetch(BACKENDURL+"/api/admin/getOurMembers",{
        headers : {
            "Authorization" : sessionStorage.getItem("token")
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json()
        }
    })
    .then(data => {
        setView(<ManageCompanyMemberBox data={data}/>);
    })
    .catch(e => console.log((e)));
  },[])
  
  return (
    <div className="w-full max-w-[50rem] h-full mx-auto">
        <TitleHeader title={"MANAGE COMPANY MEMBER"}/>
        {view}
        <div className="h-10"></div>
    </div>
  )
}

export default ManageCompanyUser