import MainButton from '../component/mainpage/MainButton';

const MainPage = () => {

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='h-[12%] font-extrabold text-center text-2xl md:text-3xl'>수기 영수증을 정리하고, 가계부도 작성해보세요
        <br />
        스마트가계부가 깔끔하게 처리할 수 있습니다!
      </h1>
      <div className='w-[40%] h-[55%] flex items-center gap-12 mt-16'>
        <div className="">
          <MainButton />
        </div>
      </div>
    </div>
  )
}

export default MainPage
