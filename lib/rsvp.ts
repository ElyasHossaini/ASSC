// Shared RSVP client. Talks to a Google Apps Script "web app" endpoint that
// stores entries in a Google Sheet. See RSVP_SETUP.md for the backend setup.

const DEVICE_KEY = "assc:deviceId";
const ADMIN_KEY = "assc:adminToken";
const MY_RSVP_PREFIX = "assc:rsvp:";

export type Rsvp = {
  id: string;
  eventId: string;
  name: string;
  count: number;
  createdAt: string;
};

const ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;

export const RSVP_ENABLED = !!ENDPOINT;

// Stable per-device UUID. Generated lazily on first use and kept in
// localStorage. The server uses this to enforce one RSVP per device.
export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_KEY);
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_KEY);
}

export function getMyRsvpId(eventId: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(`${MY_RSVP_PREFIX}${eventId}`);
}

export function setMyRsvpId(eventId: string, id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${MY_RSVP_PREFIX}${eventId}`, id);
}

export function clearMyRsvpId(eventId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`${MY_RSVP_PREFIX}${eventId}`);
}

type ApiResponse =
  | { ok: true; [key: string]: unknown }
  | { ok: false; error?: string };

async function callApi(params: Record<string, string>): Promise<ApiResponse> {
  if (!ENDPOINT) throw new Error("RSVP endpoint not configured");
  const url = new URL(ENDPOINT);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  // Cache-buster so updates show up immediately.
  url.searchParams.set("_t", String(Date.now()));

  const res = await fetch(url.toString(), {
    method: "GET",
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Network error (${res.status})`);
  return (await res.json()) as ApiResponse;
}

export async function listRsvps(eventId: string): Promise<Rsvp[]> {
  const data = await callApi({ action: "list", eventId });
  if (!data.ok) throw new Error(data.error || "Failed to load RSVPs");
  const rsvps = (data as { rsvps?: Rsvp[] }).rsvps;
  return Array.isArray(rsvps) ? rsvps : [];
}

export type AddResult =
  | { ok: true; rsvp: Rsvp }
  | { ok: false; error: "already_rsvped" | "invalid" | "server" | string };

export async function addRsvp(input: {
  eventId: string;
  name: string;
  count: number;
  deviceId: string;
}): Promise<AddResult> {
  const data = await callApi({
    action: "add",
    eventId: input.eventId,
    name: input.name,
    count: String(input.count),
    deviceId: input.deviceId,
  });
  if (data.ok) {
    const rsvp = (data as { rsvp?: Rsvp }).rsvp;
    if (rsvp) return { ok: true, rsvp };
    return { ok: false, error: "server" };
  }
  return { ok: false, error: (data.error as string) || "server" };
}

export type RemoveResult =
  | { ok: true }
  | { ok: false; error: "unauthorized" | "not_found" | string };

export async function removeRsvp(input: {
  id: string;
  token: string;
}): Promise<RemoveResult> {
  const data = await callApi({
    action: "remove",
    id: input.id,
    token: input.token,
  });
  if (data.ok) return { ok: true };
  return { ok: false, error: (data.error as string) || "server" };
}

export async function pingAdminToken(token: string): Promise<boolean> {
  try {
    const data = await callApi({ action: "ping", token });
    return data.ok === true;
  } catch {
    return false;
  }
}
