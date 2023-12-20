import React from 'react'
import ExampleImage from '../../image/loginBackgroundImg.png'
const MainButton = () => {
  return (
    <div className="">
      <div className="bg-[#EDA170] text-white font-bold border-2 pt-4 pl-4 border-[#EDA170] rounded-2xl w-full h-full">
        <img className='w-[90%] h-[80%]' src={ExampleImage} />
        수기 영수증 변환하기
      </div>
      <div className="bg-[#EDA170] text-white font-bold border-2 pt-4 pl-4 border-[#EDA170] rounded-2xl w-full h-full">
        <img className='w-[90%] h-[80%]' src={ExampleImage} />
        가계부 작성하기
      </div>
    </div>
  )
}

export default MainButton
