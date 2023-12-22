const CustomInput = ({type,placeholder,id,state,func}) => {
  const handleInputChange = () => {
    if(state) state(true);
  }

  return (
    <input 
    onChange={handleInputChange}
    onKeyUp={func}
    className="bg-white border border-black w-full h-full rounded-xl shadow-inner px-2" 
    placeholder={placeholder} id={id} name={id} type={type}/>
  )
}

export default CustomInput
