import store from "@/store";
import { MessageFile, MessageRaw, SendNewMessageData } from "@/types";
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

  uploadMessageFileFinish() {
    this.socket.on<MessageFile>("UPLOAD_MESSAGE_FILE_FINISH", (file) => {
      store.commit("UPDATE_MESSAGE_FILE", { file });
    });
  }
}
