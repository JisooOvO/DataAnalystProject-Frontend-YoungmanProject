import { useEffect, useState } from "react";
import { PURPLE } from "../../common/Common";
import Navigation from "../../common/Navigation";
import { useRecoilState } from "recoil";
import AtomIsLogin from "../../common/Atom";

const Header = () => {
    const [nav,setNav] = useState('');
    // eslint-disable-next-line
    const [isLogin,setIslogin] = useRecoilState(AtomIsLogin);
    
    useEffect(()=>{
        if(isLogin) setNav(<Navigation title={"마이페이지"} url={"/mypage"}/>);
        else setNav(<Navigation title={"로그인"} url={"/login"}/>);
    },[isLogin])

    return (
        <header style={{backgroundColor : PURPLE}} className={`w-full hover:b shadow-lg h-16 pl-12 pr-20 items-center flex justify-between z-[9999]`}>
            <div className="text-2xl font-bold text-white">
                <Navigation title={"스마트가계부"} url={"/"}/>
            </div>
            <nav className='flex font-semibold items-center gap-4 sm:gap-10 text-white'>
                <Navigation title={"영수증 변환"} url={"/transform/add_receipt"}/>
                <Navigation title={"가계부 작성"} url={"/accountbook/add"}/>
                {nav ? nav : ''}
            </nav>
        </header>
    )
}

export default Header
