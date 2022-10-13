import axios from "axios";
import { MessageRaw } from "@/types";

interface GetFirstMessagesResponse {
  messages: MessageRaw[];
}

export async function getFisrtMessages(): Promise<MessageRaw[]> {
  try {
    const response = await axios.get<GetFirstMessagesResponse>(
      `${process.env.VUE_APP_API_URL}chat`
    );

    if (response.status === 200) {
      return response.data.messages;
    }

    return [];
  } catch {
    return [];
  }
}
