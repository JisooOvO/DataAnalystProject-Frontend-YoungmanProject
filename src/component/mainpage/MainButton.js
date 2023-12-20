import React from 'react'
import ExampleImage from '../../image/loginBackgroundImg.png'
const MainButton = () => {
  return (
    <div className="flex flex-col gap-4 mt-16 shadow-xl">
      <div className=" bg-[#EDA170] text-white font-bold border-2 py-4 pl-10 border-[#EDA170] rounded-2xl w-full h-full">
        <img className='w-[90%] h-[70%]' src={ExampleImage} />
        수기 영수증 변환하기
      </div>
      <div className="bg-[#EDA170] text-white font-bold border-2 py-4 pl-10 border-[#EDA170] rounded-2xl w-full h-full">
        <img className='w-[90%] h-[70%]' src={ExampleImage} />
        가계부 작성하기
      </div>
    </div>
  )
}

export default MainButton
