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
// ---- DOM references for name field ----
const nameInput = document.getElementById('nameInput');
const nameMsg   = document.getElementById('nameMsg');

// ============================================================
// BEHAVIOR 3: Self-erasing / fighting input
//
// Design intent: The name field actively resists the user's typing.
// Every 3rd keystroke it silently deletes the last character,
// swaps a character for a random consonant, or shows a false error.
// Targets the most basic expectation of a text field: that what
// you type is what appears. The user is made to feel incompetent.
//
// Dynamic CSS via JS (Requirement): borderColor flashes on sabotage.
// ============================================================
let nameStrokeCount = 0;

nameInput.addEventListener('input', function () {
  nameStrokeCount++;

  if (nameStrokeCount % 3 === 0) {
    const currentValue = nameInput.value;
    const strategy = Math.floor(Math.random() * 3);

    if (strategy === 0 && currentValue.length > 0) {
      // Strategy A: silently delete last character
      nameInput.value = currentValue.slice(0, -1);
      nameInput.style.borderColor = '#d44'; // dynamic CSS change (Requirement)
      setTimeout(() => { nameInput.style.borderColor = ''; }, 400);

    } else if (strategy === 1 && currentValue.length > 1) {
      // Strategy B: swap a random character with a random consonant
      const consonants = 'bcdfghjklmnpqrstvwxz';
      const pos = Math.floor(Math.random() * currentValue.length);
      const replacement = consonants[Math.floor(Math.random() * consonants.length)];
      nameInput.value =
        currentValue.slice(0, pos) + replacement + currentValue.slice(pos + 1);

    } else {
      // Strategy C: false error message, leave value alone
      nameMsg.textContent = 'Name cannot contain those characters.';
      nameMsg.style.color = '#b33';
      setTimeout(() => { nameMsg.textContent = ''; }, 1500);
    }
  }
});

// On blur: show a suspicious comment regardless of what was typed
nameInput.addEventListener('blur', function () {
  if (nameInput.value.length > 0) {
    const lies = [
      "Name looks suspicious.",
      "We've seen this name before...",
      "Are you sure that's correct?",
      "Name accepted! (it was not)",
    ];
    nameMsg.textContent = randomFrom(lies);
    nameMsg.style.color = Math.random() > 0.5 ? '#2a7' : '#b33';
  }
});

// ---- DOM references for email field ----
const emailInput = document.getElementById('emailInput');
const emailMsg   = document.getElementById('emailMsg');

// ============================================================
// BEHAVIOR 2: Gaslighting feedback
//
// Design intent: Success and error messages deliberately lie.
// A valid email gets an error; an unchanged field gets success.
// The user cannot trust the interface's own signals, creating
// a feeling of learned helplessness — they try to "fix" things
// that aren't broken and break things that were fine.
// ============================================================
const gaslightErrors = [
  'Invalid email address.',
  'This email is already in use.',
  'Email domain not recognized.',
  'Please use a real email.',
  'Server error. Please try again.',
];
const gaslightSuccess = [
  'Email accepted! \u2713',
  'Looks great!',
  'Perfect, thank you.',
  'Email verified successfully.',
];

let emailEventCount = 0;

emailInput.addEventListener('input', function () {
  emailEventCount++;
  // Alternate success/error randomly — actual validity is ignored
  if (emailEventCount % 2 === 0) {
    emailMsg.textContent = randomFrom(gaslightSuccess);
    emailMsg.style.color = '#2a7';
  } else {
    emailMsg.textContent = randomFrom(gaslightErrors);
    emailMsg.style.color = '#b33';
  }
});

// ---- DOM references for slider ----
const fontSlider  = document.getElementById('fontSlider');
const sliderMsg   = document.getElementById('sliderMsg');
const pageWrapper = document.getElementById('pageWrapper');

// ============================================================
// BEHAVIOR 5B: Lying slider
//
// Design intent: The slider is labeled "Font Size" and shows a
// fake "Size: Npx" readout that looks plausible. Dragging it
// actually rotates the entire page. Label promises one control;
// effect is spatially disorienting and completely different.
// The user's physical mastery of the page is taken away.
//
// Dynamic CSS via JS (Requirement): pageWrapper.style.transform
// ============================================================
fontSlider.addEventListener('input', function () {
  const sliderValue = parseInt(fontSlider.value, 10);

  // Show fake font-size readout (the lie)
  const fakeFontSize = 10 + Math.round(sliderValue / 20);
  sliderMsg.textContent = 'Size: ' + fakeFontSize + 'px';

  // Actually rotate the entire page (the truth)
  pageWrapper.style.transform = 'rotate(' + (sliderValue * 0.5) + 'deg)';
});