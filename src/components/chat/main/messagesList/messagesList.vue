<template>
  <div class="messagesList">
    <MessageBox
      v-for="message in messagesList"
      :key="message.id"
      :userName="message.user.name"
      :messageText="message.text"
      :messageTime="message.created"
      :messageSelf="message.isSelf"
    />
    <div class="fim" ref="fim"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

import MessageBox from "../message/messageBox.vue";
import { MessageInfo } from "@/types";

export default defineComponent({
  name: "messagesList",
  components: {
    MessageBox,
  },
  props: {
    propMessageList: Array,
  },
  data() {
    return {
      messagesList: this.propMessageList as MessageInfo[],
    };
  },
  methods: {
    onChange() {
      (this.$refs.fim as any).scrollIntoView({ behavior: "smooth" });
    },
  },
  updated() {
    this.onChange();
  },
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