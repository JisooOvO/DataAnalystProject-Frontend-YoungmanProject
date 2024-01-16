import { atom } from "recoil"
import DigitalSearch from "../../image/DigitalSearch"

export const BACKENDURL = "http://10.125.121.212:8080"

export const AtomIsLogin = atom({
    key: "isLogin",
    default: false,
});

export const AtomCount = atom({
    key: "count",
    default: 0,
})

export const AtomTableRows = atom({
    key: "tableRows",
    default: [],
})

export const AtomWidth = atom({
    key: "innerWidth",
    default: window.innerWidth,
})

export const AtomIsMobile = atom({
    key: "isMobile",
    default: false,
})

export const AtomEmail = atom({
    key: "email",
    default : '',
})

export const AtomImage = atom({
    key: "image",
    default : '',
})

export const AtomImageName = atom({
    key: "imageName",
    default : <p>첨부 파일이 없습니다.</p>,
})

export const AtomReceipt = atom({
    key: "receipt",
    default : 
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-12 h-12 rounded-xl mb-4 bg-custom-blue"><DigitalSearch/></div>
        <p>파일 첨부시 변환된 영수증을</p>
        <p>확인할 수 있습니다</p>
      </div>, 
})

export const AtomIsLoading = atom({
    key : "loading",
    default : false,
})

export const AtomSearchDataRows = atom({
    key : "searchDataRows",
    default : [],
})

export const AtomChangeTable = atom({
    key : "changeTable",
    default : true,
})

export const AtomViewImage = atom({
    key : "viewImage",
    default : "",
})

export const AtomCardView = atom({
    key : "cardView",
    default : "",
})

export const AtomCompanyManageView = atom({
    key : "companyManageView",
    default : "",
})

export const AtomIsCodePass = atom({
    key : "isCodePass",
    default : false,
})

export const AtomAlarmCount = atom({
    key: "alarmCount",
    default : 0
})