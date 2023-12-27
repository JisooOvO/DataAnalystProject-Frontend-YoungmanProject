import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import Login from "./page/Login";
import Header from "./component/header/Header";
import Signup from "./page/Signup";
import { RecoilRoot } from "recoil";
import TransformReceipt from "./page/TransformReceipt";
import ManageReceipt from "./page/ManageReceipt";
import MainPage from "./page/Main";
import ChangePassword from "./page/ChangePassword"
import Verify from "./page/Verify";
import Find from "./page/Find";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <Header />
          <main className="w-[90%] mx-auto h-full">
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/verify/:slot" element={<Verify/>}/>
              <Route path="/find" element={<Find/>}/>
              <Route path="/transform_receipt" element={<TransformReceipt/>}/>
              <Route path="/manage_receipt"element={<ManageReceipt/>}/>
              <Route path="/mypage/change_password" element={<ChangePassword/>}/>
            </Routes>
          </main>
        </RecoilRoot>
      </BrowserRouter>
    </div >
  );
}

export default App;
