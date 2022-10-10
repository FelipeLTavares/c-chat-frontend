import { createStore } from 'vuex'

import { UserInfo, MessageReady, Room } from '@/types'

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
    },
    
    messagesList: [] as MessageReady[],

    roomList: [] as Room[]
  },

  mutations: {
    SET_USER_INFO(state, userInfoo: UserInfo) {
      state.userInfo = userInfoo
    },

    SET_MESSAGE_ON_LIST(state, messageReady: MessageReady) {
      state.messagesList.push(messageReady)
    },

    SET_ROOMS_LIST(state, roomsList: Room[]) {
      state.roomList = roomsList
    },
  }
})
