import TitleHeader from "../component/common/TitleHeader"
import SignupForm from "../component/signup/SignupForm"

const Signup = () => {
  return (
    <div className="w-[85%] max-w-[40rem] h-full mx-auto">
      <TitleHeader title={"REGISTER FORM"}/>
      <SignupForm/>
    </div>
  )
}

export default Signup
