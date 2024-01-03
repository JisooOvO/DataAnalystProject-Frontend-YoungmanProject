import TransformImageBox from "./TransformImageBox"
import TransformUploadBox from "./TransformUploadBox"
import TransformNav from "./TransformNav"

const TransformBox = () => {


  return (
    <>
      <div className="border border-black h-fit p-5 w-full rounded-xl shadow-md">
        <TransformUploadBox/>
        <TransformNav/>        
        <TransformImageBox/>
      </div>
      <div className="h-10"></div>
    </>
  )
}

export default TransformBox