<template>
  <div :class="{ roomCard: true, selected }">
    <div class="roomContainer" @click="selectRoom()">
      <img class="roomPic" :src="roomAvatar" alt="roomName" />

      <div class="cardInfo">
        <span class="roomName">{{ roomName }}</span>
        <span class="roomTime">{{ roomLastMsgTime }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "RoomCard",
  data() {
    return {
      newMember: "",
      showInput: false,
    };
  },
  props: {
    roomId: String,
    roomName: String,
    roomAvatar: String,
    roomLastMsgTime: String,
    selected: Boolean,
  },
  components: {},
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