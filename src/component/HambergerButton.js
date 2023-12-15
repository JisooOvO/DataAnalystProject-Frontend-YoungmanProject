

const HambergerButton = () => {
    
    const handleHambergerButton = () => {
    //    setIsSidebarOpen(!isSidebarOpen);
        console.log("i'm hamburger")
    }
    return (
        <button
            className="flex flex-col justify-between w-8 h-8"
            onClick={handleHambergerButton} 
        >
            <span className="block w-full h-1 bg-white"></span>
            <span className="block w-full h-1 bg-white"></span>
            <span className="block w-full h-1 bg-white"></span>
        </button>
    )
}

export default HambergerButton
