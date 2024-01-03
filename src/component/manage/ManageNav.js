import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput"
import { AtomSearchDataRows, AtomTableRows, BACKENDURL } from "../common/Common"
import { useRecoilState } from "recoil";

const ManageNav = () => {
  const today = new Date().toISOString().slice(0,10);
  const [arr, setArr] = useRecoilState(AtomSearchDataRows);
  const [tbRows, setTbRows] = useRecoilState(AtomTableRows);

  const handleClickSearchButton = () => {
    const startDate = document.querySelector("#startDate").value;
    const endDate = document.querySelector("#endDate").value;
    const companyName = document.querySelector("#companyName").value;
    const itemName = document.querySelector("#itemName").value;

    let api = `/api/private/receipt/getPageReceipt?orderCriteria=createDate&`;
    api = api + `searchCriteria=tradeDate`
    api = api + ( companyName ? `${encodeURIComponent("&")}companyName` : "" )
    api = api + ( itemName ? `${encodeURIComponent("&")}item` : "" )
    api = api + `&searchWord=${startDate}~${endDate}`
    api = api + ( companyName ? `${encodeURIComponent("&"+companyName)}` : "" )
    api = api + ( itemName ? `${encodeURIComponent("&"+itemName)}` : "" )
  
    fetch(BACKENDURL+api,{
      headers:{
        "Authorization" : sessionStorage.getItem("token"),
      }
    })
    .then(res => {
      if(res.status === 200){
        return res.json();
      }
    })
    .then(data => {
      setTbRows('');
      setArr(data.content);
    })
    .catch(e => {
      console.log(e);
    })
  }

  return (
    <div className="w-full h-fit border border-black mb-2 rounded-xl shadow-md py-4 px-3">
      <p className="mb-3 border rounded-xl p-2 bg-custom-blue text-white">상세 검색</p>
      <div className="sm:w-[70%] text-[80%] sm:text-base p-2 grid items-center gap-4">
        <div className="sm:flex gap-2 items-center w-full">
          <p className="mb-2 w-[6rem]">거래 기간</p>
          <div className="flex gap-1 grow">
            <div className="h-10 w-[40%]"><CustomInput type={"date"} id={"startDate"} defaultValue={new Date(new Date(today) - 63113852000).toISOString().slice(0,10)}/></div>
            <div className="h-full text-2xl grow text-center">~</div>
            <div className="h-10 w-[40%]"><CustomInput type={"date"} id={"endDate"} defaultValue={today}/></div>
          </div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 w-[6rem]">업체명</p>
          <div className="h-10 grow"><CustomInput type={"text"} id={"companyName"}/></div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 w-[6rem]">물품명</p>
          <div className="h-10 grow"><CustomInput type={"text"} id={"itemName"}/></div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button onClick={handleClickSearchButton} className="mt-3 w-full sm:w-20 h-10 font-bol text-white"><CustomButton title={"검색"}/></button>
      </div>
    </div>
  )
}

export default ManageNav