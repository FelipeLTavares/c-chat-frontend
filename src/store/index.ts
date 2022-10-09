import { createStore } from 'vuex'

import { UserInfo } from '@/types'

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
