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
      <RoomCard
        roomName="room.name"
        roomLastMsgTime="room.lastMessageDatetime"
        roomAvatar="room.avatarUrl"
      ></RoomCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

import RoomCard from "@/components/chat/SideBar/RoomCard/RoomCard.vue";

export default defineComponent({
  name: "roomsSection",
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
    ...mapActions(["SET_ROOMS"]),
  },

  mounted() {
    this.SET_ROOMS();
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