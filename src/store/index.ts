import { createStore } from "vuex";
import axios from "axios";

import { CreateUserData, MessageRaw, MessageReady, Room, SignInData } from "@/types";
import { SocketClient } from "@/services/websockets/socketClient";
import { signIn } from "@/services/api/signIn";
import { createUser } from "@/services/api/createUser";
import { ChatMessageEvents } from "@/services/websockets/socketEventsHandlers";
import { getFisrtMessages } from "@/services/api/getFirstMessages";

const socketClient = new SocketClient();
const chatMessageEvents = new ChatMessageEvents(socketClient);

export default createStore({
  state: {
    createdUserInfo: {
      isLoading: false,
      createdSuccess: false,
    },

    userInfo: {
      user: {
        id: "",
        name: "",
        email: "",
        avatarUrl: "",
      },
      token: "",
      isLoggedIn: false,
      isLogedLoading: false,
      isLogedError: false,
    },

    messagesList: [] as MessageReady[],

    roomsList: [] as Room[],

    actualRoom: "",
  },

  mutations: {
    SET_CERATED_USER_LOADING(state) {
      state.createdUserInfo.isLoading = true;
    },

    SET_CERATED_USER(state, createdUserSuccess: boolean) {
      state.createdUserInfo.createdSuccess = createdUserSuccess;
      state.createdUserInfo.isLoading = false;
    },

    SET_USER_INFO(state, signInData: SignInData) {
      state.userInfo.user = signInData.user;
      state.userInfo.token = signInData.token;
      state.userInfo.isLoggedIn = true;
      state.userInfo.isLogedLoading = false;
    },

    SET_SIGNIN_LOADING(state) {
      state.userInfo.isLogedLoading = true;
      state.userInfo.isLogedError = false;
    },

    SET_SIGNIN_ERROR(state) {
      state.userInfo.isLogedError = true;
      state.userInfo.isLogedLoading = false;
    },

    SET_IS_LOGGEDIN(state, isLoggedIn: boolean) {
      state.userInfo.isLoggedIn = isLoggedIn;
      state.userInfo.isLogedLoading = false;
    },

    SET_MESSAGE_ON_LIST(state, messages: MessageRaw[]) {
      for (const message of messages) {
        if (message.user.id === state.userInfo.user.id) {
          const currentMessage: MessageReady = { ...message, isSelf: true };
          state.messagesList.push(currentMessage);
          continue;
        }

        const currentMessage: MessageReady = { ...message, isSelf: false };
        state.messagesList.push(currentMessage);
      }
    },

    SET_ROOMS_AT_LIST(state, roomsList: Room[]) {
      state.roomsList = roomsList;
    },

    SET_ACTUAL_ROOM(state, roomInfo) {
      state.actualRoom = roomInfo;
    },

    SET_NEW_ROOM(state, room:Room){
      state.roomsList.push(room)
    }
  },

  actions: {
    async CREATE_USER(context, userData: CreateUserData) {
      context.commit("SET_CERATED_USER_LOADING");

      const createdUserSuccess = await createUser(userData);
      context.commit("SET_CERATED_USER", createdUserSuccess);
    },

    async SIGNIN(context, signInUserData: { email: string; password: string }) {
      context.commit("SET_SIGNIN_LOADING");

      const signInData = await signIn(signInUserData.email, signInUserData.password);

      if (signInData) {
        context.commit("SET_USER_INFO", signInData);
        socketClient.connect(signInData.token);
        return;
      }

      context.commit("SET_SIGNIN_ERROR");
    },

    async GET_FIRST_MESSAGES(context) {
      const messages = await getFisrtMessages();
      context.commit("SET_MESSAGE_ON_LIST", messages);
    },

    async SET_ROOMS(context) {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}chat/rooms/${context.state.userInfo.user.id}`
      );

      const rooms: Room[] = response.data.rooms;
      context.commit("SET_ROOMS_AT_LIST", rooms);
    },
  },

  getters: {
    getRoomsList(state) {
      return state.roomsList;
    },
  },
});
