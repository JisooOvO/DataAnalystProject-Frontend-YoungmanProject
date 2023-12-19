import { PURPLE } from "../../common/Common";
import Navigation from "../../common/Navigation";

const Header = () => {
    return (
        <header style={{backgroundColor : PURPLE}} className={`w-full hover:b shadow-lg h-16 px-8 items-center flex justify-between z-[9999]`}>
            <div className="text-xl font-bold">
                <Navigation title={"스마트가계부"} url={"/"}/>
            </div>
            <div className='flex font-semibold items-center gap-4 sm:gap-10 text-white'>
                <Navigation title={"영수증 변환"} url={"/transform/add_receipt"}/>
                <Navigation title={"가계부 작성"} url={"/accountbook/add"}/>
                <Navigation title={"로그인"} url={"/login"}/>
            </div>
        </header>
    )
}

export default Header
