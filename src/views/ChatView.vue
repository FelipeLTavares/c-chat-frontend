<template>
  <div class="containerChat">
    <sideBar />
    <div class="chat">
      <MessagesList :propMessageList="messagesListReady"></MessagesList>
      <div class="inputMessage">
        <input
          type="text"
          class="IM"
          placeholder="Digite sua mensagem"
          v-model="messageToSend"
          @keyup.enter="putNewMessage()"
        />
        <button @click="putNewMessage()">
          Enviar
          <div class="iconeSend"><Send :size="24" /></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import setupWS, { SetupWS } from "@/services/websocket";
import { mapState } from "vuex";
import axios from "axios";

import Send from "vue3-material-design-icons-ts/dist/Send.vue";
import sideBar from "@/components/chat/side/sideBar/sideBar.vue";
import MessagesList from "@/components/chat/main/messagesList/messagesList.vue";

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

interface messageReady {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: string;
  isSelf: boolean;
}

export default defineComponent({
  name: "ChatView",
  data() {
    return {
      userName: "" as string,
      messageToSend: "" as string,
      messageTime: "00:00",

      messagesListRaw: [] as messageRaw[],
      messagesListReady: [] as messageReady[],
      emitEvents: {} as SetupWS,
    };
  },
  components: {
    sideBar,
    MessagesList,
    Send,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    checkIfIsSelfMessageList(messagesListRaw: messageRaw[]) {
      messagesListRaw.forEach((msg) => {
        this.checkIsSelf(msg);
      });
    },

    checkIsSelf(msg: messageRaw) {
      if (msg.user.name === this.userInfo.user.name) {
        let msgg = { ...msg, isSelf: true };
        this.messagesListReady.push(msgg);
      } else {
        let msgg = { ...msg, isSelf: false };
        msgg.isSelf = false;
        this.messagesListReady.push(msgg);
      }
    },

    isLogged() {
      if (!this.userInfo.isLoggedIn) {
        this.$router.push({ name: "Auth" });
      }
    },

    getFirstMessages() {
      axios.get(`${process.env.VUE_APP_URL_TESTE}chat`).then((res) => {
        this.checkIfIsSelfMessageList(res.data.messages);
      });
    },

    putNewMessage() {
      const msg = {
        roomId: this.messagesListReady[0].roomId,
        userId: this.userInfo.user.id,
        text: this.messageToSend,
      };
      this.emitEvents.sendNewMessage(msg);
      this.messageToSend = "";
    },
  },

  mounted() {
    this.isLogged();
    this.getFirstMessages();
    this.emitEvents = setupWS(this.userInfo.token, this.checkIsSelf.bind(this));
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