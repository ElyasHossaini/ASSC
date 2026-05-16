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

type XhrResult =
  | { ok: true; status: number; body: string }
  | { ok: false; error: string };

// Wallet / dapp browser extensions (Phantom, MetaMask, Coinbase Wallet, etc.)
// wrap `window.fetch` and surface their own "Failed to fetch" errors that
// the Next.js dev overlay then displays even when our code catches them.
// XMLHttpRequest is rarely wrapped by these extensions, so we use it for
// our Apps Script calls to keep the dev experience clean.
function xhrGet(url: string): Promise<XhrResult> {
  return new Promise((resolve) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "text";
      // 20s safety net so a hung request can't keep loading state stuck.
      xhr.timeout = 20000;
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 0) {
          resolve({ ok: false, error: "network" });
          return;
        }
        resolve({ ok: true, status: xhr.status, body: xhr.responseText });
      };
      xhr.onerror = () => resolve({ ok: false, error: "network" });
      xhr.ontimeout = () => resolve({ ok: false, error: "timeout" });
      xhr.send();
    } catch (err) {
      const message = err instanceof Error ? err.message : "network";
      resolve({ ok: false, error: message });
    }
  });
}

// All network access goes through callApi. It NEVER throws — every failure
// returns `{ ok: false, error }`.
async function callApi(params: Record<string, string>): Promise<ApiResponse> {
  if (!ENDPOINT) return { ok: false, error: "RSVP endpoint not configured" };
  const url = new URL(ENDPOINT);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  // Cache-buster so updates show up immediately.
  url.searchParams.set("_t", String(Date.now()));

  const result = await xhrGet(url.toString());
  if (!result.ok) return { ok: false, error: result.error };
  if (result.status < 200 || result.status >= 300) {
    return { ok: false, error: `Network error (${result.status})` };
  }
  try {
    return JSON.parse(result.body) as ApiResponse;
  } catch {
    return { ok: false, error: "invalid_json" };
  }
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
