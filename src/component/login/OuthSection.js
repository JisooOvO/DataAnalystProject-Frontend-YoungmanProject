import GoogleIcon from "../../image/GoogleIcon"
import KakaotalkIcon from "../../image/KakaotalkIcon"
import OuthButton from "../common/OuthButton"

const OuthSection = () => {
  const handleKakaoLoginButton = (e) => {
    e.preventDefault();
  }

  const handleGoogleLoginButton = (e) => {
    e.preventDefault();
  }
  
  return (
    <section className="w-full flex flex-col gap-5 mb-5">
      <div className="w-full h-16 text-xl font-bold bg-[#FFEB00] hover:opacity-70 rounded-xl">
          <OuthButton title={"카카오톡 로그인"} svg={<KakaotalkIcon/>} func={handleKakaoLoginButton}/>
      </div>
      <div className="w-full h-16 text-xl font-bold bg-white hover:opacity-70 rounded-xl">
          <OuthButton title={"구글 로그인"} svg={<GoogleIcon/>} func={handleGoogleLoginButton}/>
      </div>
    </section>
  )
}

export default OuthSection
