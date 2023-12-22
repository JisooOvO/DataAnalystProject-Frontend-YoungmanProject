import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import Login from "./page/Login";
import Header from "./component/Header"

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
