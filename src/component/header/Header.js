import HambergerButton from "./HambergerButton";
import Navigation from "../../common/Navigation";

const Header = () => {
    return (
        <header className="w-full pr-10 bg-sky-500 py-4 flex justify-between">
            <div className="text-white pl-10 text-3xl">
                <Navigation title={"ETA"} url={"/"}/>
            </div>
            <div className='flex items-center gap-4 sm:gap-10 text-white'>
                <Navigation title={"Signup"} url={"/signup"}/>
                <Navigation title={"Login"} url={"/login"}/>
                <HambergerButton/>
            </div>
        </header>
    )
}

export default Header
