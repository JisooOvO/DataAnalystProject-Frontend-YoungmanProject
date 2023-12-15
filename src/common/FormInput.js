import FormInputText from "./FormInputText"
import FormInputTitle from "./FormInputTitle"

const FormInput = ({title,type}) => {
  return (
    <div className="w-[90%] border rounded-md h-20 flex justify-center">
      <FormInputTitle title={title}/>
      <FormInputText type={type}/>
    </div>
  )
}

export default FormInput
