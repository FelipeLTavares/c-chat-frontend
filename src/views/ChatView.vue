<template>
  <div class="containerChat">
    <usersSection></usersSection>
    <div class="chat">
      <MessagesList></MessagesList>
      <div class="inputMessage">
        <input type="text" class="IM" placeholder="Digite sua mensagem" v-model="messageToSend" />
        <button @click="teste()">
          Enviar
          <div class="iconeSend"><Send :size="24" /></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import messagesList from './../functions/messages'

import Send from "vue3-material-design-icons-ts/dist/Send.vue";
import usersSection from "@/components/chat/side/usersSection/usersSection.vue";
import MessagesList from "@/components/chat/main/messagesList/messagesList.vue";

interface messageInfo {
  userName: string,
  messageText: string,
  messageTime: string,
  isSelf: boolean
}

export default defineComponent({
  name: 'ChatView',
  data(){
    return{
      userName: '' as string,
      messageToSend: '' as string,
      messageTime: '00:00',
      
      messagesList: messagesList as messageInfo[]
    }
  },
  components: {
    usersSection,
    MessagesList,
    Send,
  },
  methods:{
    teste(){
      console.log(this.messageToSend)
    }
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
</style>