import RightPostSection from "./rightSection/RightPostSection"
import UserSection from "./rightSection/UserSection"

const CommunityRightSection = () => {
  return (
  <div id="toggleContainer" className="lg:block hidden absolute h-full w-[50%] right-0 lg:w-[35%]">
    <div className="border w-full h-full bg-blue-400">
        <UserSection/>
        <RightPostSection/>
    </div>
  </div>
  )
}

export default CommunityRightSection
