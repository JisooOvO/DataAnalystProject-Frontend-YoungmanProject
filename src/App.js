import { Route, BrowserRouter, Routes } from 'react-router-dom';
import "./index.css"
import MainPage from './page/MainPage';
import SignupPage from './page/SignupPage';
import LoginPage from './page/LoginPage';
import Header from './component/header/Header';
import TransformReceiptPage from './page/TransformReceiptPage';
import ViewAccountBookPage from './page/ViewAccountBookPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>          
          <Route path="/signup" element={<SignupPage/>}/> 
          <Route path='/transform/add_receipt' element={<TransformReceiptPage/>}/>
          <Route path='/accountbook/add' element={<ViewAccountBookPage/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
