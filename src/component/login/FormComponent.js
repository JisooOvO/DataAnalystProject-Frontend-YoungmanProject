import CustomInput from "../common/CustomInput"

const FormComponent = ({title,type,placeholder,id}) => {
  return (
    <div className="w-full h-24">
        <p className="mb-3 font-bold">{title}</p>
        <div className="h-12"><CustomInput type={type} id={id} placeholder={placeholder}/></div>
    </div>
  )
}

export default FormComponent
