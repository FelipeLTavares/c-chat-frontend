<template>
  <div class="roomCard">
    <div class="roomPic">
      <img :src="roomAvatar" alt="roomName" />
    </div>
    <div class="cardInfo">
      <span class="roomName">{{ roomName }}</span>
      <span class="roomTime">{{ roomLastMsgTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "roomCard",
  props: {
    roomName: String,
    roomAvatar: String,
    roomLastMsgTime: String,
  },
};
</script>

<style scoped lang="scss">
.roomCard {
  width: 310px;
  height: 74px;
  background-color: $c-royalblue-01;
  border-radius: 14px;
  margin: 10px;
  display: grid;
  grid-template: auto / 73px 237px;
}
.roomPic {
  background-color: black;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin: 15px;
  overflow: hidden;
}
.cardInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .roomName {
    font-weight: 600;
    font-size: 12px;
  }

  .roomTime {
    margin-right: 15px;
    font-weight: 400;
    font-size: 10px;
  }
}
</style>