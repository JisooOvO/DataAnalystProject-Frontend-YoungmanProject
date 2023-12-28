const CustomButton = ({id,title,func}) => {
  return (
    <div
      id={id}
      onClick={func}
      className="w-full h-full rounded-xl shadow-md text-inherit bg-custom-blue hover:opacity-90 flex justify-center items-center">
      {title}
    </div>
  )
}

export default CustomButton
