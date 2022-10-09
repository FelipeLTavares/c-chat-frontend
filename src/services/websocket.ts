import socketIo from 'socket.io-client'
import { MessageRaw, SendNewMessageData } from '@/types'

export interface SetupWS {
  sendNewMessage: (msg:SendNewMessageData) => void 
}

const setupWS = (token:string, addNewMsg:(msg:MessageRaw) => void):SetupWS => {
  const socketClient = socketIo( process.env.VUE_APP_WEBSOCKET_URL, {
    auth: {
      token    
    }
  } );

  socketClient.on('connect', ()=>{console.log(socketClient.id)})
  socketClient.on('NEW_MESSAGE', (msg)=>{ addNewMsg(msg) })

  const sendNewMessage = (msg:SendNewMessageData)=>{
    socketClient.emit('NEW_MESSAGE', msg)
  }

  return{
    sendNewMessage
  }
}

export default setupWS;