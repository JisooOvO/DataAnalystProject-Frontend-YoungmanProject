const FormInputText = ({type,id}) => {
  return (
    <div className="w-[60%] h-full flex justify-center items-center">
        <input type={type} id={id} name={id} className="border w-full rounded-md shadow-inner px-2"/>
    </div>
  )
}

export default FormInputText
