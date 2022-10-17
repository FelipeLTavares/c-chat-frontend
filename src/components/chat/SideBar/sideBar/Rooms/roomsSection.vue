<template>
  <div class="roomsSection">
    <ModalNewRoom v-show="modal[0].showNewRoomModal" />
    <ModalNewMembers v-show="modal[1].showNewMemberModal" />
    <div
      class="roomsContainer"
      v-show="!modal[1].showNewMemberModal && !modal[0].showNewRoomModal"
    >
      <RoomCard
        v-for="room in roomsList"
        :key="room.id"
        :roomId="room.id"
        :roomName="room.name"
        :roomLastMsgTime="room.lastMessageDatetime"
        :roomAvatar="room.avatarUrl"
        :selected="actualRoom === room.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

import RoomCard from "@/components/chat/SideBar/RoomCard/RoomCard.vue";
import ModalNewRoom from "../Options/ModalNewRoom/ModalNewRoom.vue";
import ModalNewMembers from "../Options/ModalNewMembers/ModalNewMembers.vue";

export default defineComponent({
  name: "roomsSection",
  components: { RoomCard, ModalNewRoom, ModalNewMembers },
  computed: {
    ...mapState(["roomsList", "modal", "userInfo", "actualRoom"]),
  },

  methods: {
    ...mapActions(["SET_ROOMS"]),
    ...mapMutations([
      "CHANGE__NEWROOM_MODAL_SHOW",
      "CHANGE_NEWMEMBER_MODAL_SHOW",
    ]),
  },

  mounted() {
    console.log(this.modal[0].showNewRoomModal);
    this.SET_ROOMS();
  },
});
</script>

<style scoped lang="scss">
@import "./roomsSection.scss";
</style>