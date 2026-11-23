/**
 * Daily aarti timings of Shri Shyam Mandir, Khatushyamji, as the temple committee publishes them (the "आरती समय तालिका"
 * on shrishyammandir.com). Winter and summer timings differ, so both are shown and the one in force today is marked.
 */
export const TEMPLE = {
  name: "Shri Shyam Mandir, Khatushyamji",
  place: "Khatushyamji, Sikar, Rajasthan",
  committee: "Shri Shyam Mandir Committee",
  phone: "01576-231182",
  website: "https://www.shrishyammandir.com/",
} as const;

/** The temple's own YouTube channel, which streams each aarti live. The /live address opens whatever is streaming now. */
export const LIVE_DARSHAN_URL = "https://www.youtube.com/channel/UCT-3fEwrrxlwMrWgMvoqt-w/live";
export const DARSHAN_CHANNEL_URL = "https://www.youtube.com/@ShriShyamDarshan";

export type Season = "winter" | "summer";

export const SEASONS: Record<Season, { label: string; hindi: string; months: string }> = {
  winter: { label: "Winter", hindi: "शीतकालीन", months: "Oct – Mar" },
  summer: { label: "Summer", hindi: "ग्रीष्मकालीन", months: "Apr – Sep" },
};

/** Winter timings run from October to March, summer timings from April to September. */
export function currentSeason(date: Date = new Date()): Season {
  const month = date.getMonth(); // 0 = January
  return month >= 3 && month <= 8 ? "summer" : "winter";
}

export interface AartiTime {
  key: string;
  name: string;
  hindi: string;
  winter: string;
  summer: string;
}

export const AARTI_TIMES: readonly AartiTime[] = [
  { key: "mangala", name: "Mangala Aarti", hindi: "मंगला आरती", winter: "05:30 AM", summer: "04:30 AM" },
  { key: "shringar", name: "Shringar Aarti", hindi: "श्रृंगार आरती", winter: "08:00 AM", summer: "07:00 AM" },
  { key: "bhog", name: "Bhog Aarti", hindi: "भोग आरती", winter: "12:30 PM", summer: "12:30 PM" },
  { key: "sandhya", name: "Sandhya Aarti", hindi: "संध्या आरती", winter: "06:30 PM", summer: "07:30 PM" },
  { key: "shayan", name: "Shayan Aarti", hindi: "शयन आरती", winter: "09:00 PM", summer: "10:00 PM" },
];

export const TIMINGS_NOTE =
  "Timings follow the Shri Shyam Mandir Committee. They can change on festivals and special days (Ekadashi, the Falgun Mela), so please confirm with the temple before you travel.";
