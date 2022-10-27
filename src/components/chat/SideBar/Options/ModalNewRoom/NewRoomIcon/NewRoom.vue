<template>
  <div class="NewRoom">
    <AccountMultiplePlus class="groupIcon" :size="30" @click="changeForm()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccountMultiplePlus from "vue3-material-design-icons-ts/dist/AccountMultiplePlus.vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "newRoom",
  components: { AccountMultiplePlus },
  data() {
    return {
      roomName: "",
      showModal: false,
    };
  },
  computed: {
    ...mapState(["modal"]),
  },
  methods: {
    ...mapMutations([
      "CHANGE__NEWROOM_MODAL_SHOW",
      "CHANGE_NEWMEMBER_MODAL_SHOW",
    ]),

    changeForm() {
      this.CHANGE__NEWROOM_MODAL_SHOW();
      if (this.modal[1].showNewMemberModal) {
        this.CHANGE_NEWMEMBER_MODAL_SHOW();
      }
    },
  },
});
</script>

<style lang="scss">
@import "./NewRoom.scss";
</style>