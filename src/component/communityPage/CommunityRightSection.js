import RightPostSection from "./rightSection/RightPostSection"
import UserSection from "./rightSection/UserSection"

const CommunityRightSection = () => {
  return (
  <div id="toggleContainer" className="md:block hidden w-[35%]">
    <div className="border w-full h-full bg-blue-400">
        <UserSection/>
        <RightPostSection/>
    </div>
  </div>
  )
}

export default CommunityRightSection
