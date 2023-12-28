const MainInforSVGContainer = ({svg,title}) => {
  return (
    <div className="w-48 border mx-auto my-3 bg-custom-blue h-36 flex flex-col justify-center items-center rounded-xl shadow-md">
        <div className="w-full h-20 flex justify-center">{svg}</div>
        <p className="w-full text-white text-center">{title}</p>
    </div>
  )
}

export default MainInforSVGContainer