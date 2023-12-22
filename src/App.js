import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import Login from "./page/Login";
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;
