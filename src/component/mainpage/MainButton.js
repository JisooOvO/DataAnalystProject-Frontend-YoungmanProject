import React from 'react'
import HandwrittenReceiptImage from "../../image/handwrittenReceipt.jpg"
import AccountBookImage from "../../image/AccountBook.jpg"
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
const MainButton = () => {


  const ImageReceipt = {
    src: HandwrittenReceiptImage,
    text: "수기 영수증 변환하기"
  }

  const ImageAccount = {
    src: AccountBookImage,
    text: "가계부 이미지"
  }

  const imagesData = [
    ImageReceipt,
    ImageAccount
  ];

  const navigate = useNavigate();

  const handleSelect = (currentIndex) => {
    switch (currentIndex) {
      case 0:
        navigate("/transform/add_receipt");
        break;
      case 1:
        navigate("/accountbook/add")
        break;
      default:
        break;
    }
  }

  return (
    <div className="p-10 text-2xl hover:cursor-pointer px-8 pt-6 text-center shadow-xl bg-[#EDA170] text-white font-bold border-2 border-[#EDA170] rounded-2xl">
      <Carousel images={imagesData} onSelect={handleSelect} />
    </div>
  )
}

export default MainButton
