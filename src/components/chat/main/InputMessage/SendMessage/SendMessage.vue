<template>
  <div class="SendMessage">
    <div class="inputMessage">
      <Paperclip class="paperclip" @click="SHOW_MODAL_INPUT_FILE()" />
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
    <InputFile v-show="inputFilesModal[0].files" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

import Send from "vue3-material-design-icons-ts/dist/Send.vue";
import Paperclip from "vue3-material-design-icons-ts/dist/Paperclip.vue";
import InputFile from "../InputFile/InputFile.vue";

export default defineComponent({
  name: "ChatView",
  data() {
    return {
      messageToSend: "",
    };
  },
  components: {
    Send,
    InputFile,
    Paperclip,
  },

  computed: {
    ...mapState(["userInfo", "messagesList", "inputFilesModal"]),
  },

  methods: {
    ...mapMutations(["SET_MESSAGE_ON_LIST", "SHOW_MODAL_INPUT_FILE"]),
    ...mapActions(["GET_FIRST_MESSAGES", "SEND_NEW_MESSAGE"]),

    isLogged() {
      if (!this.userInfo.isLoggedIn) {
        this.$router.push({ name: "Auth" });
      }
    },

    pushNewMessage() {
      const msg = {
        roomId: this.messagesList[0].roomId,
        userId: this.userInfo.user.id,
        text: this.messageToSend,
      };
      this.SEND_NEW_MESSAGE(msg);
      this.messageToSend = "";
    },
  },

  mounted() {
    this.isLogged();
    this.GET_FIRST_MESSAGES();
  },
});
</script>

<style scoped lang="scss">
@import "./SendMessage.scss";
</style>