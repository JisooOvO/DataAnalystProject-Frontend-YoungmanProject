import { BEIGE } from "../../common/Common"

const SignFormInput = ({title,type,id,subtitle}) => {
  return (
    <div style={{backgroundColor : BEIGE}} className="w-full border rounded-xl px-4 h-32 flex flex-col justify-center">
      <div className="flex w-[30%] justify-center items-center mt-4">
        <div className="lg:text-[80%] text-[70%] w-full drop-shadow flex items-center whitespace-nowrap">
            {title}
        </div>
      </div>
      <div className="w-[100%] h-full flex flex-col justify-center">
        <input type={type} id={id} name={id} className="border w-full h-12 rounded-xl shadow-inner px-2"/>
        <p className="text-gray-700 text-[60%] mt-1">{subtitle}</p>
      </div>
    </div>
    )
}

export default SignFormInput
