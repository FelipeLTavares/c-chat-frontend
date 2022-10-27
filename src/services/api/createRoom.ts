import { CreateRoomData, CreateRoomResponse } from "@/types";
import { HttpClient } from "./HttpClient";

const httpClient = HttpClient.getInstance();

export async function createRoom(
  data: CreateRoomData
): Promise<CreateRoomResponse> {
  try {
    const response = await httpClient.client.post("/chat/rooms", data);
    if (response.status === 201) {
      const createdRoom: CreateRoomResponse = {
        createSuccsess: true,
        roomInfo: response.data,
      };
      return createdRoom;
    }
    const createFail: CreateRoomResponse = {
      createSuccsess: false,
    };
    return createFail;
  } catch {
    const createFail: CreateRoomResponse = {
      createSuccsess: false,
    };
    return createFail;
  }
}
