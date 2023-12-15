import MainButton from '../component/mainpage/MainButton';

const MainPage = () => {

  return (
    <div className="w-full h-full mx-auto">
      <main className='w-full h-full flex flex-col items-center'>
        <h1 className='flex justify-center text-4xl pt-10 pb-20'>여기다가 웹 사이트 소개글 적기</h1>
        <div className="w-[50%] h-[50%] gap-4 grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-x-4` ">
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
