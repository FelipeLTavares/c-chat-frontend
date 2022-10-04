<template>
  <div class="containerChat">
    <usersSection></usersSection>
    <div class="chat">
      <div></div>
      <InputMessage></InputMessage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import usersSection from "../components/chat/usersSection/usersSection.vue";
import InputMessage from "@/components/chat/input/inputMessage.vue";

export default defineComponent({
    components: {
    usersSection,
    InputMessage
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