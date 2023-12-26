import { useEffect } from "react";
import CustomButton from "../common/CustomButton"
import TableRow from "./TableRow";
import { useRecoilState } from "recoil";
import { AtomCount, AtomIsMobile, AtomTableRows } from "../common/Common";
import CustomCircle from "../common/CustomCircle";
import AddRows from "../../image/AddRows"

const TableNav = () => {
  // eslint-disable-next-line
  const [tbrows, setTbRows] = useRecoilState(AtomTableRows);
  const [count, setCount] = useRecoilState(AtomCount);
  // eslint-disable-next-line
  const [isMobile, setIsMobile] = useRecoilState(AtomIsMobile);

  const handleButtonClick = () => {
    setCount(item => item = item + 1);
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
    setTbRows((prevItem)=>[...prevItem,<TableRow key={`trkey${count}`}/>]);
    // eslint-disable-next-line
  },[count])

  return (
    <div className="z-10 h-full flex items-center">
      { isMobile ?
          <div className="w-9 h-9 relative" 
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <CustomCircle svg={<AddRows/>} func={handleButtonClick}/>
            <div id="addBt" className="hidden absolute top-[7px] right-[-60px] font-bold text-gray-500 text-sm">추가하기</div>
          </div>
        :
          <div className="w-40 h-12 border rounded-xl justify-center items-center bg-custom-blue text-white font-bold my-2 flex">
            <div className="h-[90%] grow flex justify-end items-center"><AddRows/></div>
            <div className="h-full w-[70%]">
              <CustomButton title={"행 추가하기"} func={handleButtonClick}/>
            </div>
          </div>    
      }
    </div>
  )
}

export default TableNav