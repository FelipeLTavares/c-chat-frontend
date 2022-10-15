<template>
  <div class="NewRoom">
    <AccountMultiplePlus class="groupIcon" :size="30"></AccountMultiplePlus>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccountMultiplePlus from "vue3-material-design-icons-ts/dist/AccountMultiplePlus.vue";

export default defineComponent({
  name: "newRoom",
  components: { AccountMultiplePlus },
});
</script>

<style lang="scss">
@import "./NewRoom.scss";
</style>