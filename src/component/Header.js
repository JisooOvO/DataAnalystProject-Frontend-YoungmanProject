import { useNavigate } from "react-router"
import ChangeReceiptIcon from "../image/ChangeReceiptIcon"
import LockIcon from "../image/LockIcon"
import PowerIcon from "../image/PowerIcon"
import RegisterIcon from "../image/RegisterIcon"
import WriteIcon from "../image/WriteIcon"
import { useRecoilState } from "recoil"
import { AtomIsLogin } from "./common/Common"
import { useEffect, useState } from "react"
import ArrowLeftIcon from "../image/ArrowLeftIcon"
import ArrowRightIcon from "../image/ArrowRightIcon"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(AtomIsLogin);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  }

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    if(token) setIsLoggedIn(true);
    const innerWidth = window.innerWidth;
    if(innerWidth <= 768) setTimeout(()=>{setIsExpanded(false)},500);
    
    const main = document.querySelector("main");
    main.addEventListener('click',()=>{
        setIsExpanded(false);
    })
    // eslint-disable-next-line
  },[])

  useEffect(() => {
      const header = document.querySelector("#header");
      if (isExpanded === false) {
        setTimeout(() => {
          header.classList.add("z-[-10]");
          header.classList.remove("z-[9999]");
        },500)
      }
      else {
        header.classList.remove("z-[-10]"); 
        header.classList.add("z-[9999]");
      }
  },[isExpanded])


  const sidebarClass = isExpanded ? "translate-x-0" : "-translate-x-[18rem]";
  const arrowIcon = isExpanded ? <ArrowLeftIcon /> : <ArrowRightIcon />

  const menuItems = [
      {
          title: "영수증 관리",
          items: [
            { name: "수기 영수증 변환", icon: <ChangeReceiptIcon />, url : "/transform_receipt" },
            { name: "영수증 관리", icon: <WriteIcon />, url : "/manage_receipt" }
          ]
      },
      {
          title: "내 정보 관리",
          items: [
              ...(!isLoggedIn ? 
              [{ name: "회원가입", icon: <RegisterIcon />, url : "/signup" }] 
              : 
              [{ name: "비밀번호 변경", icon: <LockIcon />, url : "/mypage/change_password" }]
              )
          ]
      }
  ]

  const handleLoginButton = () => {
      navigate("/login")
  }

  const handleLogoutButton = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/login");
  }

  const handleNavigate = (e,url) => {
      navigate(url);
  }

  return (
      <>
        <header id="header" className={`absolute w-[18rem] min-h-[800px] h-full z-[9999]`}>
          <div className={`relative shadow-xl shadow-black w-full h-full bg-custom-blue transition-all duration-500 ease-in-out ${sidebarClass}`}>
            <div className="w-full h-[6rem] border-b-[1px] border-black">
              <h1 
              onClick={(e)=>{handleNavigate(e,"/")}} 
              className="pt-3 pl-4 h-[50%] w-full text-white text-lg font-bold hover:cursor-pointer hover:opacity-70">
                  영수증 변환 프로그램
              </h1>
              <div className="h-[27%] w-full flex">
                <button onClick={isLoggedIn ? handleLogoutButton : handleLoginButton} className="w-[50%] flex pt-2 pl-6">
                  <PowerIcon />
                  <div className=" text-white text-base pl-1 pt-[1px]">
                    {isLoggedIn ? "로그아웃" : "로그인"}
                  </div>
                </button>
                <div className="w-[73%] text-[#bdb3b3] text-[14px] flex justify-center items-center pt-4 pr-2" >
                  {isLoggedIn ? (
                  <span className="text-center">{sessionStorage.getItem("username")}님 환영합니다</span>
                    ) : (
                    '로그인 하세요'
                  )}
                </div>
              </div>
            </div>
              {/* 메뉴 아이템 */}
            <div className="w-full">
              {menuItems.map((menu, menuIndex) => (
                <div className="text-white ml-4 mt-4 m-20" key={`key${menuIndex}`}>
                  <h2 className="text-base font-bold p-1">{menu.title}</h2>
                    <nav>
                      {
                        menu.items.map((item, itemIndex) => (
                        <div className="flex w-80 p-2 hover:cursor-pointer hover:opacity-70" 
                        key={`key${itemIndex}`} onClick={(e)=>{handleNavigate(e,item.url)}}>
                          {item.icon}
                        <span className="px-2 mt-1">{item.name}</span>
                        </div>
                        ))
                      }
                    </nav>
                  </div>
                  ))}
              </div>
          </div>
          {/* 화살표 버튼 */}
          </header>
          <button onClick={toggleSidebar}
              className={`shadow-lg border-2 border-l-0 border-gray-400 bg-[#707070] z-[9999] absolute top-1/2 -translate-y-1/2 transition-all left-[18rem] duration-500 ease-in-out ${sidebarClass}`}>
              {arrowIcon}
          </button>
      </>
    )
}

export default Header
