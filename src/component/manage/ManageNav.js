import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput"
import { AtomCardView, AtomChangeTable, AtomSearchDataRows, AtomTableRows, BACKENDURL } from "../common/Common"
import { useRecoilState } from "recoil";
import CardView from "./CardView";

const ManageNav = () => {
  const today = new Date().toISOString().slice(0,10);
  const [arr, setArr] = useRecoilState(AtomSearchDataRows);
  const [tbRows, setTbRows] = useRecoilState(AtomTableRows);
  const [isTable, setIsTable] = useRecoilState(AtomChangeTable);
  const [cardView, setCardView] = useRecoilState(AtomCardView);
  
  const handleClickSearchButton = () => {
    const startDate = document.querySelector("#startDate").value;
    const endDate = document.querySelector("#endDate").value;
    const companyName = document.querySelector("#companyName").value;
    const itemName = document.querySelector("#itemName").value;
    const pageSize = document.querySelector("#pageSize").value;

    let api = `/api/private/receipt/getPageReceipt?orderCriteria=createDate&pageSize=${pageSize}&`;
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
      data.content = data.content.reverse();
      if(isTable){
        setTbRows('');
        setArr(data.content);  
      }else{
        setCardView('');
        const receiptMap = new Map();
        data.content.map(item => {
          if(item.receiptDocumentId){
            if(!receiptMap.has(item.receiptDocumentId))
              receiptMap.set(item.receiptDocumentId, [item])
            else
              receiptMap.get(item.receiptDocumentId).push(item);
          }
        })
        receiptMap.forEach((item,idx) => {
          setCardView(prevItem => [...prevItem, <CardView key={`key${idx}`} data={item}/>])
        })
  
      }
    })
    .catch(e => {
      console.log(e);
    })
    
  }

  const handleChangeTable = (flag) => {
    setIsTable(flag);
  }

  return (
    <div className="w-full h-fit border border-black mb-2 rounded-xl shadow-md py-4 px-3">
      <p className="mb-3 border rounded-xl p-2 bg-custom-blue text-white">상세 검색</p>
      <div className="sm:w-[70%] text-[80%] sm:text-base p-2 grid items-center gap-4">
        <div className="sm:flex gap-2 items-center w-full">
          <p className="mb-2 sm:mb-0 w-[10rem]">거래 기간</p>
          <div className="flex gap-1 grow">
            <div className="h-10 w-[40%]"><CustomInput type={"date"} id={"startDate"} defaultValue={new Date(new Date(today) - 63113852000).toISOString().slice(0,10)}/></div>
            <div className="h-full text-2xl grow text-center">~</div>
            <div className="h-10 w-[40%]"><CustomInput type={"date"} id={"endDate"} defaultValue={today}/></div>
          </div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 sm:mb-0 w-[10rem]">업체명</p>
          <div className="h-10 grow"><CustomInput type={"text"} id={"companyName"}/></div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 sm:mb-0 w-[10rem]">물품명</p>
          <div className="h-10 grow"><CustomInput type={"text"} id={"itemName"}/></div>
        </div>
        <div className="sm:flex gap-2 items-center">
          <p className="mb-2 sm:mb-0 w-[10rem]">검색 물품 수</p>
          <div className="h-10 grow"><CustomInput type={"number"} defaultValue={10} id={"pageSize"}/></div>
        </div>
      </div>
      <div className="sm:flex sm:justify-between w-full">
        <div className="flex gap-4">
          <button onClick={()=>{handleChangeTable(true)}} className="mt-3 w-full sm:w-44 font-bold h-10 font-bol text-white"><CustomButton title={"테이블 형태로 보기"}/></button>
          <button onClick={()=>{handleChangeTable(false)}} className="mt-3 w-full sm:w-44 font-bold h-10 font-bol text-white"><CustomButton title={"카드 형태로 보기"}/></button>
        </div>
        <button onClick={handleClickSearchButton} className="mt-3 w-full sm:w-40 font-bold h-10 font-bol text-white"><CustomButton title={"검색"}/></button>
      </div>
    </div>
  )
}

export default ManageNav