const CustomButton = ({width, height, title, func}) => {
  return (
    <button onClick={func} style={{height : height}} className={`border rounded-md w-${width} text-white font-bold text-[120%] bg-sky-300 hover:bg-sky-400 shadow-lg hover:cursor-pointer`}>
        {title}
    </button>
  )
}

export default CustomButton
