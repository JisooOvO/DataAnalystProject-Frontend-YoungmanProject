import React, { useState } from 'react'
import Header from '../component/Header';
import MainButton from '../component/MainButton';

const MainPage = () => {

  return (
    <div className="max-w-[1920px] mx-auto">
      <Header />
      <main className='h-screen px-60'>
        <h1 className='flex justify-center'>소개다 소개 소개개개개개개</h1>
        <div></div>
        <div className="grid grid-cols-2 place-items-center w-[45rem] gap-4">
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
