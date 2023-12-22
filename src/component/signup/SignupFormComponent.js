import CustomInput from "../common/CustomInput"

const SignupFormComponent = ({title,subtitle,type,id,placeholder,state,func}) => {
  return (
    <div className="w-full h-24">
        <p className="mb-3 font-bold">{title}</p>
        <div className="h-12"><CustomInput type={type} id={id} placeholder={placeholder} func={func} state={state}/></div>
        <p className="text-sm mt-1">{subtitle}</p>
    </div>
  )
}

export default SignupFormComponent
