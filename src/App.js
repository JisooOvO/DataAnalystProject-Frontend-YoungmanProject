import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import Login from "./page/Login";
import Header from "./component/Header";
import Signup from "./page/Signup";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <Header />
          <main className="w-[90%] mx-auto h-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </RecoilRoot>
      </BrowserRouter>
    </div >
  );
}

export default App;
