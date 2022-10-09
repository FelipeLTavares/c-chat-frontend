<template>
  <aside>
    <profileSection />
    <roomsSection />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import profileSection from "./profileSection.vue";
import roomsSection from "./roomsSection.vue";

export default defineComponent({
  name: "usersSection",
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