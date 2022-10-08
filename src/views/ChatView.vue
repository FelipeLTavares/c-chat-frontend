<template>
  <div class="containerChat">
    <usersSection></usersSection>
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
        <button @click="getFirstMessages()">TESTE</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import axios from "axios";

/* import newMessagesFile from './../functions/newMessages' */

import Send from "vue3-material-design-icons-ts/dist/Send.vue";
import usersSection from "@/components/chat/side/usersSection/usersSection.vue";
import MessagesList from "@/components/chat/main/messagesList/messagesList.vue";

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface newMessageInfo {
  user: User,
  messageText: string,
  messageTime: string
}

interface messageInfo {
  user: User;
  messageText: string;
  messageTime: string;
  isSelf?: boolean;
}

export default defineComponent({
  name: "ChatView",
  data() {
    return {
      userName: "Felipe Tavares" as string,
      messageToSend: "" as string,
      messageTime: "00:00",

      messagesListRaw: [] as newMessageInfo[],
      messagesListReady: [] as messageInfo[]
    };
  },
  components: {
    usersSection,
    MessagesList,
    Send,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    putNewMessage() {
      const now = new Date();
      const current = now.getHours() + ':' + now.getMinutes();
      let newMsg = {
        user: {
          id: 'asdasdasd',
          name: 'Felipe Tavares',
          avatarUrl: 'string'
        },
        messageText: this.messageToSend,
        messageTime: current,
        isSelf: true,
      };

      this.messagesListReady.push(newMsg);
      this.messageToSend = "";
    },

    checkIfIsSelf(messagesListRaw:newMessageInfo[]){
      messagesListRaw.forEach( msg => {
        if(msg.user.name === this.userName){
          let msgg:messageInfo = {...msg}
          msgg.isSelf = true
          this.messagesListReady.push(msgg)
        } else {
          let msgg:messageInfo = {...msg}
          msgg.isSelf = false
          this.messagesListReady.push(msgg)
        }
      })
    },

    isLogged(){
      if( !this.userInfo.isLoggedIn ){
        this.$router.push({name: 'Auth'})
      }
    },

    getFirstMessages(){
      axios.get(`${process.env.VUE_APP_URL_TESTE}chat`)
      .then( res => {
        console.log(res.data.messages[0].text)

        this.checkIfIsSelf(res.data.messages)
      })
    }
  },

  mounted(){
    this.isLogged()
    /* this.checkIfIsSelf() */
  }
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