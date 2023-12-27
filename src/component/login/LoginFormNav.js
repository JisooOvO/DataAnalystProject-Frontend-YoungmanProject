import NavigationText from "./NavigationText"

const LoginFormNav = () => {
  return (
    <div className="flex justify-between whitespace-nowrap">
        <div className="flex gap-4 sm:gap-10">
            <NavigationText title={"아이디 찾기"} url={"/verify/username"}/>
            <NavigationText title={"비밀번호 찾기"} url={"/verify/password"}/>
        </div>
        <NavigationText title={"회원가입"} url={"/signup"}/>
    </div>
  )
}

export default LoginFormNav
