import NavigationText from "./NavigationText"

const LoginFormNav = () => {
  return (
    <div className="flex justify-between whitespace-nowrap">
        <div className="flex gap-4 sm:gap-10">
            <NavigationText title={"아이디 찾기"}/>
            <NavigationText title={"비밀번호 찾기"}/>
        </div>
        <NavigationText title={"회원가입"}/>
    </div>
  )
}

export default LoginFormNav
