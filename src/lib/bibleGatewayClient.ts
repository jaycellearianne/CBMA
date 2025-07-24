// server‑side or browser (via your own proxy) — just don’t leak creds!
type TokenResponse = { access_token: string; expiration: number };
type ErrorResponse = { error: { errcode: number; errmsg: string } };

let _cachedToken: string | null = null;
let _expiresAt = 0;

/** Get (and cache) your API token */
async function getToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (_cachedToken && now < _expiresAt - 60) return _cachedToken;

  const res = await fetch(
    `https://api.biblegateway.com/2/request_access_token?username=${encodeURIComponent(
      process.env.BG_USER!
    )}&password=${encodeURIComponent(process.env.BG_PASS!)}`
  );
  const data = (await res.json()) as TokenResponse | ErrorResponse;
  if ("error" in data) {
    throw new Error(
      `BibleGateway token error (${data.error.errcode}): ${data.error.errmsg}`
    );
  }
  _cachedToken = data.access_token;
  _expiresAt = data.expiration;
  return _cachedToken;
}

/** Fetch a passage (osis) in one or more translations */
export async function fetchPassage(
  osis: string,
  translation: string | string[] = "niv"
): Promise<Array<{ title: any; content: string }>> {
  const token = await getToken();
  const list = Array.isArray(translation) ? translation.join(",") : translation;

  const url = new URL(
    `https://api.biblegateway.com/2/bible/osis/${encodeURIComponent(
      osis
    )}/${list}`
  );
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`BibleGateway fetch failed: ${res.status}`);
  return (await res.json()) as Array<{ title: any; content: string }>;
}
