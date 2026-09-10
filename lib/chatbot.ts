const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

export async function sendChatMessage(message: string): Promise<string> {
  if (!CHATBOT_API_URL) {
    throw new Error("Chatbot API URL is not defined in environment variables.");
  }

  const response = await fetch(CHATBOT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from chatbot");
  }

  const data = await response.json();
  return data.response || data.message || "No response received";
}
