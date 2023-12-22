const CustomInput = ({type,placeholder,id}) => {
  return (
    <input className="bg-white border border-black w-full h-full rounded-xl shadow-inner px-2" 
    placeholder={placeholder} id={id} name={id} type={type}/>
  )
}

export default CustomInput
