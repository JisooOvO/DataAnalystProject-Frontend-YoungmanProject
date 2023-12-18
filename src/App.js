import { Route, BrowserRouter, Routes } from 'react-router-dom';
import "./index.css"
import MainPage from './page/MainPage';
import MapPage from './page/MapPage';
import SignupPage from './page/SignupPage';
import LoginPage from './page/LoginPage';
import Header from './component/header/Header';
import CommunityPage from './page/CommunityPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>          
          <Route path="/signup" element={<SignupPage/>}/>    
          <Route path="/map" element={<MapPage/>}/>
          <Route path="/community" element={<CommunityPage/>}/>
        </Routes>  
      </BrowserRouter> 
    </div>
  );
}

export default App;
