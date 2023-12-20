import { useRecoilState } from "recoil"
import { BEIGE } from "../../common/Common"
import { AtomChangeCategory } from "../../common/Atom"
import { useEffect } from "react";
import CategoryHeader from "./CategoryHeader";

const MyPageCategory = () => {
  // eslint-disable-next-line
  const [category, setCategory] = useRecoilState(AtomChangeCategory);

  const handleCheckMyInformation = (e) => {
    setCategory(Number(e.target.id.slice(4,5)));
  }

  useEffect(()=>{
    const categories = document.querySelector("#categoryContainer").childNodes;
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
    <section style={{backgroundColor : BEIGE}} className="hidden xl:block p-7 w-[20%] max-w-[20rem] h-[80%] mt-20 rounded-xl shadow-md">
        <CategoryHeader/>
        <div className="bg-white w-full h-[82%] rounded-xl shadow-inner p-5">
          <ul id="categoryContainer" className="w-full h-full flex flex-col items-center gap-5 text-xl whitespace-nowrap">
            {
              ["내 정보 변경","테스트"].map((item,idx) => 
                  <li id={`cate${idx}`} key={`key${idx}`} onClick={handleCheckMyInformation} 
                  className="w-fit h-fit text-center hover:cursor-pointer hover:text-gray-500">{item}</li>
              )
            }
          </ul>
       </div>
    </section>
  )
}

export default MyPageCategory
