import { useNavigate } from "react-router-dom"

const Navigation = ({title, url}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(url);
  }

  return (
    <div onClick={handleNavigate} className="hover:cursor-pointer hover:text-gray-500 drop-shadow-md flex justify-center items-center">
      {title}
    </div>
  )
}

export default Navigation
