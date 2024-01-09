import TransformImageBox from "./TransformImageBox"
import TransformUploadBox from "./TransformUploadBox"
import TransformNav from "./TransformNav"

const TransformBox = () => {


  return (
    <>
      <div className="border h-fit bg-gray-200 p-5 w-full rounded-xl shadow-md">
        <TransformUploadBox/>
        <TransformNav/>        
        <TransformImageBox/>
      </div>
      <div className="h-10"></div>
    </>
  )
}

export default TransformBox