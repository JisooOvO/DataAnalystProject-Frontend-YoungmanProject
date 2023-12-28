import { Link } from "react-router-dom"
import CelebrationIcon from "../../image/CelebrationIcon"
import HomeIcon from "../../image/HomeIcon"

const MainFooter = () => {
  return (
    <div className="w-full bg-custom-blue sm:text-base text-sm h-fit pt-8 pb-4 px-8 text-white">
        <p className="mb-5">해당 프로젝트는 부산대학교 AI 활용 빅데이터분석 풀스택웹서비스 SW 개발자 양성과정에서 진행하였습니다.</p>
        <div className="flex gap-2 mb-3 items-center">
            <div className="w-8 h-8"><CelebrationIcon/></div>
            <p>데이터 제공</p>
        </div>
        <Link to={"https://9oz.co.kr"} className="ml-5 sm:ml-16 mb-5 hover:opacity-70 hover:cursor-pointer">나인온스 https://9oz.co.kr/</Link>
        <div className="flex gap-2 my-3 items-center">
            <div className="w-8 h-8"><HomeIcon/></div>
            <p>개발자 GITHUB</p>
        </div>
        <div className="flex flex-col">
            <Link to={"https://github.com/JisooOvO"} className="ml-5 sm:ml-16 mb-2 w-fit hover:opacity-70 hover:cursor-pointer">FRONTEND https://github.com/JisooOvO</Link>
            <Link to={"https://github.com/ORENOL"} className="ml-5 sm:ml-16 mb-2 w-fit hover:opacity-70 hover:cursor-pointer">BACKEND https://github.com/ORENOL</Link>
            <Link to={"https://github.com/color7921"} className="ml-5 sm:ml-16 mb-2 w-fit hover:opacity-70 hover:cursor-pointer">DATA ANALYST https://github.com/color7921</Link>
        </div>
        
    </div>
  )
}

export default MainFooter