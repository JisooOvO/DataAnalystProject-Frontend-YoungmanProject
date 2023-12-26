import { atom } from "recoil"

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