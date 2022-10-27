<template>
  <div class="containerChat">
    <SideBar></SideBar>
    <ChatComponent></ChatComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideBar from "../components/chat/SideBar/SideBarComponent/SideBarComponent.vue";
import ChatComponent from "@/components/chat/main/chatComponent/ChatComponent.vue";

export default defineComponent({
  components: {
    SideBar,
    ChatComponent,
  },
});
</script>

<style scoped lang="scss">
.containerChat {
  display: flex;
}
</style>