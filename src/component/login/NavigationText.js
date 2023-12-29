import { useNavigate } from "react-router-dom"

const NavigationText = ({title, url}) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(url);
  } 

  return (
    <p
    onClick={handleNav} 
    className="hover:text-gray-500 hover:cursor-pointer text-inherit sm:text-base text-[80%]">{title}</p>
  )
}

export default NavigationText
