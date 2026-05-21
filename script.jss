javascript// ============================================================
// script.js — Definitely Normal Form
// A3 Misbehaving Interface
// All multi-word identifiers use camelCase (Technical Requirement).
// ============================================================

// ---- Utility: return a random item from an array ----
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---- Utility: clamp a value between min and max ----
function clamp(val, minVal, maxVal) {
  return Math.max(minVal, Math.min(maxVal, val));
}

// ============================================================
// BEHAVIOR 5A: Page title randomizes on every reload
//
// Design intent: The page introduces itself differently each time,
// undermining the user's assumption that this is a stable, knowable
// interface. Distrust is seeded before any interaction happens.
// ============================================================
const pageTitles = [
  "Definitely Normal Form",
  "Nothing Suspicious Here",
  "A Very Standard Form",
  "Please Fill This Out",
  "You Are Almost Done",
  "One Last Step (we promise)",
  "Final Step! (not really)",
  "We Just Need One More Thing",
];
const pageSubtitles = [
  "Please fill this out completely and honestly.",
  "This should only take a moment.",
  "We just need a few details.",
  "Almost there! Just a quick form.",
  "Don't worry, this is the last one.",
];

document.getElementById('pageTitle').textContent    = randomFrom(pageTitles);
document.getElementById('pageSubtitle').textContent = randomFrom(pageSubtitles);