<template>
  <div class="InputFileContainer">
    <div class="InputFile">
      <div class="InputsContainer">
        <DocumentsComp
          v-for="(item, index) in sendFilesData.files"
          :index="index"
          :name="item.name"
          :key="item.name"
        />
        <div>
          <label for="arquivo"><PlusCircleOutline /></label>
          <input
            multiple
            ref="filesUploaded"
            type="file"
            name="arquivo"
            id="arquivo"
            @input="fileUpdload()"
          />
        </div>
      </div>
      <CloseCircleOutline class="closeButton" @click="closeFilesModal()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PlusCircleOutline from "../../../../../../node_modules/vue3-material-design-icons-ts/dist/PlusCircleOutline.vue";
import CloseCircleOutline from "../../../../../../node_modules/vue3-material-design-icons-ts/dist/CloseCircleOutline.vue";
import DocumentsComp from "../DocumentsComp/DocumentsComp.vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "InputFile",
  components: {
    PlusCircleOutline,
    CloseCircleOutline,
    DocumentsComp,
  },
  computed: {
    ...mapState(["sendFilesData"]),
  },

  methods: {
    ...mapMutations([
      "SET_FILES_LIST",
      "SHOW_MODAL_INPUT_FILE",
      "DELETE_FILE_OF_THE_LIST",
    ]),
    fileUpdload() {
      this.SET_FILES_LIST([...(this.$refs.filesUploaded as any).files]);
    },
    closeFilesModal() {
      this.SHOW_MODAL_INPUT_FILE();
    },
  },
});
</script>

<style lang="scss">
@import "./InputFile.scss";
</style>