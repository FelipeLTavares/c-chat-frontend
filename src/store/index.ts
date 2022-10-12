import { createStore } from 'vuex'
import axios from 'axios'

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

    roomsList: [] as Room[],

    actualRoom: '' as string,
  },

  mutations: {
    SET_USER_INFO(state, userInfoo: UserInfo) {
      state.userInfo = userInfoo
    },

    SET_MESSAGE_ON_LIST(state, messageReady: MessageReady) {
      state.messagesList.push(messageReady)
    },

    SET_ROOMS_AT_LIST(state, roomsList:Room[]){
      state.roomsList = roomsList
    },

    SET_ACTUAL_ROOM(state, room){
      state.actualRoom = room
    }
  },

  actions: {
    async SET_ROOMS( context ){
      await axios
      .get(`${process.env.VUE_APP_API_URL}rooms/${context.state.userInfo.user.id}`)
      .then( res => {
        const rooms: Room[] = res.data.rooms;
        context.commit('SET_ROOMS_AT_LIST', rooms )
        console.log(rooms)
      });
    }
  }
})
