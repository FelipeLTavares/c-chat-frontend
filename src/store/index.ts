import { createStore } from 'vuex'

interface UserInfo {
  user: {
    id: string,
    name: string,
    email: string,
    avatarUrl: string
  },
  token: string
}

export default createStore({
  state: {
    user: {
      id: '',
      name: '',
      email: '',
      avatarUrl: ''
    },
    token: ''
  },

  mutations: {
    SET_USER_INFO(state, userInfo:UserInfo){
      state = userInfo
    }
  }
})
