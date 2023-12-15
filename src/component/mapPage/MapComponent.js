import OsMap from "./OsMap"

const MapComponent = () => {
  return (
    <div className="w-[60%] h-[60%] relative flex justify-center items-center">
        <div className="border absolute top-10 p-1 w-[80%] z-[9999]">
          <input type="text" defaultValue={"검색어를 입력하세요"}/>
        </div>
        <OsMap/>
    </div>
  )
}

export default MapComponent
