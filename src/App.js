import { Route, BrowserRouter, Routes } from 'react-router-dom';
import "./index.css"
import MainPage from './page/MainPage';
import SignupPage from './page/SignupPage';
import LoginPage from './page/LoginPage';
import Header from './component/header/Header';
import TransformReceiptPage from './page/TransformReceiptPage';
import ViewAccountBookPage from './page/ViewAccountBookPage';
import { RecoilRoot } from 'recoil';
import MyPage from './page/MyPage';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Header/>
          <main className='w-full'>
              <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path='/transform/add_receipt' element={<TransformReceiptPage/>}/>
                <Route path='/accountbook/add' element={<ViewAccountBookPage/>}/>
              </Routes>
          </main>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
