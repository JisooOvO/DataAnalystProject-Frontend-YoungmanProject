import { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton"
import TableRow from "./TableRow";
import { useRecoilState } from "recoil";
import { AtomIsLogin, AtomIsMobile, AtomTableRows, BACKENDURL } from "../common/Common";
import CustomCircle from "../common/CustomCircle";
import AddRows from "../../image/AddRows"
import { useNavigate } from "react-router-dom";

const TableNav = () => {
  // eslint-disable-next-line
  const [tbrows, setTbRows] = useRecoilState(AtomTableRows);
  // eslint-disable-next-lin
  const [isMobile, setIsMobile] = useRecoilState(AtomIsMobile);
  const [arr, setArr] = useState([]);
  const [isLogin, setIsLogin] = useRecoilState(AtomIsLogin);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setArr((prevItem) => [...prevItem, []])
  }

  const handleMouseEnter = (e) => {
    const targetElem = document.querySelector("#addBt");
    targetElem.classList.remove("hidden");
  }

  const handleMouseLeave = (e) => {
     const targetElem = document.querySelector("#addBt");
    targetElem.classList.add("hidden");
  }

  useEffect(()=>{
    setTbRows('');
    fetch(BACKENDURL+"/api/private/receipt/getPageReceipt",{
      method : "get",
      headers : {
        "Authorization" : sessionStorage.getItem("token"),
        "Content-Type" : "application/json",
      }
    })
    .then(res => {
      if(res.status === 200){
        return res.json();
      }else{
        alert("데이터 전송 중 에러 발생");
      }
    })
    .then(data => {
      data.content = data.content.reverse();
      setArr(data.content);
    })
    .catch(e => {
      console.log(e);
    })
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(arr.length !== 0){
      arr.map((item,idx) => 
        setTbRows((prevItem)=>[...prevItem,
        <TableRow key={`trkey${Math.random()}`} 
        dId={item.receiptId} 
        dCompanyName={item.companyName}
        dItem={item.item}
        dQuantity={item.quantity}
        dTradeDate={item.tradeDate ? item.tradeDate.slice(0,10) : ''}
        dUnitPrice={item.unitPrice}
        dPrice={item.price}/>])
      )
      arr.length = 0;
    }
  },[arr])

  return (
    <div className="z-10 h-full flex items-center">
      { isMobile ?
          <div className="w-9 h-9 relative" 
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <CustomCircle svg={<AddRows/>} func={handleButtonClick}/>
            <div id="addBt" className="hidden absolute top-[7px] right-[-75px] font-bold text-gray-500 text-sm">행 추가하기</div>
          </div>
        :
          <button onClick={handleButtonClick} className="w-40 h-10 border rounded-xl justify-end items-center bg-custom-blue text-white font-bold my-2 flex">
            <div className="h-full w-[75%]">
              <CustomButton title={"행 추가하기"}/>
            </div>
            <div className="h-[90%] grow flex items-center"><AddRows/></div>
          </button>    
      }
    </div>
  )
}

export default TableNav