<template>
  <div class="MBFileComp">
    <div class="Container">
      <div class="Document" v-for="item in list" :key="item.name">
        <DownloadCircleOutline class="downloadIcon" :size="30" />
        <FileDocumentOutline class="documentIcon" :size="60" />
        <span class="name">{{ item.name }}</span>
        <span class="typeAndSize"
          >{{ item.type.split("/plain") }} - {{ item.size }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FileDocumentOutline from "vue3-material-design-icons-ts/dist/FileDocumentOutline.vue";
import DownloadCircleOutline from "vue3-material-design-icons-ts/dist/DownloadCircleOutline.vue";

export default defineComponent({
  components: {
    FileDocumentOutline,
    DownloadCircleOutline,
  },

  props: {
    name: String,
    list: Array,
  },
});
</script>

<style lang="scss">
.MBFileComp {
  width: 100%;

  .Container {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scrollbar-color: $c-lightgray $c-lightblue;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 10px;
      background: $c-lightblue;
    }

    ::-webkit-scrollbar-thumb {
      background: $c-lightgray;
    }

    .Document {
      width: 200px;
      display: grid;
      grid-template: auto auto/40px 50px 110px;
      grid-template-areas: "a b c" "a b d";
      justify-items: center;
      align-items: center;

      .downloadIcon {
        grid-area: a;
      }

      .documentIcon {
        grid-area: b;
        margin-left: -20px;
      }

      .spanTest {
        width: 100%;
        text-align: center;
        font-size: 12px;
        text-align: start;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name {
        @extend .spanTest;
        grid-area: c;
        font-weight: bold;
      }

      .typeAndSize {
        @extend .spanTest;
        grid-area: d;
      }
    }
  }
}
</style>