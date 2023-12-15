import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './page/Login';
import MainPage from './page/MainPage';
import "./index.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path="/login" element={<Login/>}/>          
        </Routes>  
      </BrowserRouter> 
    </div>
  );
}

export default App;
