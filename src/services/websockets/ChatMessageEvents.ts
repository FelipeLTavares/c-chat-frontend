import store from "@/store";
import { MessageRaw, SendNewMessageData } from "@/types";
import { SocketClient } from "./socketClient";

export class ChatMessageEvents {
  constructor(private readonly socket: SocketClient) {}

  newMessage() {
    this.socket.on<MessageRaw>("NEW_MESSAGE", (msg) => {
      store.dispatch("RECEIVE_NEW_MESSAGE", msg);
    });
  }

  sendNewMessage(msg: SendNewMessageData) {
    this.socket.emit("NEW_MESSAGE", msg);
  }

  uploadMessageFile(msgData: any) {
    this.socket.emit("UPLOAD_MESSAGE_FILE", msgData);
  }
}
