<template>
  <button>
    <DotsVertical :size="30" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DotsVertical from "vue3-material-design-icons-ts/dist/DotsVertical.vue";

export default defineComponent({
  name: "MenuVertical",
  components: {
    DotsVertical,
  },
});
</script>

<style lang="scss">
@import "./MenuButton.scss";
</style>