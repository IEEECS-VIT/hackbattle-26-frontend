import { beginApiActivity } from "@/lib/apiActivity";

const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

async function performChatRequest(message: string): Promise<string> {
  if (!CHATBOT_API_URL) {
    throw new Error(
      "PokéCenter Link Error: NEXT_PUBLIC_CHATBOT_API_URL is missing!"
    );
  }

  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(
        `Move Missed! Server responded with status ${response.status}`
      );
    }

    const data = await response.json();

    // Checked data.reply first to match your API response
    return (
      data.reply ||
      data.response ||
      data.message ||
      "Wild BOT flinched and couldn't move!"
    );
  } catch (error) {
    console.error("Battle Telemetry Error:", error);
    throw new Error(
      "Connection Lost! Check your PokéNav connection and try again."
    );
  }
}

export async function sendChatMessage(message: string): Promise<string> {
  const endActivity = beginApiActivity();

  try {
    return await performChatRequest(message);
  } finally {
    endActivity();
  }
}
