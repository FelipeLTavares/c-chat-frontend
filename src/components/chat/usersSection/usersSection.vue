<template>
  <aside>
    <profileSection/>
    <friendsSection/>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import profileSection from './profileSection.vue';
import friendsSection from './friendsSection.vue';

export default defineComponent({
  name: "usersSection",
  components: {
    profileSection,
    friendsSection
}
})
</script>

<style scoped lang="scss">
  aside{
    width: 350px;
    height: 100vh;
  }
</style>