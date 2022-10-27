import { NewMemberData } from "@/types";
import { HttpClient } from "./HttpClient";

const httpClient = HttpClient.getInstance();

export async function addMember(newMember: NewMemberData): Promise<boolean> {
  try {
    const response = await httpClient.client.post(
      "/chat/rooms/users",
      newMember
    );
    if (response.status === 204) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
