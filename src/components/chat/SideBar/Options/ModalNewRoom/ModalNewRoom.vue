<template>
  <div class="newGroupModal">
    <form @submit.stop.prevent="createRoomDataSubmit()">
      <h3>Crie uma nova sala</h3>
      <input
        type="text"
        v-model="roomName"
        placeholder="Digite o nome da nova sala"
      />
      <div class="buttonsContainer">
        <button
          class="modalButton buttonContained"
          @click.prevent="cancelCreateRoom()"
          :disabled="modal[0].loading"
        >
          <span>Cancelar</span>
        </button>
        <button class="modalButton" type="submit" :disabled="modal[0].loading">
          <span><LoadingComponent v-show="modal[0].loading" />Criar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import LoadingComponent from "../../../../UI/Loading/LoadingComponent.vue";

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
    ...mapMutations(["CHANGE__NEWROOM_MODAL_SHOW"]),
    ...mapActions(["CREATE_NEW_ROOM"]),

    modalShow() {
      this.CHANGE__NEWROOM_MODAL_SHOW();
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
@import "./ModalNewRoom.scss";
</style>