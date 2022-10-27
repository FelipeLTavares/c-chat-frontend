<template>
  <div class="Options">
    <NewRoom />
    <NewMember />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewRoom from "../ModalNewRoom/NewRoomIcon/NewRoom.vue";
import NewMember from "../ModalNewMembers/NewMemberIcon/NewMember.vue";

export default defineComponent({
  name: "OptionsSection",
  components: { NewRoom, NewMember },
});
</script>

<style scoped lang="scss">
@import "./Options.scss";
</style>