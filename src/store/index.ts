import { createStore } from "vuex";

import { CreateUserData, MessageRaw, MessageReady, Room, SignInData } from "@/types";
import { SocketClient } from "@/services/websockets/socketClient";
import { signIn } from "@/services/api/signIn";
import { createUser } from "@/services/api/createUser";
import { ChatMessageEvents } from "@/services/websockets/socketEventsHandlers";
import { getFisrtMessages } from "@/services/api/getFirstMessages";
import { HttpClient } from "@/services/HttpClient";
import { createRoom } from "@/services/api/createRoom";

const socketClient = new SocketClient();
const chatMessageEvents = new ChatMessageEvents(socketClient);

const httpClient = HttpClient.getInstance()

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

    messagesList: {} as Record<string, MessageReady[]>,

    roomsList: [] as Room[],

    actualRoom: "",

    modal: {
      showModal: false,
      roomName: '',
      loading: false
    }
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
      if(!state.messagesList[state.actualRoom]){
        state.messagesList[state.actualRoom] = []
      }
      for (const message of messages) {
        if (message.user.id === state.userInfo.user.id) {
          const currentMessage: MessageReady = { ...message, isSelf: true };
          state.messagesList[state.actualRoom].push(currentMessage);
          continue;
        }

        const currentMessage: MessageReady = { ...message, isSelf: false };
        state.messagesList[state.actualRoom].push(currentMessage);
      }
    },

    SET_ROOMS_AT_LIST(state, roomsList: Room[]) {
      state.roomsList = roomsList;
      state.actualRoom = roomsList[0].id
    },

    SET_ACTUAL_ROOM(state, roomId: string) {
      state.actualRoom = roomId;
    },

    SET_NEW_ROOM(state, room:Room){
      state.roomsList.push(room)
    },

    CHANGE_MODAL_SHOW(state){
      state.modal.showModal = !state.modal.showModal
    },

    MODAL_LOADING(state){
      state.modal.loading = !state.modal.loading
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
        httpClient.setToken(signInData.token)
        return;
      }

      context.commit("SET_SIGNIN_ERROR");
    },

    async GET_FIRST_MESSAGES(context) {
      const messages = await getFisrtMessages(context.state.actualRoom);
      context.commit("SET_MESSAGE_ON_LIST", messages);
    },

    async SET_ROOMS(context) {
      const response = await httpClient.client.get(
        `/chat/rooms/${context.state.userInfo.user.id}`
      );

      const rooms: Room[] = response.data.rooms;
      context.commit("SET_ROOMS_AT_LIST", rooms);
      context.dispatch('GET_FIRST_MESSAGES')
    },

    async CREATE_NEW_ROOM(context, roomName:string){
      context.commit('MODAL_LOADING')

      const response = await createRoom({roomName})
      
      if(response.createSuccsess === true){
        context.commit( 'SET_NEW_ROOM', response.roomInfo )
        context.commit('MODAL_LOADING')
        return
      }
      context.commit('MODAL_LOADING')
      window.alert('Problema ao criar sala... Tente Novamente mais tarde.')
    },

    async CHANGE_ACTUAL_ROOM(context, roomId: string){

      context.commit("SET_ACTUAL_ROOM", roomId)

      if(!context.state.messagesList[roomId]){
        context.dispatch('GET_FIRST_MESSAGES')
      }
    },

  },

  getters: {
    getRoomsList(state) {
      return state.roomsList;
    },
  },
});
