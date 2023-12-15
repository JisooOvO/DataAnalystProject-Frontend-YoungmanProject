import React, { useState } from 'react'
import Header from '../component/Header';
import MainButton from '../component/mainpage/MainButton';

const MainPage = () => {

  return (
    <div className="w-full h-full mx-auto">
      <Header />
      <main className='w-full h-full flex flex-col items-center'>
        <h1 className='flex justify-center text-4xl p-[5rem]'>소개다 소개 소개개개개개개</h1>
        <div className="w-[50%] h-[50%] gap-4 grid sm:grid-cols-2 items-center justify-center gap-x-4` ">
          <MainButton />
          <MainButton />
          <MainButton />
          <MainButton />
        </div>
      </main>
    </div>
  )
}

export default MainPage
