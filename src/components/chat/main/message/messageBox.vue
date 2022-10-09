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

/* interface messageStyle {
  alignSelf: string;
  borderRadius: string;
  backgroundColor?: string;
  color?: string;
} */

/* interface MessageInfo {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: string;
  isSelf: boolean;
} */

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
.messageBox {
  max-width: 50%;
  padding: 10px 3%;
  margin: 5px 0;
  background-color: $c-lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.messageBoxText {
  max-width: 95%;
  text-align: left;
  overflow: hidden;
  font-family: "Roboto";
  font-size: 12px;
  align-self: flex-start;
}
.MBUser {
  align-self: flex-start;
  font-family: "Poppins";
  text-decoration: underline;
  padding-bottom: 6px;
  font-weight: 600;
  font-size: 13px;
}
.MBtime {
  align-self: flex-end;
  font-family: "Roboto";
  font-size: 10px;
  margin-top: 6px;
}
</style>