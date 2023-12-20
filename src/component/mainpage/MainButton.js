import React from 'react'
import HandwrittenReceiptImage from "../../image/handwrittenReceipt.jpg"
import AccountBookImage from "../../image/AccountBook.jpg"
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
const MainButton = () => {

  const imagesData = [
    {
    src : HandwrittenReceiptImage,
    text : "수기 영수증 변환하기"
    },
    {
      src : AccountBookImage,
      text : "가계부 이미지"
    }
  ];

  const navigate = useNavigate();


  return (      
      <div className="p-10 text-2xl hover:cursor-pointer px-8 pt-6 text-center shadow-xl bg-[#EDA170] text-white font-bold border-2 border-[#EDA170] rounded-2xl">
        <Carousel images={imagesData} 
        
        />
      </div>
  )
}

export default MainButton
