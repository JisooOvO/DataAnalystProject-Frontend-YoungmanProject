const CustomInput = ({type,placeholder}) => {
  return (
    <input className="bg-white border border-black w-full h-full rounded-xl shadow-inner px-2" 
    placeholder={placeholder} type={type}/>
  )
}

export default CustomInput
