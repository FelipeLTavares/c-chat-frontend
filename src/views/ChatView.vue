<template>
  <div class="containerChat">
    <usersSection></usersSection>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import usersSection from "../components/chat/usersSection/usersSection.vue";

export default defineComponent({
    components: {
      usersSection
    }
})
</script>

<style scoped lang="scss">
.containerChat {
  width: 100%;
  height: 100vh;
}
</style>