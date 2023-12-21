import MainButton from '../component/mainpage/MainButton';

const MainPage = () => {

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='h-[12%] font-extrabold text-center text-sm sm:text-2xl'>수기 영수증을 정리하고, 매출 분석도 해보세요
        <br />
        스마트영수증이 확실하게 도와드리겠습니다!
      </h1>
      <div className='flex items-center gap-12 mt-16'>
        <div className="">
          <MainButton />
        </div>
      </div>
    </div>
  )
}

export default MainPage
