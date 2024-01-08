import { useRecoilState } from "recoil";
import PhotoIcon from "../../image/PhotoIcon";
import CustomCircle from "../common/CustomCircle";
import { AtomViewImage, BACKENDURL } from "../common/Common";

const CardView = ({data}) => {
  const [viewImage, setViewImage] = useRecoilState(AtomViewImage);

  const handleShowImage = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("hidden");
    setViewImage(BACKENDURL+`/api/public/receipt/getReceiptImage?receiptDocumentId=${data[0].receiptDocumentId}`)
  }
  return (
    <div className="w-full border border-black shadow-md rounded-xl h-[20rem] p-4">
      <div className="flex gap-4 mb-3 bg-custom-blue p-2 text-white rounded-xl items-center">
          <p className="text-xl">{data ? data[0].companyName : ""}</p>
          <p>{data ? data[0].tradeDate.slice(0,10) : ""}</p>
      </div>
      <div className="w-full h-[60%] overflow-auto overflow-x-hidden">
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
                data.map((item,idx) =>
                  <tr key={`key${idx}`} id="item" className="h-12 w-full text-center">
                    <td className="w-[40%] h-full">{item.item}</td>
                    <td className="w-[20%] h-full">{item.unitPrice}</td>
                    <td className="w-[20%] h-full">{item.quantity}</td>
                    <td className="w-[20%] h-full">{item.price}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
      </div>
      <div className="w-full mt-5 flex gap-4 justify-end">
        <button onClick={handleShowImage} className="w-9 h-9"><CustomCircle svg={<PhotoIcon/>}/></button>
      </div>
    </div>
  )
}

export default CardView