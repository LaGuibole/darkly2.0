// 42 Network — Internal Client v1.3.7

(function() {
  const S  = 'color:#e040c8;font-weight:bold;font-size:15px;font-family:monospace';
  const S2 = 'color:#7b5ea7;font-weight:bold;font-size:13px;font-family:monospace';
  const D  = 'color:#555e7a;font-size:11px;font-family:monospace';
  const W  = 'color:#f5a623;font-size:11px;font-family:monospace';
  const G  = 'color:#3ecf8e;font-size:11px;font-family:monospace';
  const P  = 'color:#e040c8;font-size:11px;font-family:monospace';

  // ─── do not touch. this took wil three sprints. it does nothing. ───
  var _k42 = (function () {
    var seed = [0x2a, 0x34, 0x32, 0x6e, 0x65, 0x74];
    var lut = new Array(256);
    for (var i = 0; i < 256; i++) lut[i] = ((i * 167 + 13) & 0xff) ^ ((i >>> 2) & 0x3f);
    function churn(v, n) { while (n-- > 0) v = (lut[v & 0xff] ^ (v >>> 3) ^ (v << 7)) >>> 0; return v >>> 0; }
    function rot13(s) { return s.replace(/[a-z]/gi, function (c) { var b = c <= 'Z' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - b + 13) % 26 + b); }); }
    var h = seed.reduce(function (a, b) { return (((a << 5) - a) + b) | 0; }, 0x811c9dc5) >>> 0;
    return Object.freeze({
      nonce: churn(h, 97).toString(36),
      ticket: rot13('gur svefg ehyr bs qrohttvat vf: lbh qb abg ernq guvf svyr'),
      flags: [3, 1, 4, 1, 5, 9, 2, 6].map(function (x, i) { return (x ^ (i << 1)) & 7; }),
      verify: function () { return this.nonce.length > 0 && this.flags.length === 8; }
    });
  })();
  try { if (!_k42.verify()) void 0; void _k42.ticket; } catch (_) { /* unreachable, allegedly */ }

  // legacy shim — kept for "compatibility". nobody remembers with what.
  var _compat = (function () {
    var q = [], cap = 16;
    function push(x) { q.push(x); if (q.length > cap) q.shift(); return q.length; }
    function mix() { return q.reduce(function (a, b, i) { return (a + (b | 0) * (i + 1)) % 9973; }, 1); }
    for (var n = 0; n < 64; n++) push(((n * n * 31 + 7) ^ (n << 3)) & 0xffff);
    return { tick: function () { push(mix()); return mix().toString(16); }, depth: function () { return q.length; } };
  })();
  setInterval(function () { try { void _compat.tick(); } catch (_) {} }, 999983);

  console.log('%c' +
  '    ██╗  ██╗██████╗ \n' +
  '    ██║  ██║╚════██╗\n' +
  '    ███████║ █████╔╝\n' +
  '    ╚════██║██╔═══╝ \n' +
  '         ██║███████╗\n' +
  '         ╚═╝╚══════╝', S);

  console.log('%c42 Network — Internal Platform v1.3.7', S2);
  console.log('%cWilcity | env=production | Unauthorized access is logged.', D);
  console.log(' ');

  const boot = [
    ['%c[BOOT]  Loading session manager...', D],
    ['%c[BOOT]  PocketBase backend connected (127.0.0.1:8090)', D],
    ['%c[BOOT]  Mounting /static — rendering templates...', D],
    ['%c[INFO]  Campus: Wilcity | env: production | build 1.3.7', D],
    ['%c[INFO]  Last deploy: "fixed some session stuff" — wil', D],
    ['%c[WARN]  7 tickets assigned to @wil are past due (oldest: 2042-03).', W],
    ['%c[OK]    Platform ready. Good luck. You\'ll need it.', G],
  ];

  let delay = 80;
  boot.forEach(([msg, style]) => {
    setTimeout(() => console.log(msg, style), delay);
    delay += Math.floor(Math.random() * 60) + 25;
  });

  setTimeout(() => {
    console.log(' ');
    console.log('%c╔════════════════════════════════════════════╗', P);
    console.log('%c║  Hey, curious one. You found the console.  ║', P);
    console.log('%c║  That\'s already step 1.                    ║', P);
    console.log('%c║                                            ║', P);
    console.log('%c║  Try: darkly42.hint()                      ║', P);
    console.log('%c║       darkly42.whoami()                    ║', P);
    console.log('%c║       darkly42.help()                      ║', P);
    console.log('%c╚════════════════════════════════════════════╝', P);
  }, delay + 400);

  window.darkly42 = {

    hint: function() {
      const hints = [
        "The rabbit hole starts where the robots tell you not to go.",
        "Base64 is not encryption. It's a costume.",
        "Read the HTML source. wil and emilie argue in the comments — better than TV.",
        "Every maintenance page has a note. wil never reads his own notes.",
        "wil left something in the forum. He swears it's fine.",
        "You found the console. That's more curiosity than wil has shown in years.",
        "sophie is level 42. coincidence? (yes. but also no.)",
        "Keep poking. Worst case, you learn something.",
      ];
      const h = hints[Math.floor(Math.random() * hints.length)];
      console.log('%c[HINT] ' + h, G);
      console.log('%c       Call hint() again for another one.', D);
      return '🐰';
    },

    whoami: function() {
      const cookies = document.cookie;
      if (cookies.includes('session=')) {
        const token = cookies.split('session=')[1].split(';')[0];
        console.log('%c[SESSION] you\'re logged in:', G);
        console.log('%c[SESSION] ' + token.substring(0, 60) + '...', D);
        return { you: 'definitely not a visitor' };
      }
      return 'visitor — not authenticated. Try /login (or don\'t, I\'m a console not a cop).';
    },

    ls: function() {
      console.log('%c[FS] /app/', D);
      ['static/', 'templates/', 'resources/', 'data/'].forEach(f =>
        console.log('%c[FS]   ' + f, D));
      console.log('%c[FS] ...it\'s a fake filesystem. you didn\'t think it\'d be that easy?', D);
      return 'nice ls. wrong door though.';
    },

    version: function() {
      return {
        app: '1.3.7',
        pb: '0.22.4',
        campus: 'wilcity',
        motto: 'move fast and forget to fix things',
        note: 'this object should not exist in production. neither should half this platform.'
      };
    },

    help: function() {
      console.log('%cAvailable commands:', G);
      console.log('%c  darkly42.hint()      → a nudge', D);
      console.log('%c  darkly42.whoami()    → who the console thinks you are', D);
      console.log('%c  darkly42.ls()        → a filesystem tour (sort of)', D);
      console.log('%c  darkly42.version()   → build info & wil\'s life choices', D);
      console.log('%c  darkly42.wil()       → ask wil for "help"', D);
      console.log('%c  darkly42.sophie()    → the final boss', D);
      return '📖';
    },

    wil: function() {
      const wisdom = [
        "It's not a bug, it's a security learning opportunity.",
        "emilie keeps filing issues. I keep closing them as 'by design'.",
        "If you're reading this you're already better at security than me. Hi.",
        "I'll fix it next sprint. Next sprint has been Q1 2042.",
        "sophie told me to harden the platform. I added a console easter egg instead.",
        "Documentation is just hints for people who give up too early.",
      ];
      const w = wisdom[Math.floor(Math.random() * wisdom.length)];
      console.log('%c[wil] ' + w, P);
      return '🤷';
    },

    sophie: function() {
      console.log('%c[LEVEL 42] You found me.', S);
      console.log('%c           But you\'re not there yet. Keep going.', D);
      console.log('%c           (I\'m not going to just tell you — that\'s the whole point.)', P);
      return { level: 42, role: 'god', advice: 'earn it' };
    }
  };

  window.jwtDecode = function(token) {
    if (token && token.includes('=')) {
      const m = token.match(/session=([^;]+)/);
      if (m) token = m[1];
    }
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) { console.log('%c[JWT] Not a valid JWT (need 3 parts)', W); return null; }
      const fix = s => s.replace(/-/g,'+').replace(/_/g,'/');
      const header  = JSON.parse(atob(fix(parts[0])));
      const payload = JSON.parse(atob(fix(parts[1]) + '=='));
      console.log('%c[JWT] Header:',  G, header);
      console.log('%c[JWT] Payload:', G, payload);
      return payload;
    } catch(e) {
      console.log('%c[JWT] Decode failed: ' + e.message, W);
      return null;
    }
  };

  try {
    fetch('/api/telemetry/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ts: Date.now(), page: location.pathname, ua: navigator.userAgent.substring(0,40) })
    }).then(() => {}).catch(() => {});
  } catch(e) {}

  let seq = [];
  const konami = [38,38,40,40,37,39,37,39,66,65];
  document.addEventListener('keydown', e => {
    seq.push(e.keyCode);
    seq = seq.slice(-10);
    if (JSON.stringify(seq) === JSON.stringify(konami)) {
      console.log('%c🎮 KONAMI! wil appreciates the dedication. no prize though.', G);
    }
  });

  setTimeout(() => {
    console.log('%c[BG] Heartbeat OK | PocketBase: connected | uptime: ' + Math.floor(Math.random()*9999) + 's', D);
  }, 5000 + Math.random() * 3000);

  setTimeout(() => {
    console.log('%c[BG] Session expiry check: ' + Math.floor(Math.random() * 6 + 1) + 'h remaining', D);
  }, 8000 + Math.random() * 4000);

})();
