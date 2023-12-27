import FindPassword from "./FindPassword"
import FindUsername from "./FindUsername"

const FindBox = ({targetNm}) => {

  return (
    <>
    {
        targetNm === "password" ? <FindPassword targetNm={targetNm}/> : <FindUsername/>
    }
    </>
  )
}

export default FindBox