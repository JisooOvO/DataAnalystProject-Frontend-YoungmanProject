import { useState } from "react";
import { useNavigate } from "react-router-dom"
import HambergerButton from "./HambergerButton";

const Header = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // const navigate = useNavigate();

    const handleRegisterPage = (e) => {
        e.preventDefault();
        // navigate("/register")
    }

    const handleLoginPage = (e) => {
        e.preventDefault();
        // navigate("/login")
    }

    const handleMainPage = (e) => {
        e.preventDefault();
        // navigate("/")
    }

    return (
        <header className="bg-black py-4 flex justify-between">
            <h1 className="ml-8 text-4xl text-white"
                onClick={handleMainPage}
                >ETA</h1>
            <div className='flex text-white'>
                <button
                    onClick={handleRegisterPage}
                    className="px-2 mr-8">Register</button>
                <button
                    onClick={handleLoginPage}
                    className="px-2 mr-32">Login</button>
                <HambergerButton
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
        </header>
    )
}

export default Header
