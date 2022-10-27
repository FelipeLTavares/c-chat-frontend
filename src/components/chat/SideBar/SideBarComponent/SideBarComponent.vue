<template>
  <aside>
    <profileSection />
    <roomsSection />
    <Options></Options>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import profileSection from "../Profile/profileSection.vue";
import roomsSection from "../Rooms/roomsSection.vue";
import Options from "../Options/Options/Options.vue";

export default defineComponent({
  name: "SideBar",
  components: {
    profileSection,
    roomsSection,
    Options,
  },
});
</script>

<style lang="scss">
@import "./SideBarComponent.scss";
</style>