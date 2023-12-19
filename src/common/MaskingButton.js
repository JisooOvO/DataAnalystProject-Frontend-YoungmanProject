const MaskingButton = () => {
  const handleMaskingToggleButton = (e) => {
    e.preventDefault();
    const targetElem = e.target.parentElement.previousSibling.children[1].children[0];
    if(targetElem.type === "password")
      targetElem.type = "text";
    else
      targetElem.type = "password";
  }
  return (
    <button
    onClick={handleMaskingToggleButton}
    className="flex justify-center items-center w-9 h-9 rounded-[50%] bg-[#EEBEA2] shadow-md hover:bg-[#F0A16D]">🔍</button>
  )
}

export default MaskingButton
