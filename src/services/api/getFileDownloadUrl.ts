import { GetFileDownloadUrlData, GetFileDownloadUrlResponse } from "@/types";
import { HttpClient } from "./HttpClient";

const httpClient = HttpClient.getInstance();

export async function getFileDownloadUrl(data: GetFileDownloadUrlData) {
  try {
    const response = await httpClient.client.post<GetFileDownloadUrlResponse>(
      `/chat/files`,
      data
    );

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log("Deu erro");
  }
}
