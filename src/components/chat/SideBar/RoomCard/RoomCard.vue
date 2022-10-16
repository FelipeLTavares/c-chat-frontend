<template>
  <div class="roomCard" @click="selectRoom()">
    <img class="roomPic" :src="roomAvatar" alt="roomName" />

    <div class="cardInfo">
      <span class="roomName">{{ roomName }}</span>
      <span class="roomTime">{{ roomLastMsgTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "RoomCard",
  props: {
    roomId: String, /////////Lembrar disso
    roomName: String,
    roomAvatar: String,
    roomLastMsgTime: String,
  },
  methods: {
    ...mapActions(["CHANGE_ACTUAL_ROOM"]),
    selectRoom() {
      this.CHANGE_ACTUAL_ROOM(this.roomId);
    },
  },
});
</script>

<style scoped lang="scss">
@import "./RoomCard.scss";
</style>