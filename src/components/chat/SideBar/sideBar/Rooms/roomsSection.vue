<template>
  <div class="roomsSection">
    <SideModal v-show="modal.showModal" />
    <div class="roomsContainer" v-show="!modal.showModal">
      <RoomCard
        v-for="room in roomsList"
        :key="room.id"
        :roomId="room.id"
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
import SideModal from "../Options/Modal/SideModal.vue";

export default defineComponent({
  name: "roomsSection",
  components: { RoomCard, SideModal },
  computed: {
    ...mapState(["roomsList", "modal", "userInfo"]),
    ...mapGetters(["getRoomsList"]),
  },

  methods: {
    ...mapActions(["SET_ROOMS"]),
  },

  mounted() {
    /*     if(this.userInfo.isLoggedIn){

    } */
    this.SET_ROOMS();
  },
});
</script>

<style scoped lang="scss">
@import "./roomsSection.scss";
</style>