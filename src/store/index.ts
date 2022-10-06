import { createStore } from 'vuex'

interface UserInfo {
  user: {
    id: string,
    name: string,
    email: string,
    avatarUrl: string
  },
  token: string,
  isLoggedIn: boolean
}

export default createStore({

  state: {
    userInfo: {
      user: {
        id: '' as string,
        name: '' as string,
        email: '' as string,
        avatarUrl: '' as string
      },
      token: '' as string,
      isLoggedIn: false as boolean
    }
  },

  mutations: {
    SET_USER_INFO(state, userInfoo: UserInfo) {
      state.userInfo = userInfoo
    }
  }
})
