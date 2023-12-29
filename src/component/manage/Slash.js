import { useEffect, useState } from "react";

const Slash = () => {
  const [slash,setSlash] = useState("");
  let isEven = true;
  useEffect(()=>{
    for(let i = 0 ; i <= 95 ; i = i + 5) {
        if(isEven)
            setSlash(slash => slash + `white ${i}%, white ${i+5}%,`);
        else
            setSlash(slash => slash + `#57677E ${i}%, #57677E ${i+5}%,`);
        isEven = !isEven;
      }
    setSlash(slash => "linear-gradient(-45deg," + slash.slice(0,-1) + ")");
  },[])

  return (
    <div style={{ background: slash }} className="w-full h-full"></div>
  )
}

export default Slash