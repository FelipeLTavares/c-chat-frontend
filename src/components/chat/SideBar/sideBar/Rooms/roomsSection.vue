<template>
  <div class="roomsSection">
    <div class="roomsContainer">
      <RoomCard
        v-for="room in roomsList"
        :key="room.id"
        :roomName="room.name"
        :roomLastMsgTime="room.lastMessageDatetime"
        :roomAvatar="room.avatarUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

import RoomCard from "@/components/chat/SideBar/RoomCard/RoomCard.vue";

export default defineComponent({
  name: "roomsSection",
  components: { RoomCard },
  computed: {
    ...mapState(["roomsList"]),
    ...mapGetters(["getRoomsList"]),
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
@import "./roomsSection.scss";
</style>