import axios from "axios";
import { CreateUserData } from "@/types";

const apiUrl = process.env.VUE_APP_API_URL;

export async function createUser(userData: CreateUserData): Promise<boolean> {
  try {
    const response = await axios.post(`${apiUrl}users`, userData);

    if (response.status === 201) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
