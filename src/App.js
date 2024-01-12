import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import Login from "./page/Login";
import Header from "./component/header/Header";
import Signup from "./page/Signup";
import { RecoilRoot, useRecoilState } from "recoil";
import TransformReceipt from "./page/TransformReceipt";
import ManageReceipt from "./page/ManageReceipt";
import MainPage from "./page/Main";
import ChangePassword from "./page/ChangePassword"
import Verify from "./page/Verify";
import Find from "./page/Find";
import Error404 from "./page/Error404";
import ManageCompanyUser from "./page/ManageCompanyUser";
import Message from "./page/Message";
import ChatRoom from "./page/ChatRoom";
import ManageSocket from "./component/common/ManageSocket";
import Alarm from "./page/Alarm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <ManageSocket/>
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
              <Route path="/company/manage_member" element={<ManageCompanyUser/>}/>
              <Route path="/company/message/lobby" element={<Message/>}/>
              <Route path="/company/message/chat" element={<ChatRoom/>}/>
              <Route path="/company/alarms" element={<Alarm/>}/>
              <Route path="/*" element={<Error404/>}/>
            </Routes>
          </main>
        </RecoilRoot>
      </BrowserRouter>
    </div >
  );
}

export default App;
