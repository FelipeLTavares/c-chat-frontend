<template>
  <div class="roomsSection">
    <div class="roomsContainer">
      <RoomCard
        v-for="room in roomList"
        :key="room.id"
        :roomName="room.name"
        :avatarUrl="room.avatarUrl"
        :lastMessageDatetime="room.lastMessageDatetime"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Room } from "@/types";

import RoomCard from "../RoomCard/RoomCard.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "friendsSection",
  data() {
    return {
      listOfRooms: [] as Room[],
    };
  },
  components: { RoomCard },
  computed: {
    ...mapState(["userInfo", "roomList"]),
  },
  methods: {
    ...mapMutations(["SET_ROOMS_LIST"]),

    async getRooms() {
      await axios
        .get(
          `${process.env.VUE_APP_API_URL}/chat/rooms/${this.userInfo.user.id}`
        )
        .then((res) => {
          const Rooms: Room[] = res.data.rooms;
          this.SET_ROOMS_LIST(Rooms);
        })
        .catch((err) => window.alert(err));
    },

    setRoom() {
      this.listOfRooms = this.roomList;
    },
  },
  mounted() {
    this.getRooms();
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