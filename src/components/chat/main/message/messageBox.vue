<template>
  <div class="messageBox" :style="messageStyle">
    <span class="MBUser">{{ userName }}</span>
    <p class="messageBoxText">
      {{ messageText }}
    </p>
    <span class="MBtime">{{ messageTime }}</span>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

import { MessageStyle } from "@/types";

export default defineComponent({
  name: "messageBox",
  components: {},
  props: {
    userName: String,
    messageText: String,
    messageTime: String,
    messageSelf: Boolean,
  },
  data() {
    return {
      selfUser: this.messageSelf,
      boxColor: "flex-end" as string,
      messageStyle: {} as MessageStyle,
      self: {
        alignSelf: "flex-end",
        borderRadius: "15px 0 15px 15px",
        backgroundColor: "orange",
        color: "#FDFDFE",
      } as MessageStyle,
      other: {
        alignSelf: "flex-start",
        borderRadius: "0 15px 15px 15px",
      } as MessageStyle,
    };
  },
  methods: {
    verifyIfSelf() {
      if (this.messageSelf) {
        this.messageStyle = this.self;
      } else {
        this.messageStyle = this.other;
      }
    },
  },
  mounted() {
    this.verifyIfSelf();
  },
});
</script>
  
<style scoped lang="scss">
@import "./messageBox.scss";
</style>