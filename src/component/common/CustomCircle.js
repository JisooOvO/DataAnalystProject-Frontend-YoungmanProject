const CustomCircle = ({svg,func,id}) => {
  return (
    <button
    id={id}
    onClick={func}
    tabIndex={-1}
    className="w-full h-full rounded-[50%] bg-custom-blue shadow-md flex justify-center items-center hover:opacity-70">
      {svg}
    </button>
  )
}

export default CustomCircle
