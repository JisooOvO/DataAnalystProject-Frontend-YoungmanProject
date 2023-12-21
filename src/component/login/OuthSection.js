import GoogleImage from "../../image/GoogleImage"
import KakaotalkImage from "../../image/KakaotalkImage"
import OuthButton from "../common/OuthButton"

const OuthSection = () => {
  return (
    <section className="w-full flex flex-col gap-5 mb-5">
      <div className="w-full h-16 text-base sm:text-2xl font-bold bg-[#FFEB00] hover:opacity-70 rounded-xl">
          <OuthButton title={"카카오톡 로그인"} svg={<KakaotalkImage/>}/>
      </div>
      <div className="w-full h-16 text-base sm:text-2xl font-bold bg-white hover:opacity-70 rounded-xl">
          <OuthButton title={"구글 로그인"} svg={<GoogleImage/>}/>
      </div>
    </section>
  )
}

export default OuthSection
