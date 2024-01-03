import { useRecoilState } from "recoil"
import { AtomImage, AtomImageName, AtomIsLoading, AtomReceipt, BACKENDURL } from "../common/Common"
import UploadIcon from "../../image/UploadIcon"
import Receipt from "./Receipt";

const TransformImageBox = () => {
  const [imageUrl, setImageUrl] = useRecoilState(AtomImage);
  const [fileName, setFileName] = useRecoilState(AtomImageName);
  const [receiptView, setReceiptView] = useRecoilState(AtomReceipt);
  const [isLoading, setIsLoading] = useRecoilState(AtomIsLoading);

  const handleDragOver = (e) => {
    e.preventDefault();
    const dragZone = document.querySelector("#dragZone");
    dragZone.style.border = '2px dashed #333';
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    const dragZone = document.querySelector("#dragZone");
    dragZone.style.border = '1px solid #e5e7eb';
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const dragZone = document.querySelector("#dragZone");
    dragZone.style.border = '1px solid #e5e7eb';
    const selectedFile = e.dataTransfer.files[0];
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
          setIsLoading(false)
          if(res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          setReceiptView(
            <Receipt data={data}/>
          )
        })
        .catch(e => {
          console.log(e);
        });
      }
      else{
        alert("확장자가 jpg, jpeg, png 인 파일만 업로드 할 수 있습니다.");
      }
    }       
  }
  
  return (
    <div className="mt-10 w-full h-fit gap-5 grid grid-cols-1 lg:grid-cols-2">
      <div id="dragZone" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
      className="h-[40rem] flex justify-center items-center border border-black">
      {
        imageUrl ? 
          <img src={imageUrl} className="h-full w-full" alt="영수증 사진"/>
        :
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-xl mb-4 bg-custom-blue"><UploadIcon/></div>
            <p>확장자가 JPG, JPEG, PNG인</p>
            <p>파일을 첨부할 수 있습니다</p>
          </div>
      }
      </div>
      <div className="h-[40rem] flex justify-center items-center border border-black overflow-scroll overflow-x-hidden">
        { receiptView }
      </div>
    </div>
  )
}

export default TransformImageBox