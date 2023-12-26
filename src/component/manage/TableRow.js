import { useEffect, useState } from "react";
import CustomCircle from "../common/CustomCircle";
import AddIcon from "../../image/AddIcon"
import DeleteIcon from "../../image/DeleteIcon"
import { useRecoilState } from "recoil";
import { AtomTableRows, BACKENDURL } from "../common/Common";

const TableRow = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [tbRows, setTbRows] = useRecoilState(AtomTableRows);

  const handleClick = (e) => {
    const targetElem = e.target.parentElement;
    const button = targetElem.lastChild;
    const buttons = document.querySelectorAll("#buttons");
    const tds = document.querySelectorAll("#td");
    const saveBt = document.querySelectorAll("#saveBt");
    tds.forEach(item => item.classList.remove("bg-gray-300"));
    targetElem.classList.add("bg-gray-300");
    saveBt.forEach(item => {
        item.classList.remove("bg-gray-300");
        item.classList.add("bg-custom-blue");
    });
    buttons.forEach(item => item.classList.add("opacity-0"));
    button.classList.remove("opacity-0");
  }

  const handleDoubleClick = (e) => {
    setIsTyping(true);
    let targetElem = e.target;
    const txt = targetElem.textContent;
    targetElem.innerHTML = 
        `<input id="tableInput" class="w-full h-16 text-center" type="text"/>`
    const tableInput = document.querySelector("#tableInput");
    tableInput.focus();
    tableInput.value = txt;
  }

  useEffect(()=>{
    const tableInput = document.querySelector("#tableInput");
    if(!tableInput || !isTyping) return;
    tableInput.addEventListener('blur',()=>{
        const text = tableInput.value;
        const tds = document.querySelectorAll("#td");
        const saveBt = document.querySelectorAll("#saveBt");
        saveBt.forEach(item => {
            item.classList.add("bg-custom-blue");
            item.classList.remove("bg-gray-300");
        });
        tds.forEach(item => item.classList.remove("bg-gray-300"));    
        tableInput.parentElement.textContent = text;
        setIsTyping(false);
    });
  },[isTyping])

  const handleSave = (e) => {
    const targetElem = e.target.closest("#td");
    const arr = targetElem.innerText.split("\n");
    const body = JSON.stringify({
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
        if(res.status === 200) alert("저장되었습니다.");
    })
    .catch(e => {
        console.log(e);
        alert("데이터 전송 중 에러 발생");
    })
  }

  const handleDelete = (e) => {
    const targetElem = e.target.closest("#td");
    const tds = document.querySelectorAll("#td");
    let targetCnt = 0;
    for(let td of tds){
        if(td !== targetElem) targetCnt = targetCnt + 1
        else break;
    }
    
    const newArr = tbRows.slice().filter((item,idx) => idx !== targetCnt);
    setTbRows(newArr);
  }

  return (
    <div
    id="td"
    className="relative grid grid-cols-6"
    onClick={handleClick}
    onDoubleClick={handleDoubleClick}>
        {[0,1,2,3,4,5].map((item) =>
          <div key={`tdKey${item}`}
          tabIndex={0}
          className="border text-center border-l-0 flex justify-center items-center border-black border-t-0 min-h-[4.2rem]">
          </div>
        )}
        <div id="buttons" className="absolute flex gap-2 right-2 bottom-2 opacity-0">
            <div className="w-9 h-9 right-2 bottom-2 z-10 rounded-[50%]"><CustomCircle id={"saveBt"} func={handleSave} svg={<AddIcon/>}/></div>
            <div className="w-9 h-9 right-2 bottom-2 z-10 rounded-[50%]"><CustomCircle id={"deleteBt"} func={handleDelete} svg={<DeleteIcon/>}/></div>
        </div>
    </div>
  )
}

export default TableRow