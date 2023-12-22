const OuthButton = ({svg,title,func}) => {
  return (
    <button 
    onClick={func}
    className="border rounded-xl w-full h-full shadow-md flex items-center bg-inherit text-inherit border-black">
      <div className="h-full w-[8rem] flex items-center px-5">{svg}</div>
      <p className="whitespace-nowrap w-full text-centertext-inherit pr-5">{title}</p>
    </button>
  )
}

export default OuthButton
