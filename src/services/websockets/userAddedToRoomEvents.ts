import store from "@/store";
import {  AddUserToRoomMessageData } from "@/types";
import { SocketClient } from "./socketClient";

export class RoomEvents {
  constructor(private readonly socket: SocketClient) {}

  userAddedToRoom() {
    this.socket.on<AddUserToRoomMessageData>("WAS_ADDED_TO_THE_ROOM", (msg) => {
      store.commit("SET_NEW_ROOM", msg.room);
      console.log(msg)
    });
  }
}