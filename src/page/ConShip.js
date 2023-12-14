import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainPage from "./MainPage"

const ConShip = () => {
  return (
    <Router>
    <div>
      <Route path="/" element={<MainPage />} />
    </div>
    </Router>
  )
}

export default ConShip
