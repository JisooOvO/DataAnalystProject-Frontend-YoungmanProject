const CustomButton = ({id,title,func}) => {
  return (
    <button
      id={id}
      onClick={func}
      className="w-full h-full rounded-xl shadow-md text-inherit bg-custom-blue hover:opacity-70 flex justify-center items-center">
      {title}
    </button>
  )
}

export default CustomButton
