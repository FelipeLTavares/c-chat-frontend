<template>
  <div class="newMemberModal">
    <form @submit.stop.prevent="addNewMemberDataSubmit()">
      <h3>Adicionar um novo membro</h3>
      <input
        type="text"
        v-model="memberEmail"
        placeholder="Adicione um membro na sala"
      />
      <div class="buttonsContainer">
        <button
          class="modalButton buttonContained"
          @click.prevent="cancelCreateRoom()"
          :disabled="modal[1].loading"
        >
          <span>Cancelar</span>
        </button>
        <button class="modalButton" type="submit" :disabled="modal[1].loading">
          <span><LoadingComponent v-show="modal[1].loading" />Adicionar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { NewMemberData } from "@/types";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import LoadingComponent from "../../../../../Loading/LoadingComponent.vue";

export default defineComponent({
  name: "ModalNewMembers",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      memberEmail: "",
    };
  },
  computed: {
    ...mapState(["actualRoom", "modal"]),
    ...mapGetters(["actualRoomName"]),
  },
  methods: {
    ...mapMutations(["CHANGE_NEWMEMBER_MODAL_SHOW"]),
    ...mapActions(["ADD_NEW_MEMBER"]),

    modalShow() {
      this.CHANGE_NEWMEMBER_MODAL_SHOW();
    },

    addNewMemberDataSubmit() {
      const newMember: NewMemberData = {
        roomId: this.actualRoom,
        userEmail: this.memberEmail,
      };
      this.ADD_NEW_MEMBER(newMember);
      this.memberEmail = "";
    },

    cancelCreateRoom() {
      this.modalShow();
      this.memberEmail = "";
    },
  },
});
</script>

<style lang="scss">
@import "./ModalNewMembers.scss";
</style>