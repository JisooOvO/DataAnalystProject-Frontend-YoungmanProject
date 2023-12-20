const MaskingButton = () => {
    const handleMaskingToggleButton = (e) => {
      e.preventDefault();
      const targetElem = e.target.parentElement.previousSibling;
      if(targetElem.type === "password")
        targetElem.type = "text";
      else
        targetElem.type = "password";
    }
    return (
      <div
      onClick={handleMaskingToggleButton}
      tabIndex={-1}
      className="flex justify-center items-center w-9 h-9 rounded-[50%] bg-[#EEBEA2] shadow-md hover:bg-[#F0A16D] hover:cursor-pointer">
        🔍
      </div>
    )
  }
  
  export default MaskingButton
  