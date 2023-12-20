import { useRecoilState } from "recoil"
import { BEIGE } from "../../common/Common"
import { AtomChangeCategory } from "../../common/Atom"
import ChangeMyInformation from "./ChangeMyInformation";
import { useEffect } from "react";

const MyPageContents = () => {
  // eslint-disable-next-line
  const [category, setCategory] = useRecoilState(AtomChangeCategory);

  const handleCheckMyInformation = (e) => {
    setCategory(Number(e.target.id.slice(4,5)));
  }

  useEffect(()=>{
    const categories = document.querySelector("#categoryContainer2").childNodes;
    categories.forEach((item)=>{
        if(item.id.slice(4,5) === String(category)){
            item.classList.add("border-b");
            item.classList.add("border-black");
            item.classList.add("font-bold");
        }else{
            item.classList.remove("border-b");
            item.classList.remove("border-black");
            item.classList.remove("font-bold");
        }
    })
  },[category])

  return (
    <section style={{backgroundColor : BEIGE}} className="w-[90%] max-w-[50rem] h-[80%] mt-20 rounded-xl shadow-md py-10 px-5">
      <div className="xl:hidden">
          <p className="text-sm sm:text-base mb-2 drop-shadow-md text-white font-bold">카테고리</p>
          <div className="h-[15%] bg-white mb-5 rounded-lg shadow-inner px-5 py-5">
            <ul id="categoryContainer2" className="w-full h-full flex items-center gap-5 text-xl whitespace-nowrap">
                {
                    ["내 정보 변경","테스트"].map((item,idx) => 
                        <li id={`cate${idx}`} key={`key${idx}`} onClick={handleCheckMyInformation} 
                        className="text-sm sm:text-base w-fit h-fit text-center hover:cursor-pointer hover:text-gray-500">{item}</li>
                    )
                }
            </ul>           
          </div>
      </div>
      <div className="border bg-white shadow-inner rounded-xl w-full h-[80%] xl:h-full py-10 px-5 relative">
        {
            category === 0 ? <ChangeMyInformation/>
            :
            ''
        }
      </div>
    </section>
  )
}

export default MyPageContents
