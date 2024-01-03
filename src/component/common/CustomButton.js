const CustomButton = ({id,title,func}) => {
  return (
    <div
      id={id}
      onClick={func}
      className="w-full h-full rounded-xl shadow-md text-inherit hover:opacity-80 bg-custom-blue flex justify-center items-center">
      <p>{title}</p>
    </div>
  )
}

export default CustomButton
