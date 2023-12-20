import { BEIGE } from "../../common/Common"

const FormInput = ({title,type,id}) => {
  return (
    <div style={{backgroundColor : BEIGE}} className="w-full border rounded-xl px-4 py-2 h-28">
      <div className="flex w-full justify-center items-center m-2">
        <div className="w-full drop-shadow flex items-center whitespace-nowrap">
            {title}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
          <input type={type} id={id} name={id} className="border w-full h-12 rounded-xl shadow-inner px-2"/>
      </div>
    </div>
  )
}

export default FormInput
