<template>
  <div class="MBFileComp">
    <div class="Container">
      <div class="Document" v-for="item in list" :key="item.name">
        <DownloadCircleOutline
          class="downloadIcon"
          :size="30"
          v-show="item.available"
          @click="downloadFile(item.id, item.name, item.type)"
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
import { downloadFile } from "@/services/api/downloadFile";
import { MessageFile } from "@/types";
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

    async downloadFile(id: string, name: string, type: string) {
      const { url } = await this.DOWNLOAD_FILE(id);
      this.SET_FILE_URL(url);
      await downloadFile(url, name, type);
    },
  },
});
</script>

<style lang="scss">
@import "./MBFileComponent.scss";
</style>