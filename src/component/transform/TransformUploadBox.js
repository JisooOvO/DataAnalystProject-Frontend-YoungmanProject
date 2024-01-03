import CustomButton from "../../component/common/CustomButton"
import { useRecoilState } from "recoil";
import { AtomImage, AtomImageName, AtomIsLoading, AtomIsMobile, AtomReceipt, BACKENDURL } from "../common/Common";
import CustomCircle from "../../component/common/CustomCircle"
import UploadFile from "../../image/UploadFile"
import Receipt from "./Receipt";

const TransformUploadBox = () => {
  const [fileName, setFileName] = useRecoilState(AtomImageName);
  const [imageUrl, setImageUrl] = useRecoilState(AtomImage);
  const [isMobile, setIsMobile] = useRecoilState(AtomIsMobile);
  const [receiptView, setReceiptView] = useRecoilState(AtomReceipt);
  const [isLoading, setIsLoading] = useRecoilState(AtomIsLoading);

  const handleUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if(selectedFile){
      setFileName(selectedFile.name);
      setReceiptView("");
      const allowedExts = ['.jpg', '.jpeg', '.png'];
      const ext = selectedFile.name.slice(((selectedFile.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

      if (allowedExts.includes(`.${ext}`)) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setImageUrl(e.target.result);
        };

        reader.readAsDataURL(selectedFile);
        
        const formData = new FormData();
        formData.append("image",selectedFile);

        setIsLoading(true);
        fetch(BACKENDURL +'/api/private/receipt/runReceiptOCR', {
          method: 'POST',
          headers: {
            'Authorization': sessionStorage.getItem("token"),
            
          },
          body: formData
        })
        .then(res => {
          setIsLoading(false);
          if(res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          setReceiptView(
            <Receipt data={data}/>
          )
        })
        .catch(err => {
          console.error(err);
        });
      } 
      else{
        alert("확장자가 jpg, jpeg, png 인 파일만 업로드 할 수 있습니다.");
      }
    }
  }
  
  return (
    <form action="" encType="multipart/form-data" className="w-full">
      <label htmlFor="image" className="flex gap-5 w-full justify-center">
          <input onChange={handleUpload} id="image" type="file" className="hidden w-full"/>
            <div className="border border-black rounded-xl w-[80%] h-12 flex items-center p-4">
              {fileName ? fileName : ''}
            </div>
          <div className="hover:cursor-pointer flex flex-col justify-center">
            {
              isMobile ?
              <div className="w-12 h-12"><CustomCircle svg={<UploadFile/>}/></div>
              :
              <div className="w-40 h-12 text-white font-bold"><CustomButton title={"파일 첨부"}/></div>
            }
          </div>
      </label>
    </form>
  )
}

export default TransformUploadBox