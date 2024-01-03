import TableNav from "./TableNav";
import { useRecoilState } from "recoil";
import { AtomTableRows } from "../common/Common";
import Slash from "./Slash";

const ManageForm = () => {
 // eslint-disable-next-line 
  const [tbRows, setTbRows] = useRecoilState(AtomTableRows);
  return (
    <div className="border border-black w-full h-fit p-4 sm:p-5 rounded-xl shadow-md sm:text-base text-[70%]">
      <div className="w-full text-center my-5">
        <p>변환한 영수증 정보를 이 곳에서 확인할 수 있으며</p>
        <p>영수증 관련 정보를 입력하여 엑셀 파일로 변환이 가능합니다.</p>
      </div>
      <div className="h-20">
        <TableNav/>
      </div>
      <div className="w-[98%] h-[36rem] relative border border-black">
        <div className="w-full h-fit flex">
          <div style={{width : `calc(100% - 12px)`}} className="grid grid-cols-6 z-20">
            {
              ["거래일","업체명","물품","수량","단가","가격"]
              .map((item,idx)=>
                <div key={`key${idx}`} className="whitespace-nowrap h-16 flex justify-center border border-t-0 border-black border-l-0 items-center text-white font-bold bg-custom-blue">{item}</div>
              )
            }
          </div>
          <div className="w-[12px]">
            <Slash/>
          </div>
        </div>
        <div className="w-full h-[32rem] overflow-scroll overflow-x-hidden">
          {tbRows}
        </div>
      </div>
    </div>
  )
}

export default ManageForm