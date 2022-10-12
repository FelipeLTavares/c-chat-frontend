<template>
  <aside>
    <profileSection />
    <roomsSection />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import profileSection from "@/components/chat/SideBar/sideBar/Profile/profileSection.vue";
import roomsSection from "@/components/chat/SideBar/sideBar/Rooms/roomsSection.vue";

export default defineComponent({
  name: "SideBar",
  components: {
    profileSection,
    roomsSection,
  },
});
</script>

<style scoped lang="scss">
aside {
  width: 350px;
  height: 100vh;
}
</style>