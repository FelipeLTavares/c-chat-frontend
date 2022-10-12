<template>
  <div class="containerChat">
    <SideBar></SideBar>
    <div class="chat">
      <MessagesList :propMessageList="messagesList"></MessagesList>
      <div class="inputMessage">
        <input
          type="text"
          class="IM"
          placeholder="Digite sua mensagem"
          v-model="messageToSend"
          @keyup.enter="pushNewMessage()"
        />
        <button @click="pushNewMessage()">
          Enviar
          <div class="iconeSend"><Send :size="24" /></div>
        </button>
      </div>
      <InputMessage></InputMessage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import setupWS, { SetupWS } from "@/services/websocket";
import { mapState, mapMutations } from "vuex";
import axios from "axios";

import Send from "vue3-material-design-icons-ts/dist/Send.vue";
import MessagesList from "@/components/Chat/Main/MessagesList/messagesList.vue";

import { MessageReady, MessageRaw } from "@/types";
import InputMessage from "@/components/Chat/Main/InputMessage/InputMessage.vue";
import SideBar from "@/components/Chat/SideBar/sideBar/SideBar/sideBar.vue";

export default defineComponent({
  name: "ChatView",
  data() {
    return {
      userName: "" as string,
      messageToSend: "" as string,

      messagesListRaw: [] as MessageRaw[],
      messagesListReady: [] as MessageReady[],
      emitEvents: {} as SetupWS,
    };
  },
  components: {
    MessagesList,
    Send,
    InputMessage,
    SideBar,
  },

  computed: {
    ...mapState(["userInfo", "messagesList"]),
  },

  methods: {
    prepareMessage(msg: MessageRaw) {
      if (msg.user.name === this.userInfo.user.name) {
        let msgg: MessageReady = { ...msg, isSelf: true };
        this.SET_MESSAGE_ON_LIST(msgg);
      } else {
        let msgg: MessageReady = { ...msg, isSelf: false };
        this.SET_MESSAGE_ON_LIST(msgg);
      }
    },

    ...mapMutations(["SET_MESSAGE_ON_LIST"]),

    isLogged() {
      if (!this.userInfo.isLoggedIn) {
        this.$router.push({ name: "Auth" });
      }
    },

    async getFirstMessages() {
      await axios.get(`${process.env.VUE_APP_API_URL}chat`).then((res) => {
        res.data.messages.forEach((msg: MessageRaw) => {
          this.prepareMessage(msg);
        });
      });
    },

    pushNewMessage() {
      const msg = {
        roomId: this.messagesList[0].roomId,
        userId: this.userInfo.user.id,
        text: this.messageToSend,
      };
      this.emitEvents.sendNewMessage(msg);
      this.messageToSend = "";
    },
  },

  mounted() {
    this.isLogged();
    this.emitEvents = setupWS(
      this.userInfo.token,
      this.prepareMessage.bind(this)
    );
    this.getFirstMessages();
  },
});
</script>

<style scoped lang="scss">
.containerChat {
  width: 100%;
  height: 100vh;
  display: flex;
}
.chat {
  height: 100vh;
  width: calc(100% - 350px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.inputMessage {
  width: 95%;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(150, 169, 186, 0.7);
  border-radius: 14px;
  overflow: hidden;

  input {
    height: 40px;
    background: #fdfdfd;
    border: none;
    padding: 16px;
    flex: 1;
    outline: none;
  }
  button {
    width: 108px;
    height: 40px;
    background: #6588de;
    color: white;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    border: none;
    border-radius: 14px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.iconeSend {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.messagesList {
  width: 100%;
  height: calc(100vh - 72px);
  padding: 5px 60px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
</style>