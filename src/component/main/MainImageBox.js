import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import MainImage from "../../image/mainImage.jpg"
import { useRecoilState } from "recoil";
import { AtomIsMobile } from "../common/Common";
const MainImageBox = () => {
  const navigate = useNavigate();
  const [isMobile,setIsMobile] = useRecoilState(AtomIsMobile);

  return (
    <div className="relative">
        <div className="absolute top-20 left-8 lg:text-base md:text-sm text-[70%] text-white drop-shadow-md">
            <p className="text-2xl sm:text-4xl mb-3">SMART RECEIPTS MANAGEMENT</p>
            <div className="mt-5">
              <p>사진 한장으로 영수증을 간편하게 관리하세요</p>
              {/* <span className="text-xl">YOUNGMAN PROJECT</span>
              <span className="sm:inline-block block">에서 스마트한 영수증 관리를 돕습니다</span> */}
            </div>
        </div>
        <img src={MainImage} loading="lazy" alt="메인 페이지 이미지" className="w-full h-[30rem] bg-cover"/>
        <button onClick={()=>{navigate("/transform_receipt")}} className="absolute bottom-16 left-6 w-36 sm:w-52 h-12 text-white font-bold">
          <CustomButton title={isMobile ? "시작하기" : "영수증 관리 시작하기"}/>
        </button>
    </div>
  )
}

export default MainImageBox