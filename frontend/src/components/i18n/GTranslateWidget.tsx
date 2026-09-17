import Script from "next/script";

/**
 * Loads GTranslate once, sitewide, as a pure translation engine — no
 * visible UI of its own. The existing navbar language pills (TopBar,
 * Header's mobile menu) call `switchLanguage()` from lib/gtranslate.ts,
 * which drives this via GTranslate's own `window.doGTranslate()`.
 *
 * `.gtranslate_wrapper` is the container GTranslate needs to exist (per
 * `wrapper_selector` below) even though it renders nothing visible — it's
 * hidden in globals.css. Settings must run before the widget script, so
 * they're `beforeInteractive` (root-layout-only in Next.js) and the widget
 * script is `afterInteractive`; both load once since this component lives
 * in the root layout, which never remounts on client-side navigation.
 */
export default function GTranslateWidget() {
  return (
    <>
      <div className="gtranslate_wrapper" aria-hidden />
      <Script id="gtranslate-settings" strategy="beforeInteractive">
        {`
          window.gtranslateSettings = {
            default_language: "en",
            languages: ["en", "hi", "bn", "ta", "te", "ml", "gu", "mr", "pa"],
            wrapper_selector: ".gtranslate_wrapper",
            native_language_names: true
          };
        `}
      </Script>
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/dwf.js"
        strategy="afterInteractive"
        defer
      />
    </>
  );
}
