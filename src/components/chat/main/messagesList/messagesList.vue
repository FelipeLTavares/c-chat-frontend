<template>
  <div class="messagesList">
    <MessageBox v-for="message in messagesList" :key="message.userName" :userName="message.userName"
      :messageText="message.messageText" :messageTime="message.messageTime" :messageSelf="message.isSelf"
    />
    <div class="fim" ref="fim"></div>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import MessageBox from "../message/messageBox.vue";

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
  props:{
    propMessageList: Array
  },
  data(){
    return{
      messagesList: this.propMessageList as messageInfo[]
    }
  },
  methods:{
    onChange(){
      (this.$refs.fim as any).scrollIntoView({behavior: "smooth"})
    }
  },
  updated(){
    this.onChange()
  }
})
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