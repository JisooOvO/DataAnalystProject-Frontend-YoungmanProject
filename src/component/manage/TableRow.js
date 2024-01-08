import { useEffect, useState } from "react";
import CustomCircle from "../common/CustomCircle";
import AddIcon from "../../image/AddIcon"
import DeleteIcon from "../../image/DeleteIcon"
import { useRecoilState } from "recoil";
import { AtomTableRows, AtomViewImage, BACKENDURL } from "../common/Common";
import PhotoIcon from "../../image/PhotoIcon"

const TableRow = ({dId,dCompanyName,dItem,dQuantity,dTradeDate,dUnitPrice,dPrice,dreceiptDocumentId}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [tbRows, setTbRows] = useRecoilState(AtomTableRows);
  const [viewImage, setViewImage] = useRecoilState(AtomViewImage);
  const arr = [dId,dTradeDate,dCompanyName,dItem,dQuantity,dUnitPrice,dPrice];
  const option = {
    maximumFractionDigits: 4
  };
  
  const handleClick = (e) => {
    const targetElem = e.target.parentElement;
    const button = targetElem.lastChild;
    const buttons = document.querySelectorAll("#buttons");
    const tds = document.querySelectorAll("[id^=td]");
    const saveBt = document.querySelectorAll("#saveBt");
    const deleteBt = document.querySelectorAll("#deleteBt");
    tds.forEach(item => item.classList.remove("bg-gray-300"));
    targetElem.classList.add("bg-gray-300");
    saveBt.forEach(item => {
        item.classList.remove("bg-gray-300");
    });
    deleteBt.forEach(item=>{
      item.classList.remove("bg-gray-300");
    })
    buttons.forEach(item => item.classList.add("hidden"));
    button.classList.remove("hidden");
  }

  const handleDoubleClick = (e) => {
    setIsTyping(true);
    let targetElem = e.target;    
    const txt = targetElem.textContent;
    targetElem.innerHTML = `<input id="tableInput" class="w-full border border-black h-[2rem] text-center" type="${targetElem.id}" />`;
    const tableInput = document.querySelector("#tableInput");
    tableInput.focus();
    tableInput.addEventListener('blur',()=>{
      targetElem.classList.remove("bg-gray-300");
    })
    tableInput.value = txt;
  }

  const handleKeyDown = (e) => {
    let targetElem = e.target;  
    if(e.code !== "Tab" && e.code !== "Enter"){
      setIsTyping(true);
      targetElem.innerHTML = `<input id="tableInput" class="w-full border border-black h-[2rem] text-center" type="${targetElem.id}" />`;
      const tableInput = document.querySelector("#tableInput");
      tableInput.focus();
    }
   }

  useEffect(()=>{
    const tableInput = document.querySelector("#tableInput");
    if(!tableInput || !isTyping) return;
    tableInput.addEventListener('blur',()=>{
      const text = tableInput.value;
      const tds = document.querySelectorAll("[id^=td]");
      const saveBt = document.querySelectorAll("#saveBt");
      const deleteBt = document.querySelectorAll("#deleteBt");
      saveBt.forEach(item => {    
          item.classList.remove("bg-gray-300");
      });
      deleteBt.forEach(item=>{
        item.classList.remove("bg-gray-300");    
      });
      tds.forEach(item => item.classList.remove("bg-gray-300"));    
      tableInput.parentElement.textContent = text;
      setIsTyping(false);
    });
  },[isTyping])

  const handleSave = (e) => {
    const targetElem = e.target.closest("[id^=td]");
    const arr = targetElem.innerText.split("\n");
    let canSave = true;
    arr.forEach(item => {
      if(!item) {
        canSave = false;
        return;
    }})
    if(!canSave){
      alert("미 입력된 항목이 존재합니다.");
      return;
    }
    let receiptId = null;
    if(targetElem.id !== "td") receiptId = targetElem.id.slice(2);
    const body = JSON.stringify({
      "receiptId" : receiptId,
      "tradeDate" : new Date(arr[0]),
      "companyName" : arr[1],
      "item" : arr[2],
      "quantity" : arr[3],
      "unitPrice" : arr[4],
      "price" : arr[5],
    })
    
    fetch(BACKENDURL+"/api/private/receipt/saveReceipt",{
      method:"post",
      headers: {
          "Authorization" : sessionStorage.getItem("token"),
          "Content-Type" : "application/json",
      },
      body : body
    })
    .then(res => {
      if(res.status === 200) {
        alert("저장되었습니다.");
        return res.text();
      }
    })
    .then(data => {
      targetElem.id = "td" + data;
    })
    .catch(e => {
      console.log(e);
      alert("데이터 전송 중 에러 발생");
    })
  }

  const handleDelete = (e) => {
    const targetElem = e.target.closest("[id^=td]");
    const tds = document.querySelectorAll("[id^=td]");
    console.log(targetElem.id.slice(2));
    let targetCnt = 0;
    if(targetElem.id !== "td"){
      const result = window.confirm("해당 영수증 데이터를 데이터베이스에서 영구삭제하시겠습니까?");
      if(!result) return;
      fetch(BACKENDURL+"/api/private/receipt/deleteReceipt",{
        method: "delete",
        headers: {
          "Authorization" : sessionStorage.getItem("token"),
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          "receiptId" : targetElem.id.slice(2),
        })
      })
      .then(res => {
        if(res.status === 200) {
          alert("삭제되었습니다.");
          for(let td of tds){
            if(td !== targetElem) targetCnt = targetCnt + 1
            else break;
          } 
          const newArr = tbRows.slice().filter((item,idx) => idx !== targetCnt);
          setTbRows(newArr);
        }else{
          alert("데이터 전송 중 에러 발생");
        }
      })
      .catch(e => {
        console.log(e);
        alert("데이터 전송 중 에러 발생");
      })
    }
    else{
      for(let td of tds){
        if(td !== targetElem) targetCnt = targetCnt + 1
        else break;
      }
      
      const newArr = tbRows.slice().filter((item,idx) => idx !== targetCnt);
      setTbRows(newArr);
    }
  }

  const handleShowReceiptImage = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("hidden");
    if(dreceiptDocumentId)
      setViewImage(BACKENDURL+`/api/public/receipt/getReceiptImage?receiptDocumentId=${dreceiptDocumentId}`)
    else
      setViewImage("");
  }

  return (
    <div
    id= { arr[0] === undefined ? "td" : "td"+arr[0] }
    className="relative grid grid-cols-6"
    onClick={handleClick}
    onDoubleClick={handleDoubleClick}>
      {["date","text","text","number","number","number"].map((item,idx) => {
        return ( 
          <div key={`tdKey${idx}`}
          id={item}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="border text-center border-l-0 flex justify-center items-center border-black border-t-0 min-h-[3rem]">
            {arr[idx+1] ? arr[idx+1].toLocaleString('ko-KR', option) : ""}
          </div>
      )})}
      <div id="buttons" className="absolute flex gap-2 right-2 -bottom-8 hidden">
        <div className="w-9 h-9 right-2 bottom-2 z-10 rounded-[50%]"><CustomCircle id={"saveBt"} func={handleShowReceiptImage} svg={<PhotoIcon/>}/></div>
        <div className="w-9 h-9 right-2 bottom-2 z-10 rounded-[50%]"><CustomCircle id={"saveBt"} func={handleSave} svg={<AddIcon/>}/></div>
        <div className="w-9 h-9 right-2 bottom-2 z-10 rounded-[50%]"><CustomCircle id={"deleteBt"} func={handleDelete} svg={<DeleteIcon/>}/></div>
      </div>
    </div>
  )
}

export default TableRow