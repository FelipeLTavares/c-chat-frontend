import axios from "axios";

export async function downloadFile(
  fileUrl: string,
  fileName: string,
  fileType: string
): Promise<void> {
  try {
    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: fileType,
      },
    });

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: fileType })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log("Deu erro");
  }
}
