<template>
  <div class="DocumentsComp">
    <CloseCircleOutline
      class="close"
      :size="16"
      @click="DELETE_FILE_OF_THE_LIST(index)"
    />
    <FileDocumentOutline :size="65" class="DocumentIcon" />
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FileDocumentOutline from "../../../../../../node_modules/vue3-material-design-icons-ts/dist/FileDocumentOutline.vue";
import CloseCircleOutline from "../../../../../../node_modules/vue3-material-design-icons-ts/dist/CloseCircleOutline.vue";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "DocumentsComp",
  components: {
    FileDocumentOutline,
    CloseCircleOutline,
  },
  props: {
    name: String,
    index: Number,
  },

  methods: {
    ...mapMutations(["DELETE_FILE_OF_THE_LIST"]),
  },
});
</script>

<style scoped lang="scss">
@import "./DocumentsComp.scss";
</style>