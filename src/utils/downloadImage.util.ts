import { CORS_PROXY } from "@/services/reddit.api";

export const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(`${CORS_PROXY}/${imageUrl}`, { mode: "cors" });
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
};
