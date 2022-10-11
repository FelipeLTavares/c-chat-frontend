<template>
  <div class="roomCard">
    <img
      class="roomPic"
      src="https://i.picsum.photos/id/996/4272/2848.jpg?hmac=yqRTUY4WFeUSayrtW0dHKMoWx8hd3NQw5TOOKaxZueY"
      alt="roomName"
    />

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
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin: 15px;
  overflow: hidden;
  object-fit: cover;
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