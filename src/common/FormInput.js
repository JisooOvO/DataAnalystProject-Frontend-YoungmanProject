import { BEIGE } from "./Common"
import FormInputText from "./FormInputText"
import FormInputTitle from "./FormInputTitle"

const FormInput = ({title,type,id}) => {
  return (
    <div style={{backgroundColor : BEIGE}} className="w-full border rounded-xl h-24 gap-4 flex justify-center">
      <FormInputTitle title={title}/>
      <FormInputText type={type} id={id}/>
    </div>
  )
}

export default FormInput
