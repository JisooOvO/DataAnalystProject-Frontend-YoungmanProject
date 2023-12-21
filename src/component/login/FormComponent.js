import CustomInput from "../common/CustomInput"

const FormComponent = ({title,type,placeholder}) => {
  return (
    <div className="w-full h-24 mb-4">
        <p className="mb-3 font-bold">{title}</p>
        <div className="h-12"><CustomInput type={type} placeholder={placeholder}/></div>
    </div>
  )
}

export default FormComponent
