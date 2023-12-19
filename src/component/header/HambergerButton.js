const HambergerButton = () => {
    const handleHambergerButton = () => {
    }

    return (
        <button
            className="flex flex-col justify-between items-center w-6 h-5"
            onClick={handleHambergerButton} 
        >
            <span className="block w-full h-1 bg-white"></span>
            <span className="block w-full h-1 bg-white"></span>
            <span className="block w-full h-1 bg-white"></span>
        </button>
    )
}

export default HambergerButton
