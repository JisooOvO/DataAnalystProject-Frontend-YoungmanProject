import React, { useState } from 'react'
import HandwrittenReceiptImage from "../../image/handwrittenReceipt.jpg"
import AccountBookImage from "../../image/AccountBook.jpg"
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import Arrow from './Arrow'
const MainButton = () => {


  const ImageReceipt = {
    src: HandwrittenReceiptImage,
    text: "수기 영수증 변환하기"
  }

  const ImageAccount = {
    src: AccountBookImage,
    text: "가계부 이미지"
  }

  const imagesData = [ ImageReceipt, ImageAccount ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const handleSelect = (index) => {
    setCurrentIndex(index);
    switch (index) {
      case 0:
        navigate("/transform/add_receipt");
        break;
      case 1:
        navigate("/accountbook/add")
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : imagesData.length - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex < imagesData.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <div className="relative flex justify-center text-md sm:text-2xl hover:cursor-pointer px-4 pt-3 md:px-8 md:pt-6 text-center shadow-xl bg-[#EDA170] text-white font-bold border-2 border-[#EDA170] rounded-2xl">
      <Arrow direction="left" onClick={handlePrevClick}  />
      <Carousel images={imagesData} currentIndex={currentIndex} onSelect={handleSelect} />
      <Arrow direction="right" onClick={handleNextClick} />
    </div>
  )
}

export default MainButton
