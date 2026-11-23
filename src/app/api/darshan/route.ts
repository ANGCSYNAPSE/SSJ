import { NextResponse } from "next/server";

// Always asked fresh; the answer is cached for a minute by the CDN (see the header below), not by Next.
export const dynamic = "force-dynamic";

/** The temple's channel (Shri Shyam Darshan) and the aarti shown if YouTube cannot be asked at all. */
const CHANNEL_ID = "UCT-3fEwrrxlwMrWgMvoqt-w";
const FALLBACK = {
  videoId: "6n5ag4iptcY",
  title: "Live प्रातः श्रृंगार आरती - श्री श्याम दर्शन",
};

const HEADERS = {
  // A normal browser identity and the "consent already given" cookie, so YouTube answers with the real page.
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
  "Accept-Language": "en",
  Cookie: "CONSENT=YES+1; SOCS=CAI",
};

const get = (url: string) => fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(6000), cache: "no-store" });

const decode = (text: string) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

interface Candidate {
  videoId: string;
  title: string;
}

type Recent = Candidate & { published: string | null };

/**
 * What a video's page says about it: whether it plays, is a stream that has not started yet (the temple schedules each
 * aarti's stream ahead of time, and such a video is the newest on the channel but cannot be watched), or is on air now.
 */
async function inspect(videoId: string): Promise<{ playable: boolean; live: boolean; title: string | null } | null> {
  try {
    const res = await get(`https://www.youtube.com/watch?v=${videoId}`);
    if (!res.ok) return null;
    const html = await res.text();
    const status = /"playabilityStatus":\{"status":"([A-Z_]+)"/.exec(html)?.[1];
    const upcoming = /"isUpcoming":\s*true/.test(html);
    const title = /<meta property="og:title" content="([^"]*)"/.exec(html)?.[1];
    const playable = status === "OK" && !upcoming;
    return {
      playable,
      live: playable && /"isLive":\s*true/.test(html),
      title: title ? decode(title) : null,
    };
  } catch {
    return null;
  }
}

/** Is the channel streaming right now? Its /live page points at the stream while there is one. */
async function liveStream(): Promise<Candidate | null> {
  try {
    const res = await get(`https://www.youtube.com/channel/${CHANNEL_ID}/live`);
    if (!res.ok) return null;
    const html = await res.text();
    const videoId = /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/.exec(html)?.[1];
    if (!videoId) return null;
    // The page of the stream itself has the last word: it must be on air now, not scheduled for later.
    const seen = await inspect(videoId);
    return seen?.live ? { videoId, title: seen.title ?? FALLBACK.title } : null;
  } catch {
    return null;
  }
}

/** The newest videos on the channel, newest first. */
async function recentVideos(): Promise<Recent[]> {
  try {
    const res = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    if (!res.ok) return [];
    const xml = await res.text();
    const found: Recent[] = [];
    for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const videoId = /<yt:videoId>([\w-]{11})<\/yt:videoId>/.exec(match[1])?.[1];
      if (!videoId) continue;
      found.push({
        videoId,
        title: decode(/<title>([\s\S]*?)<\/title>/.exec(match[1])?.[1] ?? FALLBACK.title),
        published: /<published>([^<]*)<\/published>/.exec(match[1])?.[1] ?? null,
      });
    }
    return found.slice(0, 6);
  } catch {
    return [];
  }
}

/** The latest aarti that can actually be watched: the newest video that is not a stream still waiting to begin. */
async function latestPlayable(): Promise<Recent | null> {
  for (const video of await recentVideos()) {
    const seen = await inspect(video.videoId);
    if (seen?.playable) return video;
  }
  return null;
}

/** The owner can switch embedding off for a video; then the card links to YouTube instead of playing it in place. */
async function embeddable(videoId: string): Promise<boolean> {
  try {
    const res = await get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    return res.ok;
  } catch {
    return true; // cannot tell: try the player
  }
}

export async function GET() {
  const live = await liveStream();
  const latest = live ? null : await latestPlayable();
  const pick: Candidate = live ?? latest ?? FALLBACK;
  const body = {
    live: Boolean(live),
    videoId: pick.videoId,
    title: pick.title,
    published: latest?.published ?? null,
    embeddable: await embeddable(pick.videoId),
    channelId: CHANNEL_ID,
  };
  return NextResponse.json(body, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } });
}
