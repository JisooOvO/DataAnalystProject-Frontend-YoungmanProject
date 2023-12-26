import { useEffect } from "react";
import CustomButton from "../common/CustomButton"
import TableRow from "./TableRow";
import { useRecoilState } from "recoil";
import { AtomCount, AtomTableRows } from "../common/Common";

const TableNav = () => {
  const [tbrows, setTbRows] = useRecoilState(AtomTableRows);
  const [count, setCount] = useRecoilState(AtomCount);

  const handleButtonClick = () => {
    setCount(item => item = item + 1);
  }

  useEffect(()=>{
    setTbRows((prevItem)=>[...prevItem,<TableRow key={`trkey${count}`}/>]);
    // eslint-disable-next-line
  },[count])

  return (
    <div className="z-10">
      {
        ["추가하기"].map((item,idx) =>
          <div key={`key${idx}`} className="w-32 h-12 border rounded-xl text-white font-bold m-2">
            <CustomButton title={item} id={`tableNavButton${idx}`} func={handleButtonClick}/>
          </div>
        )
      }
    </div>
  )
}

export default TableNav