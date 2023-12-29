import { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton"
import TableRow from "./TableRow";
import { useRecoilState } from "recoil";
import { AtomIsLogin, AtomIsMobile, AtomTableRows, BACKENDURL } from "../common/Common";
import AddRows from "../../image/AddRows"
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import ChangeIcon from "../../image/ChangeReceiptIcon"

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

  const colName = ["거래일","업체명","물품","수량","단가","가격"];
  let totalData = [];
  const handleExportToExcel = () => {
    const rows = document.querySelectorAll("[id^=td]");
    rows.forEach(item => {
      let i = 0;
      let rowData = {};
      for(const cell of item.children){
        if(i >= 6) break;
        rowData[colName[i]] = cell.innerText;
        i = i + 1;
      }
      totalData.push(rowData);
    });

    const ws = XLSX.utils.json_to_sheet(totalData);
    const wb = XLSX.utils.book_new();
    const today = new Date().toISOString().slice(0,10);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${today}_YProject_Receipt_Data.xlsx`);
  }

  return (
    <div className="z-10 h-full flex gap-4 items-center my-2">
      <button onClick={handleButtonClick} className="w-32 sm:w-40 h-10 border rounded-xl justify-end items-center bg-custom-blue text-white flex">
        <div className="h-full w-[75%]">
          <CustomButton title={"행 추가하기"}/>
        </div>
        <div className="h-[90%] grow flex items-center"><AddRows/></div>
      </button>
      <button onClick={handleExportToExcel} className="w-32 sm:w-40 h-10 border rounded-xl justify-end items-center bg-custom-blue text-white flex">
        <div className="h-full w-[75%]">
          <CustomButton title={"엑셀 변환하기"}/>
        </div>
        <div className="h-[90%] grow flex items-center"><ChangeIcon/></div>
      </button> 
    </div>
  )
}

export default TableNav