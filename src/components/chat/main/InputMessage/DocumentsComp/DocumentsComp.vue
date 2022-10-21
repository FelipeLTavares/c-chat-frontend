<template>
  <div class="DocumentsComp">
    <FileDocumentOutline :size="65" class="DocumentIcon" />
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FileDocumentOutline from "../../../../../../node_modules/vue3-material-design-icons-ts/dist/FileDocumentOutline.vue";

export default defineComponent({
  name: "DocumentsComp",
  components: {
    FileDocumentOutline,
  },
  props: {
    name: String,
  },
});
</script>

<style scoped lang="scss">
@import "./DocumentsComp.scss";
</style>