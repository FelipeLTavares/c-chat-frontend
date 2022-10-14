import store from "@/store";
import { CreateRoomData } from "@/types";
import newRoom from "../axiosNewRoom";


export async function createRoom(data:CreateRoomData) {
  try {
    const response = await newRoom.post( '/', data);

    if (response.status === 201) {
      store.commit('SET_NEW_ROOM', response );
    }
    window.alert('Erro ao criar sala. Tente novamente mais tarde!')
  } catch {
    window.alert('Erro ao criar sala. Tente novamente mais tarde!')
  }
}