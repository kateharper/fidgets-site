// =============================================================
//  Referral system — localStorage-only.
//  Real reward delivery requires a backend (see ../KNIFE-NOTES.md
//  + SETUP.md). This script generates + persists a code, tracks
//  manually-claimed referrals, and renders the widget UI.
// =============================================================

(function () {
  const KEY_CODE      = 'fidgets.referral.code';
  const KEY_FRIENDS   = 'fidgets.referral.friends';
  const KEY_GREETED   = 'fidgets.greeted';

  function genCode () {
    // TOM-XXXX, 4-char alphanumeric (no easily-confusable chars)
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let s = 'TOM-';
    for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  window.getReferralCode = function () {
    let c = localStorage.getItem(KEY_CODE);
    if (!c) {
      c = genCode();
      localStorage.setItem(KEY_CODE, c);
    }
    return c;
  };

  window.getFriendsCount = function () {
    return parseInt(localStorage.getItem(KEY_FRIENDS) || '0', 10);
  };

  window.shareReferralCode = async function () {
    const code = window.getReferralCode();
    const url = `${window.location.origin}${window.location.pathname}?ref=${code}`;
    const text = `Tom's making 3D-printed fidgets. Use my code ${code} for $3 off your first order — and I get $10 credit when 5 mates use it. ${url}`;
    if (navigator.share) {
      try { await navigator.share({ title: "Tom's Fidgets", text, url }); return; }
      catch (e) { /* user cancelled — fall through */ }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      alert('Referral message copied to clipboard. Paste it anywhere.');
    } catch (e) {
      prompt('Copy this referral message:', text);
    }
  };

  // Show a one-time first-visit greeting with the code
  window.maybeGreetWithCode = function () {
    if (localStorage.getItem(KEY_GREETED)) return;
    localStorage.setItem(KEY_GREETED, '1');
    const code = window.getReferralCode();
    setTimeout(() => {
      const banner = document.createElement('div');
      banner.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-md mx-5 bg-electric text-black rounded-2xl shadow-2xl p-5 border border-black/10';
      banner.style.boxShadow = '0 20px 60px -10px rgba(4,161,255,0.4)';
      banner.innerHTML = `
        <div class="flex items-start gap-4">
          <div class="text-4xl">🎁</div>
          <div class="flex-1">
            <div class="font-semibold text-sm mb-1">Welcome — here's your referral code</div>
            <div class="font-mono font-bold text-2xl mb-2 tracking-wide">${code}</div>
            <div class="text-xs opacity-80 mb-3">Share with 5 friends, they each buy something, you get <strong>$10 credit</strong>.</div>
            <div class="flex gap-2">
              <button onclick="shareReferralCode()" class="bg-black text-white px-3 py-1.5 rounded text-xs font-semibold">Share now</button>
              <button onclick="this.closest('.fixed').remove()" class="text-xs opacity-70 hover:opacity-100">Got it</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(banner);
    }, 2200);
  };

  // Auto-credit if URL has ?ref=CODE on load (so the friend's session knows they came via)
  window.captureIncomingReferral = function () {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref && /^TOM-[A-Z0-9]{4}$/.test(ref)) {
      localStorage.setItem('fidgets.referred_by', ref);
      // If this is the kateharper preview / fidgets-site host AND it's not your own code
      if (ref !== localStorage.getItem(KEY_CODE)) {
        // Show a tiny acknowledgement banner
        const b = document.createElement('div');
        b.className = 'fixed top-20 right-5 z-50 bg-electric text-black px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xl';
        b.innerHTML = `Referred by <strong>${ref}</strong> — your friend gets credit when you order!`;
        b.style.boxShadow = '0 12px 32px -8px rgba(4,161,255,0.45)';
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 6500);
      }
    }
  };

  // Demo: a "Pretend a friend signed up" button so Simon can see the counter advance
  window.demoIncrementFriend = function () {
    const c = window.getFriendsCount();
    if (c >= 5) { alert('Already at 5 friends — $10 credit unlocked.'); return; }
    localStorage.setItem(KEY_FRIENDS, String(c + 1));
    const newCount = c + 1;
    document.querySelectorAll('[data-friends-count]').forEach(el => el.textContent = newCount);
    if (newCount === 5) {
      alert('Boom — 5 friends. $10 credit unlocked.\n\n(In production, the credit is added to your account by Stripe webhook when each friend completes their first order.)');
    }
  };
})();
