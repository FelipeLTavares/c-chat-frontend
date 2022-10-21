<template>
  <div class="InputFileContainer">
    <div class="InputFile">
      <div class="InputsContainer">
        <DocumentsComp
          v-for="item in filesList"
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
      <CloseCircleOutline class="closeButton" @click="clearFiles()" />
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
  data() {
    return {
      list: [{ name: "teste" }, { name: "teste" }, { name: "teste" }],
    };
  },
  components: {
    PlusCircleOutline,
    CloseCircleOutline,
    DocumentsComp,
  },
  computed: {
    ...mapState(["filesList"]),
  },

  methods: {
    ...mapMutations(["SET_FILES_LIST", "SHOW_MODAL_INPUT_FILE"]),
    fileUpdload() {
      this.SET_FILES_LIST((this.$refs.filesUploaded as any).files);
    },
    clearFiles() {
      this.SHOW_MODAL_INPUT_FILE();
      this.SET_FILES_LIST([]);
    },
  },
});
</script>

<style lang="scss">
.InputFileContainer {
  width: calc(96% - 350px);
  position: absolute;
  bottom: 70px;
  display: flex;
}
.InputFile {
  background: $c-royalblue;
  border-radius: 14px;
  width: 100%;
  min-height: 120px;
  color: #fff;
  position: relative;

  display: flex;

  div {
    input[type="file"] {
      display: none;
    }
    label {
      width: 70px;
      height: 70px;
      background-color: $c-royalblue;
      color: #fff;
      border: 2px dashed white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      margin: 5px;
    }
  }
}

.closeButton {
  width: 40px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  grid-area: FIclose;
}

.InputsContainer {
  width: calc(100% - 40px);
  grid-area: FInputs;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}

.InputFile:after {
  content: "";
  position: absolute;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid $c-royalblue;
  bottom: -10px;
  left: 5%;
}
</style>