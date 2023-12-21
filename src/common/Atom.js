import { atom } from 'recoil';

let AtomIsLogin = atom({
  key: 'isLogin',
  default: false,
});

export default AtomIsLogin;

export let AtomChangeCategory = atom({
  key : 'changeCategory',
  default : 0,
})


