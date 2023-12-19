const CustomButton = ({width, height, title, func}) => {
  return (
    <button onClick={func} 
    style={{height : height, width : width, backgroundColor : "#EEBEA2"}} 
    className={`rounded-xl text-white font-bold text-lg shadow-xl hover:cursor-pointer hover:text-gray-100`}>
        {title}
    </button>
  )
}

export default CustomButton
