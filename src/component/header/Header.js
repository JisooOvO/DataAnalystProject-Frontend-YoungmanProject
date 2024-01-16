import { useNavigate } from "react-router"
import ChangeReceiptIcon from "../../image/ChangeReceiptIcon"
import LockIcon from "../../image/LockIcon"
import PowerIcon from "../../image/PowerIcon"
import RegisterIcon from "../../image/RegisterIcon"
import WriteIcon from "../../image/WriteIcon"
import { useRecoilState } from "recoil"
import { AtomAlarmCount, AtomIsLogin, AtomIsMobile, AtomWidth, BACKENDURL } from "./../common/Common"
import { useEffect, useRef, useState } from "react"
import ArrowLeftIcon from "../../image/ArrowLeftIcon"
import ArrowRightIcon from "../../image/ArrowRightIcon"
import SupervisorIcon from "../../image/SupervisorIcon"
import MessageIcon from "../../image/MessageIcon"
import { AlarmIcon } from "../../image/AlarmIcon"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import UserIcon from "../../image/UserIcon"
import CustomCircle from "../common/CustomCircle"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(AtomIsLogin);
  const [isExpanded, setIsExpanded] = useState(true);
  // eslint-disable-next-line
  const [innerWidth, setInnerWidth] = useRecoilState(AtomWidth);
  // eslint-disable-next-line
  const [isMobile, setIsMobile] = useRecoilState(AtomIsMobile);
  const [headerHeight, setHeaderHeight] = useState(window.screen.availHeight);
  const [headerWidth, setHeaderWidth] = useState(18+'rem');
  const socket = new SockJS(BACKENDURL+'/chat');
  const username = sessionStorage.getItem("username");
  const [isLogin, _] = useRecoilState(AtomIsLogin);
  const stompClient = useRef(Stomp.over(()=>{
    return socket;
  }))
  const [unReadCnt, setUnReadCnt] = useState(0);
  const [lastMsg, setLastMsg] = useState("");
  const [alarmCnt, setAlarmCnt] = useRecoilState(AtomAlarmCount);


  useEffect(()=>{
    stompClient.current.beforeConnect = function(){
      stompClient.current.connectHeaders = {
        "Authorization" : sessionStorage.getItem("token")
      }
    }

    stompClient.current.onConnect = function(){
      console.log("MAIN STOMP CONNECTED");

      stompClient.current.subscribe(`/topic/main/${username}`, (message) => {
        const parseMsg = JSON.parse(message.body);
        console.log(parseMsg);
        setUnReadCnt(parseMsg["unReadMessage"]);
        if(window.location.pathname === "/company/message/chat") return;
        setLastMsg(
          <div onClick={()=>{
            navigate(`/company/message/chat?username=${parseMsg["sender"]}`)
          }} id="lasMsgContainer" className="hidden fixed rounded-xl shadow-md p-4 w-60 hover:cursor-pointer bg-white bottom-10 right-4 z-[9999]">
            <div className="flex gap-3 mb-5 items-center">
              <div className="w-9 h-9">
                <CustomCircle svg={<UserIcon/>}/>
              </div>
              <p>{parseMsg["sender"]}</p>
            </div>
            <p>{parseMsg["content"]}</p>
          </div>
        );
      })
    }

    stompClient.current.onDisconnect = function(){
      console.log("MAIN STOMP DISCONNECTED");
    }

    if(isLogin){
      if(!stompClient.current.connected)
        stompClient.current.activate();

      fetch(BACKENDURL+"/api/private/notice/getNoticeLogsCounts",{
        headers : {
          "Authorization" : sessionStorage.getItem("token") 
        }
      })
      .then(res => res.json())
      .then(data => setAlarmCnt(+data["message"]))
      .catch(e => console.log(e));

      fetch(BACKENDURL+"/api/private/chat/getSumUnReadMessage",{
        headers : {
          "Authorization" : sessionStorage.getItem("token") 
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUnReadCnt(data["message"])
      })
      .catch(e => console.log(e));
    }
    else{
      stompClient.current.deactivate();
    }

  },[isLogin])  

  useEffect(()=>{
    const lasMsgContainer = document.querySelector("#lasMsgContainer");
    if(lasMsgContainer) {
      lasMsgContainer.classList.remove("hidden");
      lasMsgContainer.classList.add("fade-out");
      setTimeout(()=>{
        lasMsgContainer.classList.add("hidden");
        lasMsgContainer.classList.remove("fade-out");
        setLastMsg("");
      },2000)  
    }
  },[lastMsg])


  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  }

  const handleInnerWidth = () => {
    setInnerWidth(window.innerWidth);
  }

  useEffect(()=>{
    handleInnerWidth();
    window.addEventListener('resize',handleInnerWidth);
    return ()=> {
      window.removeEventListener('resize',handleInnerWidth);
    }
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(innerWidth < 768) setIsMobile(true);
    else setIsMobile(false);
    // eslint-disable-next-line
  },[innerWidth])

  const handleResize = () => {
    setHeaderHeight(Math.max(
      document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
    ));
  };

  const handleScroll = () => {
    setHeaderHeight(Math.max(
      document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
    ));
  };

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    if(token) setIsLoggedIn(true);
    if(innerWidth < 768) {
      setTimeout(()=>{setIsExpanded(false);},500); 
    }
 
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    handleInnerWidth();

    const main = document.querySelector("main");
    main.addEventListener('click',()=>{
        setIsExpanded(false);
    })
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  },[])


  useEffect(() => {
    if(isExpanded)
      setHeaderWidth(18 + "rem")
    else
      setTimeout(()=>{
        setHeaderWidth( 0);
      },500)
  },[isExpanded]);

  useEffect(()=>{
    const menuItem = document.querySelectorAll("[id^=menu]");
    for ( const node of menuItem) {
      node.classList.remove("underline");
      if(window.location.pathname === "/"+node["id"].slice(5))
        node.classList.add("underline");
    }
  },[isLoggedIn,navigate])

  const sidebarClass = isExpanded ? "translate-x-0" : `-translate-x-[18rem]`;
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
        title: "회사 관리",
        items: [
          ...(isLoggedIn&(sessionStorage.getItem("role") === "[ROLE_ADMIN]") ?
          [
          { name: "소속 회원 관리", icon : <SupervisorIcon/>, url : "/company/manage_member" },
          { name: "메신저", icon : <MessageIcon/>, url : "/company/message/lobby"},
          { name: "알림", icon : <AlarmIcon/>, url : "/company/alarms"}
          ]
          :
          [
          { name: "메신저", icon : <MessageIcon/>, url : "/company/message/lobby"},
          { name: "알림", icon : <AlarmIcon/>, url : "/company/alarms"}
          ]
          )
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
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("association");
      setIsLoggedIn(false);
      navigate("/login");
  }

  const handleNavigate = (e,url) => {
      navigate(url);
  }

  return (
      <>
        {lastMsg}
        <header style={{ width : headerWidth, height: headerHeight }} id="header" className={`fixed z-[9999]`}>
          <div
          className={`relative w-full h-full bg-custom-blue transition-all duration-500 ease-in-out ${sidebarClass}`}>
            <div className="w-full h-[6rem] border-b-[1px] border-gray-400">
              <h1 
              onClick={(e)=>{handleNavigate(e,"/")}} 
              className="pt-3 pl-4 h-[50%] w-full text-white text-lg font-bold hover:cursor-pointer hover:opacity-70">
                  YOUNGMAN PROJECT
              </h1>
              <div className="h-[27%] w-full flex mt-2">
                <button onClick={isLoggedIn ? handleLogoutButton : handleLoginButton} className="w-[50%] flex pl-6">
                  <PowerIcon />
                  <div className=" text-white text-base pl-1 pt-[1px] hover:opacity-70">
                    {isLoggedIn ? "로그아웃" : "로그인"}
                  </div>
                </button>
                <div className="w-[73%] text-[#bdb3b3] text-[14px] flex justify-center items-center mt-1 pr-2" >
                  {isLoggedIn ? (
                  <span className="text-center">{sessionStorage.getItem("username")}님 환영합니다</span>
                    ) : (
                    '로그인이 필요합니다'
                  )}
                </div>
              </div>
            </div>
              {/* 메뉴 아이템 */}
            <div className="w-full">
              {menuItems.map((menu, menuIndex) => {
                // eslint-disable-next-line
                if(!menu) return;
                else
                return(
                <div className="text-white ml-4 mt-4 m-20" key={`key${menuIndex}`}>
                  <h2 className="text-base font-bold p-1">{menu.title}</h2>
                    <nav>
                      {
                        menu.items ?
                        menu.items.map((item, itemIndex) => {
                        return (
                          <div className="flex  w-full p-2 hover:cursor-pointer hover:opacity-70" key={`key${itemIndex}`} onClick={(e)=>{handleNavigate(e,item.url)}}>
                            {item.icon}
                            <span id={`menu${item["url"]}`} className="px-2 mt-1">
                              {item.name}
                            </span>
                            {
                              item.name === "메신저" && unReadCnt > 0 ? 
                              <div className="w-6 h-6 no-underline bg-red-500 shadow-md mt-1 rounded-[50%] flex justify-center items-center">
                                {unReadCnt}
                              </div> 
                              :
                              item.name === "알림" && alarmCnt > 0 ?
                              <div className="w-6 h-6 no-underline bg-red-500 shadow-md mt-1 rounded-[50%] flex justify-center items-center">
                                {alarmCnt}
                              </div> 
                              : ""
                            }
                          </div>
                        )})
                        :
                        ""
                      }
                    </nav>
                  </div>
                  )})}
              </div>
          </div>
          {/* 화살표 버튼 */}
          </header>
          <button onClick={toggleSidebar}
          className={`shadow-lg border-2 border-l-0 w-10 h-10 border-gray-400 left-[18rem] bg-[#707070] z-[9999] fixed top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${sidebarClass}`}>
            {arrowIcon}
          </button>
      </>
    )
}

export default Header
