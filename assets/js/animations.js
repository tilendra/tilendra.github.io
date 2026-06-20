/**
 * Scroll-reveal, counter, typewriter, and section-header animations.
 */

document.addEventListener("DOMContentLoaded", function () {
  setupScrollReveal();
  setupH2AnimatedUnderline();
  setupStatCounters();
  setupPubSectionHeaders();
  setupTypewriter();
});

// ── Scroll-reveal for bibliography items ───────────────────────────────────

function setupScrollReveal() {
  var items = document.querySelectorAll(".publications ol.bibliography li");
  if (!items.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: "0px 0px -24px 0px" });

  items.forEach(function (el, i) {
    el.classList.add("scroll-reveal");
    el.style.transitionDelay = Math.min(i % 6 * 0.06, 0.35) + "s";
    observer.observe(el);
  });
}

// ── Animated underline on h2 headings ──────────────────────────────────────

function setupH2AnimatedUnderline() {
  var headings = document.querySelectorAll("article h2");
  if (!headings.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("h2-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  headings.forEach(function (h) { observer.observe(h); });
}

// ── Counter animation for .stat-counter[data-target] ──────────────────────

function setupStatCounters() {
  var els = document.querySelectorAll(".stat-counter[data-target]");
  if (!els.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.9 });

  els.forEach(function (el) { observer.observe(el); });
}

function animateCounter(el) {
  var target = parseInt(el.getAttribute("data-target"), 10);
  if (isNaN(target)) return;
  var duration = 1500;
  var start = performance.now();
  (function step(now) {
    var p = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

// ── Publication section header entrance animation ──────────────────────────

function setupPubSectionHeaders() {
  var headers = document.querySelectorAll(".pub-section-header");
  if (!headers.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("header-animated");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  headers.forEach(function (h) { observer.observe(h); });
}

// ── Typewriter effect for .post-title on non-home pages ───────────────────

function setupTypewriter() {
  // Only run on pages that have a .post-title that has already been rendered
  // (not the about page which has its own h1 with the full name)
  var title = document.querySelector(".post-title");
  if (!title || title.dataset.typed) return;

  var text = title.textContent.trim();
  if (!text || text.length < 4) return;

  // Skip if it's the about/home page name heading
  if (document.querySelector(".profile")) return;

  title.dataset.typed = "true";
  title.textContent = "";
  title.classList.add("typewriter-cursor");

  var i = 0;
  var speed = Math.max(28, Math.min(55, 1400 / text.length));

  (function type() {
    if (i <= text.length) {
      title.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    } else {
      title.classList.remove("typewriter-cursor");
    }
  })();
}
