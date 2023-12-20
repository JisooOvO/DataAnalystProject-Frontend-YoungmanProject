import { useEffect, useState } from "react";
import { PURPLE } from "../../common/Common";
import Navigation from "../../common/Navigation";
import { useRecoilState } from "recoil";
import AtomIsLogin from "../../common/Atom";
import HambergerButton from "./HambergerButton";

const Header = () => {
    const [navLog,setNavLog] = useState(<Navigation title={"로그인"} url={"/login"}/>);
    // eslint-disable-next-line
    const [isLogin,setIslogin] = useRecoilState(AtomIsLogin);
    const [nav, setNav] = useState('');

    const handleResponsiveNav = () => {
      const clientWidth = window.innerWidth;
      if(clientWidth < 1024) setNav(<HambergerButton/>)
      else setNav(
        <nav className='flex font-semibold items-center gap-4 sm:gap-10 text-white'>
            <Navigation title={"영수증 변환"} url={"/transform/add_receipt"}/>
            <Navigation title={"가계부 작성"} url={"/accountbook/add"}/>
            {navLog}
        </nav>
      )
    }
    
    useEffect(() => {
        const handleResize = () => {
          handleResponsiveNav();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(()=>{
        if(isLogin) setNavLog(<Navigation title={"마이페이지"} url={"/mypage"}/>);
        else setNavLog(<Navigation title={"로그인"} url={"/login"}/>);
    },[isLogin])

    return (
        <header style={{backgroundColor : PURPLE}} className={`w-full hover:b shadow-lg h-16 pl-12 pr-20 items-center flex justify-between z-[9999]`}>
            <div className="text-2xl font-bold text-white whitespace-nowrap">
                <Navigation title={"스마트가계부"} url={"/"}/>
            </div>
            {nav}
        </header>
    )
}

export default Header
