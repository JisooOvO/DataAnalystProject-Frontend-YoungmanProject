import { useEffect, useState } from "react";

const Loading = () => {
  let wHeight = window.innerHeight;

  const dynamicStyle = {
    height: wHeight
  };

  window.addEventListener('resize', () => {
    wHeight = window.innerHeight;
  });

  let interval = 100;
  useEffect(()=>{
    const bouncer = document.querySelectorAll("#textBounce");
    bouncer.forEach(item => {
      setTimeout(()=>{item.classList.add("animate-bounce")},interval)
      interval = interval + 100;
    })
    
  },[])

  return (
    <div style={dynamicStyle} className="w-full flex flex-col justify-center items-center">
      <svg className="animate-spin  text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <div className="flex text-5xl text-white sm:text-6xl mt-10">
        {
          ["변","환","중","입","니","다","."].map((item,idx) => <div key={`key${idx}`} id='textBounce'>{item}</div>)
        }
      </div>
    </div>
  );
};

export default Loading;