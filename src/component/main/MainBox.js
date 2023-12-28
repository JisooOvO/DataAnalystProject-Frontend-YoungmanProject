import MainFooter from "./MainFooter"
import MainImageBox from "./MainImageBox"
import MainInformation from "./MainInformation"

const MainBox = () => {
  return (
    <div className="w-full max-w-[70rem] mx-auto">
      <MainImageBox/>
      <MainInformation/>
      <MainFooter/>
    </div>
  )
}

export default MainBox