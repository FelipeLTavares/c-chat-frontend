import { UserInfo } from "@/types";
import { HttpClient } from "./HttpClient";

const httpClient = HttpClient.getInstance();

export async function getUserInfo(): Promise<UserInfo | undefined> {
  try {
    const response = await httpClient.client.get("/users/info");
    if (response.status === 200) {
      return response.data;
    }

    return;
  } catch {
    return;
  }
}
