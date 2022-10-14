import store from '@/store'
import axios from 'axios'

const newRoom = axios.create({
  url: `${process.env.VUE_APP_API_URL}chat/rooms`,
  headers: {
    authorization: `Bearer ${store.state.userInfo.token}`
  }
})

export default newRoom