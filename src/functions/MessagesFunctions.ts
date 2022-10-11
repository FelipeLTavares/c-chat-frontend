/* import store from '@/store'
import axios from 'axios'

export function setarSala (msg:string){ store.commit('SET_ACTUAL_ROOM', msg)}

export function getarSala ():string {
  return store.state.actualRoom
}

export async function chooseRoom(roomId: string){
  await axios.post(`${process.env.VUE_APP_API_URL}`, {roomId})
  .then( ( (res) => {
    if(res.status === 200){
      store.commit('SET_ACTUAL_ROOM', roomId)
      res.data.messages.forEach(msg  => {
        store.dispatch('SET_MESSAGE_ON_LIST', msg)
      });
    } else {
      window.alert('Ocorreu um ero tente novamente mais tarde')
    }
  }))
} */