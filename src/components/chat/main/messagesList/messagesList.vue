<template>
  <div class="messagesList">
    <MessageBox
      v-for="message in propMessageList"
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

import MessageBox from "@/components/chat/main/message/messageBox.vue";
import { MessageReady } from "@/types";

export default defineComponent({
  name: "messagesList",
  components: {
    MessageBox,
  },
  props: {
    propMessageList: Object as () => MessageReady[],
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
@import "./messagesList.scss";
</style>