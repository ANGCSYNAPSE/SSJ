/** Reserved advertisement placement — matches the ad slots shown in the Figma designs. */
export default function AdSlot({
  size,
  cta,
}: {
  size: "leaderboard" | "banner" | "rectangle";
  cta?: string;
}) {
  const dims =
    size === "leaderboard"
      ? { w: 728, h: 90, label: "728 × 90" }
      : size === "banner"
        ? { w: 970, h: 250, label: "970 × 250" }
        : { w: 300, h: 250, label: "300 × 250" };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#f7f7f7] py-8">
      <div className="h-px w-full bg-[#e0e0e0]" />
      <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
        <p className="text-[10px] font-medium tracking-[1.5px] text-[#9e9e9e]">
          ADVERTISEMENT
        </p>
        <div
          className="flex max-w-full flex-col items-center justify-center gap-2 rounded border border-[#e0e0e0] bg-[#ebebeb]"
          style={{ width: dims.w, height: dims.h, maxWidth: "92vw" }}
        >
          <p className="text-sm text-[#9e9e9e]">{dims.label}</p>
          <p className="text-[11px] text-[#b4b4b4]">Ad Space</p>
          {cta && (
            <span className="rounded bg-maroon px-4 py-1.5 text-[11px] font-semibold text-white">
              {cta}
            </span>
          )}
        </div>
      </div>
      <div className="h-px w-full bg-[#e0e0e0]" />
    </div>
  );
}
