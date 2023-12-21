const CustomButton = ({title,func}) => {
  return (
    <button 
      onClick={func}
      className="w-full h-full border border-black rounded-xl shadow-md text-inherit bg-custom-blue hover:opacity-70 flex justify-center items-center">
      {title}
    </button>
  )
}

export default CustomButton
