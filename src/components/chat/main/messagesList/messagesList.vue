<template>
  <div class="messagesList">
    <MessageBox v-for="message in messagesList" :key="message.userName" :userName="message.userName"
      :messageText="message.messageText" :messageTime="message.messageTime" :messageSelf="message.isSelf"
    />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import MessageBox from "../message/messageBox.vue";
import messages from "../../../../functions/messages";

interface messageInfo {
  userName: string,
  messageText: string,
  messageTime: string,
  isSelf: boolean
}

export default defineComponent({
  name: "messagesList",
  components: {
    MessageBox,
  },
  data(){
    return{
      messagesList: messages as messageInfo[]
    }
  }
});
</script>
  
  <style scoped lang="scss">
.messagesList {
  width: 100%;
  height: calc(100vh - 72px);
  padding: 5px 60px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
</style>