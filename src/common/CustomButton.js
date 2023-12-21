const CustomButton = ({width, height, title, func}) => {
  return (
    <button onClick={func} 
    style={{height : height, width : width}} 
    className={`rounded-xl text-white font-bold text-lg shadow-xl hover:cursor-pointer bg-[#EEBEA2] hover:bg-[#F0A16D] hover:text-gray-100`}>
        {title}
    </button>
  )
}

export default CustomButton
