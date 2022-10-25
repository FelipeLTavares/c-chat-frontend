<template>
  <div class="MBFileComp">
    <div class="Container">
      <div class="Document" v-for="item in list" :key="item.name">
        <DownloadCircleOutline
          class="downloadIcon"
          :size="30"
          v-show="item.available"
          @click="downloadUrl(item.id, item.name)"
        />
        <FileDocumentOutline
          :class="{ documentIcon: true, notAvailable: !item.available }"
          :size="60"
        />
        <span class="name">{{ item.name }}</span>
        <span class="typeAndSize">{{ item.type }} - {{ item.size }}</span>
      </div>
    </div>
    <a ref="linkDownload" target="_blank"></a>
  </div>
</template>

<script lang="ts">
import { MessageFile } from "@/types";
import axios from "axios";
import { defineComponent } from "vue";

import DownloadCircleOutline from "vue3-material-design-icons-ts/dist/DownloadCircleOutline.vue";
import FileDocumentOutline from "vue3-material-design-icons-ts/dist/FileDocumentOutline.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default defineComponent({
  components: {
    FileDocumentOutline,
    DownloadCircleOutline,
  },

  props: {
    name: String,
    list: Object as () => MessageFile[],
  },

  computed: {
    ...mapState(["fileUrls"]),
  },

  methods: {
    ...mapActions(["DOWNLOAD_FILE"]),
    ...mapMutations(["SET_FILE_URL"]),

    async downloadUrl(id: string, name: string) {
      const response = await this.DOWNLOAD_FILE(id);
      this.SET_FILE_URL(response.url);

      const responseFile = await axios.get(response.url);
      const fileUrl = URL.createObjectURL(new Blob([responseFile.data]));

      const linkDownload = this.$refs.linkDownload as any;
      linkDownload.href = fileUrl;
      linkDownload.download = name;
      linkDownload.click();

      URL.revokeObjectURL(fileUrl);
    },
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

        &:hover {
          color: $c-royalblue;
          cursor: pointer;
        }
      }

      .documentIcon {
        grid-area: b;

        &.notAvailable {
          opacity: 0.6;
        }
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
        padding-left: 5px;
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