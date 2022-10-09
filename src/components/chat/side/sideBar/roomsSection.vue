<template>
  <div class="roomsSection">
    <div class="roomsContainer">
      <RoomCard
        userName="Felipe"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Jirlan"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Felipe"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Jirlan"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Felipe"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Jirlan"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Felipe"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
      <RoomCard
        userName="Jirlan"
        userStatus="Estudando Front-end"
        MTime="00:00"
        MUnread="4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RoomCard from "../RoomCard/RoomCard.vue";

export default defineComponent({
  name: "friendsSection",
  components: { RoomCard },
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
  overflow-y: scroll;
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