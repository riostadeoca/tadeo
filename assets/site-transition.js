/* =========================================================
   SITE-WIDE PAGE TRANSITION
   Fades the overlay in right before an internal link
   navigates away, and fades it back out once the destination
   page has finished loading (or is restored from the
   browser's back/forward cache).

   This is the static-site version of the old Squarespace
   Header Injection snippet: since every navigation here is a
   real page load rather than an AJAX swap, there's no
   Mercury lifecycle to hook into — `pageshow` covers both
   fresh loads and bfcache restores on its own.
========================================================= */

(function () {
  const overlay = document.getElementById("site-transition-overlay");
  if (!overlay) return;

  function fadeOut() {
    overlay.classList.remove("active");
  }

  function isInternalNavigableLink(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== "_self") return false;
    if (link.hasAttribute("download")) return false;
    if (link.origin !== window.location.origin) return false;
    if (link.href === window.location.href) return false;

    const rawHref = link.getAttribute("href") || "";
    if (rawHref.startsWith("#")) return false; // in-page anchor, not a real navigation

    return true;
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a");
    if (!isInternalNavigableLink(link)) return;

    overlay.classList.add("active");
  });

  window.addEventListener("pageshow", fadeOut);
})();
