import store from '@/store'

export default function Vaidarcerto() {
  console.log(store.state.userInfo.user.name)
}