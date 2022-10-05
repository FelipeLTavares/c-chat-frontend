<template>
  <div class="containerChat">
    <usersSection></usersSection>
    <div class="chat">
      <MessagesList></MessagesList>
      <InputMessage></InputMessage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import usersSection from "../components/chat/usersSection/usersSection.vue";
import InputMessage from "@/components/chat/input/inputMessage.vue";
import MessagesList from "@/components/chat/messagesList/messagesList.vue";

export default defineComponent({
    components: {
    usersSection,
    InputMessage,
    MessagesList
}
})
</script>

<style scoped lang="scss">
.containerChat {
  width: 100%;
  height: 100vh;
  display: flex;
}
.chat{
  height: 100vh;
  width: calc(100% - 350px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

</style>