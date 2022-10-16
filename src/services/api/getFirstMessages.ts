import { MessageRaw } from "@/types";
import { HttpClient } from "../HttpClient";

const httpClient = HttpClient.getInstance()

interface GetFirstMessagesResponse {
  messages: MessageRaw[];
}

export async function getFisrtMessages(roomId: string): Promise<MessageRaw[]> {
  try {
    const response = await httpClient.client.get<GetFirstMessagesResponse>(`/chat?room-id=${roomId}`);

    if (response.status === 200) {
      return response.data.messages;
    }

    return [];
  } catch {
    return [];
  }
}
