<template>
  <div class="roomCard">
    <div class="roomPic">
      <img :src="avatarUrl" :alt="roomName" />
    </div>
    <div class="roomInfo">
      <span class="roomName">{{ roomName }}</span>
      <div class="lastMsgTime">{{ lastMessageDatetime }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "roomCard",
  props: {
    roomName: String,
    avatarUrl: String,
    lastMessageDatetime: String,
  },
};
</script>

<style scoped lang="scss">
.roomCard {
  width: 310px;
  height: 74px;
  background-color: $c-royalblue-01;
  border-radius: 14px;
  display: grid;
  grid-template: auto / 73px 237px;
  margin: 10px;
  align-items: center;
}
.roomPic {
  background-color: black;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin: 15px;
  overflow: hidden;
}
.roomInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.roomName {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: $c-text-gray;
}
.lastMsgTime {
  font-weight: 400;
  font-size: 10px;
  margin-right: 15px;
}
</style>