import TableNav from "./TableNav";
import { useRecoilState } from "recoil";
import { AtomTableRows } from "../common/Common";

const ManageForm = () => {
 // eslint-disable-next-line 
  const [tbRows, setTbRows] = useRecoilState(AtomTableRows);
  return (
    <div className="border border-black w-full h-[45rem] p-4 sm:p-5 rounded-xl shadow-md sm:text-base text-[70%]">
      <div className="h-20">
        <TableNav/>
      </div>
      <div className="w-[98%] h-[36rem] relative">
        <div className="w-full flex">
          <div style={{width : `calc(100% - 12px)`}} className="grid grid-cols-6 z-20">
            {
              ["거래일","업체명","물품","수량","단가","가격"]
              .map((item,idx)=>
                <div key={`key${idx}`} className="whitespace-nowrap border border-black border-r-0 h-16 flex justify-center items-center text-white font-bold bg-custom-blue">{item}</div>
              )
            }
          </div>
          <div className="w-[12px] bg-[#575c77] flex justify-center items-center"></div>
        </div>
        <div className="w-full h-[32rem] overflow-scroll overflow-x-hidden border border-black border-t-0 border-r-0">
          {tbRows}
        </div>
      </div>
    </div>
  )
}

export default ManageForm