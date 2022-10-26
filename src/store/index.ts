import { createStore } from "vuex";

import {
  CreateUserData,
  MessageRaw,
  MessageReady,
  NewMemberData,
  Room,
  SendNewMessageData,
  SignInData,
  UploadFileFinishData,
} from "@/types";
import { SocketClient } from "@/services/websockets/socketClient";
import { signIn } from "@/services/api/signIn";
import { createUser } from "@/services/api/createUser";
import { ChatMessageEvents } from "@/services/websockets/ChatMessageEvents";
import { getFisrtMessages } from "@/services/api/getFirstMessages";
import { HttpClient } from "@/services/api/HttpClient";
import { createRoom } from "@/services/api/createRoom";
import { addMember } from "@/services/api/addMember";
import { RoomEvents } from "@/services/websockets/userAddedToRoomEvents";
import { removeToken, saveToken } from "@/services/localStorage/AuthStorage";
import { getUserInfo } from "@/services/api/getUserInfo";
import router from "@/router";
import { getFileDownloadUrl } from "@/services/api/getFileDownloadUrl";

/* import { modalNewMember, modalNewRoom } from "@/store/StoreModules/ModalStore"; */

const socketClient = new SocketClient();
const chatMessageEvents = new ChatMessageEvents(socketClient);
const roomEvents = new RoomEvents(socketClient);

const httpClient = HttpClient.getInstance();

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

    modal: [
      {
        showNewRoomModal: false,
        loading: false,
      },
      {
        showNewMemberModal: false,
        loading: false,
      },
    ],

    sendFilesData: {
      roomId: "",
      files: [] as File[],
    },

    inputFilesModal: [{ files: false }],

    fileUrls: "",
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
      if (!state.messagesList[state.actualRoom]) {
        state.messagesList[state.actualRoom] = [];
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
      state.actualRoom = roomsList[0].id;
    },

    SET_ACTUAL_ROOM(state, roomId: string) {
      state.actualRoom = roomId;
    },

    SET_NEW_ROOM(state, room: Room) {
      state.roomsList.push(room);
    },

    CHANGE__NEWROOM_MODAL_SHOW(state) {
      state.modal[0].showNewRoomModal = !state.modal[0].showNewRoomModal;
    },

    MODAL_NEWROOM_LOADING(state) {
      state.modal[0].loading = !state.modal[0].loading;
    },

    CHANGE_NEWMEMBER_MODAL_SHOW(state) {
      state.modal[1].showNewMemberModal = !state.modal[1].showNewMemberModal;
    },

    MODAL_NEWMEMBER_LOADING(state) {
      state.modal[1].loading = !state.modal[1].loading;
    },

    ACCOUNT_LOGOUT(state) {
      state.userInfo = {
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
      };
      removeToken();
      router.push("/auth");
    },

    SET_FILES_LIST(state, files: File[]) {
      state.sendFilesData.files = files;
    },

    DELETE_FILE_OF_THE_LIST(state, index: number) {
      state.sendFilesData.files.splice(index, 1);
      state.sendFilesData.files = [...state.sendFilesData.files];
    },

    SHOW_MODAL_INPUT_FILE(state) {
      state.inputFilesModal[0].files = !state.inputFilesModal[0].files;
    },

    SET_FILE_URL(state, payload) {
      state.fileUrls = payload;
    },

    UPDATE_MESSAGE_FILE(state, payload: UploadFileFinishData) {
      const roomId = payload.roomId;
      const msgid = payload.messageId;

      const room = state.messagesList[roomId];
      const messageIndex = room.findIndex((message) => message.id === msgid);
      if (messageIndex === -1) return;

      if (!room[messageIndex].files) return;
      const fileIndex = room[messageIndex]?.files?.findIndex(
        (file) => file.id === payload.file.id
      );

      if (fileIndex === -1 || fileIndex === undefined) return;
      if (room[messageIndex].files) {
        const file = payload.file;
        state.messagesList[payload.roomId][messageIndex].files![fileIndex] =
          file;
      }
    },
  },

  actions: {
    async CREATE_USER(context, userData: CreateUserData) {
      context.commit("SET_CERATED_USER_LOADING");

      const createdUserSuccess = await createUser(userData);
      context.commit("SET_CERATED_USER", createdUserSuccess);
    },

    async SIGNIN(context, signInUserData: { email: string; password: string }) {
      context.commit("SET_SIGNIN_LOADING");

      const signInData = await signIn(
        signInUserData.email,
        signInUserData.password
      );

      if (signInData) {
        context.commit("SET_USER_INFO", signInData);
        saveToken(signInData.token);
        socketClient.connect(signInData.token);
        chatMessageEvents.newMessage();
        chatMessageEvents.uploadMessageFileFinish();
        roomEvents.userAddedToRoom();
        httpClient.setToken(signInData.token);
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
      context.dispatch("GET_FIRST_MESSAGES");
    },

    async CREATE_NEW_ROOM(context, roomName: string) {
      context.commit("MODAL_NEWROOM_LOADING");

      const response = await createRoom({ roomName });

      if (response.createSuccsess === true) {
        context.commit("SET_NEW_ROOM", response.roomInfo);
        context.commit("MODAL_NEWROOM_LOADING");
        context.commit("CHANGE__NEWROOM_MODAL_SHOW");
        return;
      }
      context.commit("MODAL_NEWROOM_LOADING");
      window.alert("Problema ao criar sala... Tente Novamente mais tarde.");
    },

    async ADD_NEW_MEMBER(context, newMember: NewMemberData) {
      context.commit("MODAL_NEWMEMBER_LOADING");

      const response = await addMember(newMember);

      if (response) {
        context.commit("MODAL_NEWMEMBER_LOADING");
        context.commit("CHANGE_NEWMEMBER_MODAL_SHOW");
        return;
      }

      context.commit("MODAL_NEWMEMBER_LOADING");
      window.alert(
        "Problema ao adicionar membro... Tente Novamente mais tarde."
      );
    },

    async CHANGE_ACTUAL_ROOM(context, roomId: string) {
      context.commit("SET_ACTUAL_ROOM", roomId);

      if (!context.state.messagesList[roomId]) {
        context.dispatch("GET_FIRST_MESSAGES");
      }
    },

    async SEND_NEW_MESSAGE(context, message: SendNewMessageData) {
      chatMessageEvents.sendNewMessage(message);
    },

    async SET_TOKEN(context, token: string) {
      httpClient.setToken(token);
      const user = await getUserInfo();
      if (!user) {
        removeToken();
        return;
      }
      const userData = {
        user,
        token,
      };

      context.commit("SET_USER_INFO", userData);
      socketClient.connect(token);
      chatMessageEvents.newMessage();
      chatMessageEvents.uploadMessageFileFinish();
      roomEvents.userAddedToRoom();
    },

    async RECEIVE_NEW_MESSAGE(context, messagegData: MessageRaw) {
      if (messagegData.user.id === context.state.userInfo.user.id) {
        if (!!messagegData.files && messagegData.files.length) {
          for (const file of messagegData.files) {
            const currentFile = context.state.sendFilesData.files.find(
              (fileItem) => fileItem.name === file.name
            );

            const sendFileData = {
              roomId: context.state.actualRoom,
              fileId: file.id,
              data: currentFile,
            };

            chatMessageEvents.uploadMessageFile(sendFileData);
          }
        }
      }

      context.commit("SET_MESSAGE_ON_LIST", [messagegData]);
    },

    async DOWNLOAD_FILE(context, fileId: string) {
      const fileUrl = await getFileDownloadUrl({ fileId });
      return fileUrl;

      console.log(fileUrl);
    },
  },

  getters: {
    getRoomsList(state) {
      return state.roomsList;
    },
  },
});
