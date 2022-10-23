<template>
  <div class="chat">
    <MessagesList :propMessageList="messagesList[actualRoom]"></MessagesList>
    <SendMessage></SendMessage>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import MessagesList from "../../main/messagesList/messagesList.vue";
import SendMessage from "../../main/InputMessage/SendMessage/SendMessage.vue";

export default defineComponent({
  name: "ChatComponent",
  components: {
    MessagesList,
    SendMessage,
  },
  computed: {
    ...mapState(["messagesList", "actualRoom"]),
  },
});
</script>

<style lang="scss">
@import "./ChatComponent.scss";
</style>