import { useState } from "react";
import CustomCircle from "../common/CustomCircle";
import CloseIcon from "../../image/CloseIcon";
import { AtomViewImage, BACKENDURL } from "../common/Common";
import { useRecoilState } from "recoil";

const ModalImage = () => {
  const [viewImage, setViewImage] = useRecoilState(AtomViewImage);
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (m) => {
    const mouseMoveHandler = (e) => {
      const deltaX = e.screenX - m.screenX;
      const deltaY = e.screenY - m.screenY;
    
      setPosition({
        x: x + deltaX,
        y: y + deltaY,
      });
    };
    
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
    
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  const handleExit = () => {
    const modal = document.querySelector("#modal");
    modal.classList.add("hidden");
  }

  const handleClick = () => {
    window.open(viewImage);
  }

  return (
    <div id="modal" onMouseDown={handleMouseDown} style={{ transform: `translateX(${x}px) translateY(${y}px)` }} 
    className="hidden border bg-gray-200  w-[80%] max-w-[30rem] h-[40rem] p-3 rounded-xl shadow-xl absolute top-[50%] left-10 z-[9999]">
      <div className="w-full bg-custom-blue text-white h-14 flex items-center rounded-xl p-2 pl-4 justify-between border-custom-blue shadow-inner drop-shadow-md">
        <p>영수증 사진 정보</p>
        <button onClick={handleExit} className="w-9 h-9 flex items-center justify-center bg-gray-400 hover:opacity-70 rounded-[50%] border">
          <CloseIcon/>
        </button>
      </div>
      <div className="flex h-[85%] justify-center w-full mt-5">
        {
          viewImage ?
            <img onClick={handleClick} draggable={false} src={viewImage} alt="영수증 사진 정보" 
            className="hover:scale-105 hover:cursor-pointer"/>
          :
            <div className="w-full h-[80%] mt-5 flex flex-col items-center justify-center">
              <p>해당 아이템과 일치하는</p>
              <p>영수증 사진 정보가 없습니다.</p>
            </div>
        }
      </div>
    </div>
  )
}

export default ModalImage