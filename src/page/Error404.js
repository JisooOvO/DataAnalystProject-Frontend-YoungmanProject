import CustomButton from "../component/common/CustomButton"

const Error404 = () => {
  const handleGoBack = () => {
    window.history.go(-1);
  }

  return (
    <div className="w-full flex flex-col items-center mt-40">
      <p className="text-sm sm:text-xl font-bold text-custom-blue mb-16">죄송합니다. URL을 다시 확인해 주세요.</p>
      <div className="flex items-center text-7xl gap-5 text-custom-blue">
        <p className="tracking-wider">404 PAGE</p>
      </div>
      <button onClick={handleGoBack} className="font-bold w-52 text-white h-12 mt-20">
        <CustomButton title={"이전 페이지로 돌아가기"}/>
      </button>
    </div>
  )
}

export default Error404
