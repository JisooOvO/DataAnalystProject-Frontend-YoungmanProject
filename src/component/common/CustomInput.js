const CustomInput = ({type,placeholder,id,state,func, defaultValue}) => {
  const handleInputChange = () => {
    if(state) state(true);
  }

  return (
    <input 
    onChange={handleInputChange}
    onKeyUp={func}
    className="bg-white border w-full h-full rounded-xl shadow-inner px-2" 
    placeholder={placeholder} id={id} name={id} type={type} defaultValue={defaultValue
    }/>
  )
}

export default CustomInput
