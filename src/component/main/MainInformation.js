import CameraIcon from "../../image/CameraIcon"
import UploadIcon from "../../image/UploadIcon"
import MainChangeIcon from "../../image/MainChangeIcon"
import MainWriteIcon from "../../image/MainWriteIcon"
import MainInforSVGContainer from "./MainInforSVGContainer"

const MainInformation = () => {
  return (
    <div className="w-full lg:h-[20rem] my-10 flex flex-col justify-center items-center">
        <p className="mb-10 text-2xl text-custom-blue">Step 4 of Easy Receipt Conversion</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-around w-full">
            <MainInforSVGContainer svg={<CameraIcon/>} title={"1. TAKE PHOTO"}/>
            <MainInforSVGContainer svg={<UploadIcon/>} title={"2. UPLOAD RECEIPT"}/>
            <MainInforSVGContainer svg={<MainChangeIcon/>} title={"3. TRANSFORM"}/>
            <MainInforSVGContainer svg={<MainWriteIcon/>} title={"4. MANAGE SMARTER"}/>
        </div>
    </div>
  )
}

export default MainInformation