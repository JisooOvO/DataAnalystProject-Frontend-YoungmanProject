import MainButton from '../component/mainpage/MainButton';
import UserList from '../component/mainpage/UserList';

const MainPage = () => {

  return (
    <main className='w-full h-full flex flex-col items-center'>
      <div id='gridContainer' className="flex w-[100%] h-[100%] gap-4">
        <div>
      <h1 className='w-full h-[10%] flex justify-center items-center text-2xl md:text-4xl m-10'>user1님 환영합니다!</h1>
        <UserList />
        </div>
        <div className="w-[30%] h-[30%]">
        <MainButton/>
        </div>
      </div>
    </main>
  )
}

export default MainPage
