import MainButton from '../component/mainpage/MainButton';
import UserList from '../component/mainpage/UserList';

const MainPage = () => {

  return (
    <main className='flex flex-col justify-center items-center'>
      <div className="flex justify-center items-center w-[100%] h-[100%] gap-12">
        <div className='w-[40%] h-[100%] '>
          <h1 className='text-2xl md:text-4xl m-10'>user1님 환영합니다!</h1>
          <UserList />
        </div>
        <div className="w-[40%] h-[40%]">
          <MainButton />
        </div>
      </div>
    </main>
  )
}

export default MainPage
