import { SignInData } from "@/types";
import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

export async function signIn(email: string, password: string): Promise<SignInData | undefined> {
  try {
    const response = await axios.post<SignInData>(`${apiUrl}auth`, { email, password });

    if (response.status === 200) {
      return response.data;
    }

    return;
  } catch {
    return;
  }
}
