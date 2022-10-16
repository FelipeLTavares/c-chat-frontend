<template>
  <div class="newGroupModal">
    <form @submit.stop.prevent="createRoomDataSubmit()">
      <input
        type="text"
        v-model="roomName"
        placeholder="Digite o nome da nova sala"
      />
      <button
        class="modalButton buttonContained"
        @click.prevent="cancelCreateRoom()"
        :disabled="modal.loading"
      >
        <span>Cancelar</span>
      </button>
      <button
        class="modalButton"
        type="submit"
        :disabled="modal.loading"
        @click.prevent="createRoomDataSubmit()"
      >
        <span><LoadingComponent v-show="modal.loading" />Criar</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import LoadingComponent from "../../../../../Loading/LoadingComponent.vue";

export default defineComponent({
  name: "SideModal",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      roomName: "",
    };
  },
  computed: {
    ...mapState(["modal"]),
  },
  methods: {
    ...mapMutations(["CHANGE_MODAL_SHOW"]),
    ...mapActions(["CREATE_NEW_ROOM"]),

    modalShow() {
      this.CHANGE_MODAL_SHOW();
    },

    createRoomDataSubmit() {
      this.CREATE_NEW_ROOM(this.roomName);
      this.roomName = "";
    },

    cancelCreateRoom() {
      this.modalShow();
      this.roomName = "";
    },
  },
});
</script>

<style lang="scss">
@import "./SideModal.scss";
</style>