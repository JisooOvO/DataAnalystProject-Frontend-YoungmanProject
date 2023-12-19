import LoginLeftImage from "../component/loginPage/LoginLeftImage"
import LoginRightComponent from "../component/loginPage/LoginRightComponent"

const LoginPage = () => {
   return (
     <div id="loginPageContainer" className="w-full h-[calc(100vh-4rem)] flex">
        <LoginLeftImage/>
        <LoginRightComponent/>
     </div>
   )
 }
 
 export default LoginPage
 