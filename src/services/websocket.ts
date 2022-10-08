import socketIo from 'socket.io-client'

interface messageRaw {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: string;
}

interface SendNewMessageData {
  roomId: string;
  userId: string;
  text: string;
}

export interface SetupWS {
  sendNewMessage: (msg:SendNewMessageData) => void 
}

const setupWS = (token:string, addNewMsg:(msg:messageRaw) => void):SetupWS => {
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