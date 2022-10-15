<template>
  <div class="Options">
    <NewRoom></NewRoom>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewRoom from "./Group/NewRoom.vue";

export default defineComponent({
  name: "OptionsSection",
  components: { NewRoom },
});
</script>

<style scoped lang="scss">
@import "./Options.scss";
</style>