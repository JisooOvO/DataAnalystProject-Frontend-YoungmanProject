import { useRecoilState } from "recoil";
import TitleHeader from "../component/common/TitleHeader"
import FindBox from "../component/find/FindBox";
import { AtomEmail } from "../component/common/Common";

const Find = () => {
  const url = new URL(window.location.href);
  const targetNm = url.searchParams.get("target");
  const [userEmail, setUserEmail] = useRecoilState(AtomEmail);
  return (
    <div className="w-full max-w-[40rem] h-full mx-auto">
      <TitleHeader title={ targetNm === "password" ? "CHANGE PASSWORD" : "FIND USERNAME"}/>
      <FindBox targetNm={targetNm}/>
    </div>
  )
}

export default Find