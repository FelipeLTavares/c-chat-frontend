import { CreateUserData } from "@/types";
import { HttpClient } from "../HttpClient";

const httpClient = HttpClient.getInstance()

export async function createUser(userData: CreateUserData): Promise<boolean> {
  try {

    const response = await httpClient.client.post(`/users`, userData);

    if (response.status === 201) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
