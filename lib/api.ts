import { getFirebaseAuth } from "@/lib/firebase";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081";

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; status: number }> {
  const auth = getFirebaseAuth();

  const user = auth?.currentUser;

  if (!user) {
    console.error("No authenticated Firebase user found.");

    return {
      data: null,
      status: 401,
    };
  }

  const token = await user.getIdToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = res.headers.get("content-type");

    let data: T | null = null;

    if (contentType?.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      if (text) {
        data = text as T;
      }
    }

    return {
      data,
      status: res.status,
    };
  } catch (error) {
    console.error("Backend request failed:", error);

    return {
      data: null,
      status: 0,
    };
  }
}

export interface CreateTeamResponse {
  message: string;
  code?: string;
}

export interface JoinTeamResponse {
  message: string;
}

export interface GetTeamResponse {
  id: string;
  name: string;
  code: string;
  leaderId: string;
  members: {
    email: string;
    name: string;
  }[];
  isLeader: boolean;
}

export const api = {
  createTeam: (name: string) =>
    fetchWithAuth<CreateTeamResponse>("/teams/create", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
    }),

  joinTeam: (teamCode: string) =>
    fetchWithAuth<JoinTeamResponse>("/teams/join", {
      method: "POST",
      body: JSON.stringify({
        team_code: teamCode.toUpperCase(),
      }),
    }),

    leaveTeam: () =>
        fetchWithAuth<{ message: string }>("/teams/leave-team", {
            method: "DELETE",
        }),

    getTeam: () =>
        fetchWithAuth<GetTeamResponse>("/teams/get", {
            method: "GET",
        }),


};