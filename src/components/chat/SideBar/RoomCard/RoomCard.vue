<template>
  <div class="roomCard">
    <img class="roomPic" :src="roomAvatar" alt="roomName" />

    <div class="cardInfo">
      <span class="roomName">{{ roomName }}</span>
      <span class="roomTime">{{ roomLastMsgTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "RoomCard",
  props: {
    roomName: String,
    roomAvatar: String,
    roomLastMsgTime: String,
  },
};
</script>

<style scoped lang="scss">
@import "./RoomCard.scss";
</style>