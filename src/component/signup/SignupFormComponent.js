import CustomInput from "../common/CustomInput"

const SignupFormComponent = ({title,subtitle,type,id,placeholder}) => {
  return (
    <div className="w-full h-24">
        <p className="mb-3 font-bold">{title}</p>
        <div className="h-12"><CustomInput type={type} id={id} placeholder={placeholder}/></div>
        <p>{subtitle}</p>
    </div>
  )
}

export default SignupFormComponent
