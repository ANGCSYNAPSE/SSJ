/* Shared helpers for the hero samples: icons, petals, stars, embers, bokeh lights, mandala, diya, sticker, header and switcher. */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var sprite =
    '<svg xmlns="' + NS + '" style="position:absolute;width:0;height:0" aria-hidden="true">' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>' +
    '<symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>' +
    '<symbol id="i-building" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"/></symbol>' +
    '<symbol id="i-map" viewBox="0 0 24 24"><path d="M14.1 5.55a2 2 0 0 0 1.79 0l3.66-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.55 2.28a2 2 0 0 1-1.79 0l-4.21-2.1a2 2 0 0 0-1.79 0l-3.66 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9l4.55-2.28a2 2 0 0 1 1.79 0z"/><path d="M15 5.76v15M9 3.24v15"/></symbol>' +
    '<symbol id="i-replay" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></symbol>' +
    "</svg>";
  document.body.insertAdjacentHTML("afterbegin", sprite);

  function ico(name, cls) { return '<svg class="i ' + (cls || "") + '"><use href="#i-' + name + '"/></svg>'; }
  var COLOURS = ["#ffb347", "#ff8c1a", "#f9d65c", "#ff6f61", "#ffd9a0"];

  var HL = (window.HL = {
    ico: ico,

    /** Marigold petals drifting down. */
    petals: function (el, n) {
      for (var i = 0; i < n; i++) {
        var s = document.createElement("span");
        s.className = "petal";
        var size = 9 + ((i * 7) % 5) * 4;
        s.style.cssText =
          "left:" + ((i * 37 + 11) % 100) + "%;width:" + size + "px;height:" + size + "px;background:" + COLOURS[i % 5] +
          ";opacity:.75;--dur:" + (10 + ((i * 3) % 7) * 2) + "s;--delay:-" + ((i * 1.7) % 12) + "s;--sway:" + ((i % 2 ? 1 : -1) * (24 + ((i * 11) % 40))) + "px";
        el.appendChild(s);
      }
    },

    /** Twinkling stars. */
    stars: function (el, n) {
      for (var i = 0; i < n; i++) {
        var s = document.createElement("span");
        var sz = 1 + (i % 3);
        s.style.cssText =
          "position:absolute;border-radius:50%;background:#fff;left:" + ((i * 53 + 5) % 100) + "%;top:" + ((i * 37 + 3) % 72) + "%;width:" + sz + "px;height:" + sz +
          "px;animation:hl-twinkle " + (3 + (i % 5)) + "s ease-in-out -" + ((i * 0.7) % 5) + "s infinite";
        el.appendChild(s);
      }
    },

    /** Sparks rising like those from a lamp. */
    embers: function (el, n) {
      for (var i = 0; i < n; i++) {
        var s = document.createElement("span");
        var sz = 3 + (i % 3) * 2;
        s.style.cssText =
          "position:absolute;bottom:24px;border-radius:50%;background:#ffb347;box-shadow:0 0 10px 3px rgba(255,170,60,.7);left:" + ((i * 47 + 9) % 100) + "%;width:" + sz + "px;height:" + sz +
          "px;--dx:" + ((i % 2 ? 1 : -1) * (20 + (i % 5) * 12)) + "px;animation:hl-ember " + (9 + (i % 6) * 2) + "s linear -" + ((i * 1.3) % 12) + "s infinite";
        el.appendChild(s);
      }
    },

    /** Soft round lights drifting, like a camera out of focus. */
    bokeh: function (el, n) {
      for (var i = 0; i < n; i++) {
        var s = document.createElement("span");
        var sz = 12 + ((i * 13) % 5) * 10;
        s.style.cssText =
          "position:absolute;border-radius:50%;filter:blur(1.5px);left:" + ((i * 41 + 7) % 100) + "%;top:" + ((i * 29 + 12) % 80) + "%;width:" + sz + "px;height:" + sz +
          "px;background:radial-gradient(circle,rgba(255,214,140,.7),rgba(255,170,60,.12) 65%,transparent 70%);--dx:" + ((i % 2 ? 1 : -1) * (14 + (i % 5) * 8)) +
          "px;animation:hl-bokeh " + (8 + (i % 6) * 2) + "s ease-in-out -" + ((i * 1.4) % 10) + "s infinite";
        el.appendChild(s);
      }
    },

    /** A mandala of lotus petals, in a thin line. */
    mandala: function (el, petals) {
      petals = petals || 16;
      var g = "";
      for (var i = 0; i < petals; i++) {
        g += '<g transform="rotate(' + (360 / petals) * i + ' 50 50)"><path d="M50 9c4.2 7 4.2 14 0 20-4.2-6-4.2-13 0-20z"/><path d="M50 29c2 4 2 8 0 11-2-3-2-7 0-11z"/></g>';
      }
      el.innerHTML =
        '<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width=".45"><circle cx="50" cy="50" r="48" stroke-dasharray="1 2.2"/><circle cx="50" cy="50" r="41"/><circle cx="50" cy="50" r="23"/>' + g + "</svg>";
    },

    /** An oil lamp with a flickering flame. */
    diya: function () {
      return (
        '<svg viewBox="0 0 48 48" width="100%" height="100%"><defs><radialGradient id="ff" cx="50%" cy="70%" r="60%"><stop offset="0" stop-color="#fff6c8"/><stop offset=".55" stop-color="#ffb02e"/><stop offset="1" stop-color="#ff6a00"/></radialGradient></defs>' +
        '<g class="flame"><path d="M24 4c4 6 7 9 7 14a7 7 0 0 1-14 0c0-5 3-8 7-14z" fill="url(#ff)"/></g>' +
        '<path d="M6 28h36c0 8-7.5 14-18 14S6 36 6 28z" fill="#c2570c"/><path d="M6 28h36" stroke="#f5a623" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="24" cy="28" rx="18" ry="3" fill="#8a3b06"/></svg>'
      );
    },

    /** A round sticker whose words turn slowly. */
    sticker: function (el, text) {
      text = text || "Jai Shree Shyam";
      el.innerHTML =
        '<svg viewBox="0 0 100 100" width="100%" height="100%" class="hl-spin-slow" style="animation-duration:22s;position:absolute;inset:0"><defs><path id="ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1 -74 0"/></defs>' +
        '<text font-size="9.5" font-weight="700" letter-spacing="1.6" fill="#fff" style="text-transform:uppercase;font-family:Poppins,sans-serif"><textPath href="#ring">' + text + " ✦ " + text + " ✦ </textPath></text></svg>" +
        '<svg viewBox="0 0 24 24" width="32" height="32" fill="#fff" style="position:relative"><path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 2.9 5 6.3 5c2 0 3.9 1.1 5.7 3.2C13.8 6.1 15.7 5 17.7 5 21.1 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z"/></svg>';
    },
  });

  /** The site's header and the little switcher at the foot, written into every sample. */
  document.querySelectorAll("[data-header]").forEach(function (el) {
    el.outerHTML =
      '<header class="hd"><a href="index.html"><img src="assets/logo.svg" alt="Shyam Jagat"></a><nav><a class="on">Home</a><a>Baba Shyam</a><a>About Us</a><a>Our Initiatives</a><a>Seva</a><a>Events</a><a>Team</a><a>More ▾</a></nav><div class="acts"><a class="a1">Login</a><a class="a2">Sign Up</a></div></header>';
  });
  document.querySelectorAll("[data-switch]").forEach(function (el) {
    var cur = el.getAttribute("data-switch");
    var html = '<a class="all" href="index.html">All samples</a>';
    var names = { a: "A1 Gate", a2: "A2 Lotus", a3: "A3 Parda", a4: "A4 Diyas", b: "B", c: "C", d: "D", e: "E" };
    Object.keys(names).forEach(function (k) {
      html += '<a class="' + (k === cur ? "cur" : "") + '" href="sample-' + k + '.html">' + names[k] + "</a>";
    });
    el.outerHTML = '<nav class="switch">' + html + "</nav>";
  });

  /** Fill the four stats and the two buttons the same way in every sample. */
  document.querySelectorAll("[data-stats]").forEach(function (el) {
    var items = [["users", "Devotees Connected"], ["heart", "Seva Initiatives"], ["building", "Temples Associated"], ["map", "States Covered"]];
    el.classList.add("stats");
    el.innerHTML = items.map(function (it) { return '<div class="stat"><span class="ic">' + ico(it[0]) + "</span><span>" + it[1] + "</span></div>"; }).join("");
  });
  document.querySelectorAll("[data-ctas]").forEach(function (el) {
    var light = el.getAttribute("data-ctas") === "light";
    el.classList.add("ctas");
    if (light) {
      el.innerHTML =
        '<a class="btn" style="padding:0 8px 0 32px;border-radius:999px;background:#6b1f1f;color:#fff;box-shadow:0 14px 34px rgba(107,31,31,.35)" href="#">Become a Member<span style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:50%;background:#ffd04f;color:#6b1f1f">' + ico("arrow") + "</span></a>" +
        '<a class="btn" style="padding:0 28px;border:2px solid #6b1f1f;background:rgba(255,255,255,.7);color:#6b1f1f;border-radius:999px" href="#">' + ico("heart") + "Give Seva</a>";
    } else {
      el.innerHTML = '<a class="btn btn-member" href="#">Become a Member' + ico("arrow") + '</a><a class="btn btn-seva" href="#">' + ico("heart") + "Give Seva</a>";
    }
  });
})();
