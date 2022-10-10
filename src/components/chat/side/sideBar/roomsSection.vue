<template>
  <div class="roomsSection">
    <div class="roomsContainer">
      <RoomCard
        v-for="room in listOfRooms"
        :key="room.id"
        :roomName="room.name"
        :roomLastMsgTime="room.lastMessageDatetime"
        :roomAvatar="room.avatarUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Room } from "@/types";
import axios from "axios";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

import RoomCard from "../RoomCard/RoomCard.vue";

export default defineComponent({
  name: "friendsSection",
  data() {
    return {
      listOfRooms: this.roomsList,
    };
  },
  components: { RoomCard },
  computed: {
    ...mapState(["roomsList", "userInfo"]),
  },
  methods: {
    ...mapMutations(["SET_ROOMS_AT_LIST"]),

    async getRooms() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/rooms/${this.userInfo}`)
        .then((res) => {
          const rooms: Room[] = res.data.rooms;
          this.SET_ROOMS_AT_LIST(rooms);
        });
    },
  },
});
</script>

<style scoped lang="scss">
.roomsSection {
  height: calc(100vh - 110px);
  background-color: $c-lightblue;
  border-radius: 14px 14px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.roomsContainer {
  overflow-y: auto;
  scrollbar-color: $c-status-gray $c-lightblue;
  scrollbar-width: thin;
}

::-webkit-scrollbar {
  width: 10px;
  background: $c-lightblue;
}

::-webkit-scrollbar-thumb {
  background: $c-status-gray;
}
</style>