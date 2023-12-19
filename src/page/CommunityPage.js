import CommunityLeftSection from "../component/communityPage/CommunityLeftSection"
import CommunityRightSection from "../component/communityPage/CommunityRightSection"

const CommunityPage = () => {
  let innerWidth = window.innerWidth;

  const handleToggleButtonClick = () => {
    const toggleContainer = document.querySelector("#toggleContainer");
    toggleContainer.classList.toggle("hidden");
  }

  window.addEventListener('resize',()=>{
    innerWidth = window.innerWidth;
    if(innerWidth < 1024){
      const toggleContainer = document.querySelector("#toggleContainer");
      toggleContainer.classList.add("hidden");
    }
  })
  
  return (
    <section className="w-full h-full flex relative">
        <button 
          onClick={handleToggleButtonClick} 
          className="block z-10 lg:hidden w-7 h-7 border rounded-[50%] bg-white absolute sm:right-8 top-3">
            X
        </button>
        <CommunityLeftSection/>
        <CommunityRightSection/>
    </section>
  )
}

export default CommunityPage
