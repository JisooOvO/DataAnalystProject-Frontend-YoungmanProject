import { RecoilRoot } from "recoil"
import MyPageCategory from "../component/myPage/MyPageCategory"
import MyPageContents from "../component/myPage/MyPageContents"

const MyPage = () => {
  return (
    <div className="flex justify-center w-full h-full gap-10">
      <RecoilRoot>
          <MyPageCategory/>
          <MyPageContents/>
      </RecoilRoot>
    </div>
  )
}

export default MyPage
