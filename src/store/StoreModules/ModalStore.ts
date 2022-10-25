interface ModalNewRoomInterface {
  modalNewRoom: { showNewRoomModal: boolean; loading: boolean };
}

interface ModalNewRoomInterface {
  modalNewMember: { showNewMemberModal: boolean; loading: boolean };
}

export const modalNewRoom = {
  state: {
    modalNewRoom: {
      showNewRoomModal: false,
      loading: false,
    },
  },

  mutations: {
    CHANGE__NEWROOM_MODAL_SHOW(state: ModalNewRoomInterface) {
      state.modalNewRoom.showNewRoomModal =
        !state.modalNewRoom.showNewRoomModal;
    },

    MODAL_NEWROOM_LOADING(state: ModalNewRoomInterface) {
      state.modalNewRoom.loading = !state.modalNewRoom.loading;
    },
  },
};

export const modalNewMember = {
  state: {
    modalNewMember: { showNewMemberModal: false, loading: false },
  },

  mutations: {
    CHANGE_NEWMEMBER_MODAL_SHOW(state: ModalNewRoomInterface) {
      state.modalNewMember.showNewMemberModal =
        !state.modalNewMember.showNewMemberModal;
    },

    MODAL_NEWMEMBER_LOADING(state: ModalNewRoomInterface) {
      state.modalNewMember.loading = !state.modalNewMember.loading;
    },
  },
};
