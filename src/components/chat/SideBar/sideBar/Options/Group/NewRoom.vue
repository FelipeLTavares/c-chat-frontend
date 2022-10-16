<template>
  <div class="NewRoom">
    <AccountMultiplePlus
      class="groupIcon"
      :size="30"
      @click="CHANGE_MODAL_SHOW()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccountMultiplePlus from "vue3-material-design-icons-ts/dist/AccountMultiplePlus.vue";
import { mapActions, mapMutations } from "vuex";

export default defineComponent({
  name: "newRoom",
  components: { AccountMultiplePlus },
  data() {
    return {
      roomName: "",
      showModal: false,
    };
  },
  methods: {
    ...mapActions(["CREATE_NEW_ROOM"]),
    ...mapMutations(["CHANGE_MODAL_SHOW"]),

    newRoomRequest() {
      this.CREATE_NEW_ROOM();
    },
  },
});
</script>

<style lang="scss">
@import "./NewRoom.scss";
</style>