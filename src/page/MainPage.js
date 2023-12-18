import MainButton from '../component/mainpage/MainButton';

const MainPage = () => {

  return (
    <main className='w-full h-full flex flex-col items-center'>
      <h1 className='w-full h-[10%] flex justify-center items-center text-2xl md:text-4xl m-10'>웹 사이트 소개글 적기</h1>
      <div id='gridContainer' className="w-[70%] h-[50%] gap-4 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-x-4` ">
        <MainButton />
        <MainButton />
        <MainButton />
        <MainButton />
      </div>
    </main>
  )
}

export default MainPage
