import { atom } from "recoil"

export const BACKENDURL = "http://10.125.121.212:8080"

export const AtomIsLogin = atom({
    key: "isLogin",
    default: false,
})