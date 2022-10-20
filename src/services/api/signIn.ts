import { SignInData } from "@/types";
import { HttpClient } from "./HttpClient";

const httpClient = HttpClient.getInstance();

export async function signIn(
  email: string,
  password: string
): Promise<SignInData | undefined> {
  try {
    const response = await httpClient.client.post<SignInData>(`/auth`, {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data;
    }

    return;
  } catch {
    return;
  }
}
