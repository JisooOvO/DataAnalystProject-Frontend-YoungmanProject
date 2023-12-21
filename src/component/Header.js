import { useNavigate } from "react-router"
import ChangeReceiptIcon from "./ChangeReceiptIcon"
import LockIcon from "./LockIcon"
import PowerIcon from "./PowerIcon"
import RegisterIcon from "./RegisterIcon"
import WriteIcon from "./WriteIcon"

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

    // const navigate = useNavigate();

    // const handleLoginButton = (e) => {
    //     e.preventDefault();
    //     navigate("/login")
    // }

    return (
        <header className="lg:w-[20rem] h-full bg-custom-blue">
            <div className="w-full h-[10%] border-b-[1px] border-black">
                <h1 className="pt-3 pl-4 h-[50%] w-full text-white text-lg font-bold">수기 영수증 변환 시스템</h1>
                <div className="h-[50%] w-full flex">
                    <button className="w-[40%] flex text-xl pt-2 pl-6">
                        <PowerIcon />
                        <div className=" text-white text-[19px] pl-1 pt-[1px]">로그인</div>
                    </button>
                    <div className="w-[60%] text-[#bdb3b3] text-[15px] pt-3 pl-8" >로그인을 해주세요</div>
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
