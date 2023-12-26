const CustomCircle = ({svg,func,id}) => {
  return (
    <div
    id={id}
    onClick={func}
    tabIndex={-1}
    className="w-full h-full hover:cursor-pointer rounded-[50%] bg-custom-blue shadow-md flex justify-center items-center hover:opacity-70">
      {svg}
    </div>
  )
}

export default CustomCircle
