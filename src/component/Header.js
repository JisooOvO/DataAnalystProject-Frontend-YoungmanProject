import { useNavigate } from "react-router"
import ChangeReceiptIcon from "../image/ChangeReceiptIcon"
import LockIcon from "../image/LockIcon"
import PowerIcon from "../image/PowerIcon"
import RegisterIcon from "../image/RegisterIcon"
import WriteIcon from "../image/WriteIcon"

const Header = () => {
    
    const menuItems = [
        {
            title: "사입 관리",
            items: [
                { name: "수기 영수증 반환", icon: <ChangeReceiptIcon /> },
                { name: "사입서 관리", icon: <WriteIcon /> }
            ]
        },
        {
            title: "회원 관리",
            items: [
                { name: "비밀번호 변경", icon: <LockIcon /> },
                { name: "회원가입", icon: <RegisterIcon /> }
            ]
        }
    ]

    const navigate = useNavigate();

    const isLoggedIn = sessionStorage.getItem("token" != null);

    const handleLoginButton = (e) => {
        e.preventDefault();
        navigate("/login")
    }

    const handleLogoutButton = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        navigate("/login");
    }

    return (
        <header className="lg:w-[20rem] h-full bg-custom-blue">
            <div className="w-full h-[12%] border-b-[1px] border-black">
                <h1 className="pt-3 pl-4 h-[50%] w-full text-white text-lg font-bold">수기 영수증 변환 시스템</h1>
                <div className="h-[50%] w-full flex">
                    { isLoggedIn ?
                      (  <button onClick={handleLoginButton} className="w-[50%] flex text-xl pt-2 pl-5">
                        <PowerIcon />
                        <div className=" text-white text-[19px] pl-1 pt-[1px]">
                            로그인
                            </div>
                    </button>
                      ) : (
                    <button onClick={handleLogoutButton} className="w-[50%] flex text-xl pt-2 pl-5">
                        <PowerIcon />
                        <div className=" text-white text-[19px] pl-1 pt-[1px]">
                            로그아웃
                            </div>
                </button>  )
                    }
                    <div className="w-[50%] text-[#bdb3b3] text-[15px] pt-3" >
                         { isLoggedIn ?   '로그인 하세요' : `${sessionStorage.getItem("username")}님 환영합니다`} 
                        </div>
                </div>
            </div>
            <div className="w-full h-[88%]">
                {menuItems.map((menu, menuIndex) => (
                    <div className="text-white ml-4 mt-4 mb-24" key={menuIndex}>
                        <h2 className="text-base font-bold p-1">{menu.title}</h2>
                        <nav>
                            {menu.items.map((item, itemIndex) => (
                                <div className="flex w-80 p-2" key={itemIndex}>
                                    {item.icon}
                                    <span className="px-2 mt-1">{item.name}</span>
                                </div>
                            ))}
                        </nav>
                    </div>
                ))}
            </div>
        </header>
    )
}

export default Header
