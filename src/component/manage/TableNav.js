import { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton"
import TableRow from "./TableRow";
import { useRecoilState } from "recoil";
import { AtomIsLogin, AtomSearchDataRows, AtomTableRows, BACKENDURL } from "../common/Common";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

const TableNav = () => {
  // eslint-disable-next-line
  const [tbrows, setTbRows] = useRecoilState(AtomTableRows);
  const [arr, setArr] = useRecoilState(AtomSearchDataRows);
  const [isLogin, setIsLogin] = useRecoilState(AtomIsLogin);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setArr((prevItem) => [...prevItem, []])
  }

  useEffect(()=>{

    if(!sessionStorage.getItem("token")){
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
    }

    if(sessionStorage.getItem("role") === "[ROLE_WAITING]"){
      alert("승인되지 않은 사용자입니다.");
      navigate("/");
    }

    setTbRows('');

    fetch(BACKENDURL+"/api/private/receipt/getPageReceipt?orderCriteria=createDate",{
      method : "get",
      headers : {
        "Authorization" : sessionStorage.getItem("token"),
        "Content-Type" : "application/json",
      }
    })
    .then(res => {
      if(res.status === 200){
        return res.json();
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
        dPrice={item.price}
        dreceiptDocumentId={item.receiptDocumentId}/>])
      )
      setArr([]);

      for(let i = 0 ; i < 10 ; i = i+1){
        setTbRows((prevItem)=>[...prevItem,
          <TableRow key={`trkey${Math.random()}`}/>
        ])
      }  

    }
    // eslint-disable-next-line
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
    <div className="z-10 h-full flex gap-4 items-center my-2 w-full justify-center sm:justify-start">
      <button onClick={handleButtonClick} className="h-10 w-36 font-bold text-white">
        <CustomButton title={"행 추가하기"}/>
      </button>
      <button onClick={handleExportToExcel} className="h-10 w-36 font-bold text-white">
        <CustomButton title={"엑셀 변환하기"}/>
      </button> 
    </div>
  )
}

export default TableNav