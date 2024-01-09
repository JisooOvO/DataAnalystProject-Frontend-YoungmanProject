import NavigationText from "./NavigationText"

const LoginFormNav = () => {
  return (
    <div className="flex justify-between whitespace-nowrap text-gray-700 p-1">
        <div className="flex gap-2 sm:gap-7">
            <NavigationText title={"아이디 찾기"} url={"/verify/username"}/>
            <NavigationText title={"비밀번호 찾기"} url={"/verify/password"}/>
        </div>
        <NavigationText title={"회원가입"} url={"/signup"}/>
    </div>
  )
}

export default LoginFormNav
