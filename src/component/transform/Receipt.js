import CustomButton from "../../component/common/CustomButton"
import { BACKENDURL } from "../../component/common/Common"

const Receipt = ({data}) => {
  let count = 0;
  let totalPrice = 0;
  const option = {
    maximumFractionDigits: 4
  };

  const handleSaveButtonClick = () => {
    const itemNames = document.querySelectorAll("#itemName");
    const unitPrices = document.querySelectorAll("#unitPrice");
    const quantitys = document.querySelectorAll("#quantity");
    const prices = document.querySelectorAll("#price");
    const comapanyName = document.querySelector("#comapanyName");
    const tradeDate = document.querySelector("#tradeDate");
    
    const arr = []

    if(comapanyName.value === ""){
      alert("거래처를 입력하세요.");
      return;
    }

    if(tradeDate.value === ""){
      alert("거래일자를 입력하세요.");
      return;
    }

    for (let i = 0 ; i < itemNames.length ; i ++){
      let targetItem = {
        "companyName" : comapanyName.value,
        "item" : itemNames[i].value,
        "quantity" : +quantitys[i].value,
        "unitPrice" : +unitPrices[i].value.replace(",",""),
        "price" : +prices[i].value.replace(",",""),
        "tradeDate" : new Date(tradeDate.value),
        "receiptId" : data[i]["receiptId"],
        "receiptDocumentId" : data[i]["receiptDocumentId"],
      }

      if(Number.isNaN(targetItem["price"]) || Number.isNaN(targetItem["quantity"]) || Number.isNaN(targetItem["unitPrice"])){
        alert("유효하지 않은 숫자 양식이 존재합니다.");
        return;
      }
      arr.push(targetItem);
    }

    fetch(BACKENDURL+"/api/private/receipt/saveListReceipt",{
      method: "post",
      headers: {
        "Authorization" : sessionStorage.getItem("token"),
        "Content-type" : "application/json",
      },
      body: JSON.stringify(arr)
    })
    .then(res => {
      if(res.status === 200) alert("저장되었습니다.");
      else res.json();
    })
    .catch(e => {
      console.log(e);
    })
  }

  return (
    <div className="w-full h-full flex flex-col mt-20 items-center p-5">
        <p className="text-2xl tracking-widest mb-10">전자영수증</p>
        <div className="w-full justify-end flex items-center gap-4 mb-5">
            <p className="w-20">거래처 :</p>
            <input id="comapanyName" type="text" className="border p-4  border-black rounded-xl shadow-inner w-[80%] h-12" 
            placeholder="거래처를 입력하세요"/>
        </div>
        <div className="w-full justify-end flex items-center gap-4">
            <p className="w-20">거래일자 :</p>
            <input id="tradeDate" type="date" className="border p-4 border-black rounded-xl shadow-inner w-[80%] h-12" 
            defaultValue={data ? data[0]["tradeDate"].slice(0,10) : ""}/>
        </div>
        <div className="h-fit w-full mt-10">
          <table className="w-full">
            <thead>
              <tr className="border-x-0 border-4 border-double h-12 border-black w-full">
                <th>품목</th>
                <th>단가</th>
                <th>수량</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody className="w-full border border-black border-x-0 border-t-0">
              {
                data ? data.map((item,idx) => {
                  if(item["item"])
                  return(
                  <tr key={`key${idx}`} id="item" className="h-12 w-full">
                    <td className="w-[40%] h-full">
                      <input id="itemName" type="text" defaultValue={item["item"]} className="w-full h-full text-center"/>
                    </td>
                    <td className="w-[20%] h-full">
                      <input id="unitPrice" type="text" defaultValue={item["unitPrice"]} className="w-full h-full text-center"/>
                    </td>
                    <td className="w-[20%] h-full">
                      <input id="quantity" type="text" defaultValue={item["quantity"]} className="w-full h-full text-center"/>
                    </td>
                    <td className="w-[20%] h-full">
                      <input id="price" type="text" defaultValue={item["price"]} className="w-full h-full text-center"/>
                    </td>
                  </tr> 
                )})
                : 
                <tr className="h-12 w-full">
                  <td></td>
                </tr>
              }
            </tbody>
            <tfoot className="h-12">
              <tr className="text-center">
                <td className="flex gap-4 w-full justify-center items-center h-12">
                  <span className="border border-black h-2 border-x-0 w-[20%]"></span>
                  <p className="whitespace-nowrap">판매소계</p>
                  <span className="border border-black h-2 border-x-0 w-[20%]"></span>
                </td>
                <td><input type="text" defaultValue={data ? data.length + "건" : ""} className="text-center w-full"/></td>
                <td>{data ? data.map((item,idx) => {
                  count = count + Number(+item["quantity"]);
                  if(idx !== data.length - 1) return null;
                  return <input key={`key${idx}`} type="text" defaultValue={!Number.isNaN(count) ? count : ""} className="w-full text-center"/>;
                }):""}</td>
                <td>{data ? data.map((item,idx) => {
                  if(item["price"]) totalPrice = totalPrice + Number(item["price"].replace(",",""));
                  if(idx !== data.length - 1) return null;
                  return <input key={`key${idx}`} type="text" defaultValue={!Number.isNaN(totalPrice) ? totalPrice.toLocaleString('ko-KR', option) : "" } className="w-full text-center"/>;
                }):""}</td>
              </tr>
            </tfoot>
          </table>
          <p className="mt-5 text-center">클릭하여 전자영수증의 내용을 수정하실 수 있습니다.</p>
          <p className="text-center">영수증의 정보가 일치하면 하단의 저장 버튼을 눌러 저장하세요</p>
          <button onClick={handleSaveButtonClick} className="w-full h-12 mt-5 font-bold text-white">
            <CustomButton title={"저장하기"}/>
          </button>
        </div>
    </div>
  )
}

export default Receipt