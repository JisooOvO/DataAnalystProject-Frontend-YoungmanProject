import OsMap from "./OsMap"

const MapComponent = () => {
  return (
    <div className="w-[80%] h-full relative flex justify-center items-center">
        <form className="bg-white border absolute top-10 p-1 w-[80%] z-[9999] flex gap-2 justify-center">
          <div>🔎</div>
          <input className="w-[75%] border shadow-inner px-2" type="text" placeholder={"검색어를 입력하세요"}/>
          <button className="flex justify-center border">검색</button>
        </form>
        <OsMap/>
    </div>
  )
}

export default MapComponent
