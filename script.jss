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
    nameMsg.style.color = Math.random() > 0.3 ? '#b33' : '#2a7';
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
  'Your email contains illegal characters.',
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

// ---- DOM references for mood select ----
const moodSelect = document.getElementById('moodSelect');
const moodMsg    = document.getElementById('moodMsg');

// Extends BEHAVIOR 2: mood select confirms choice, then immediately recants.
// The user sees their selection acknowledged and then called wrong —
// even though nothing about their choice has changed.
moodSelect.addEventListener('change', function () {
  const selectedText = moodSelect.options[moodSelect.selectedIndex].text;
  if (moodSelect.value !== '') {
    moodMsg.textContent = selectedText + "? That's not an option.";
    moodMsg.style.color = '#b33';
    setTimeout(() => {
      moodMsg.textContent = 'Actually, that works fine.';
      moodMsg.style.color = '#2a7';
    }, 1200);
    setTimeout(() => { moodMsg.textContent = ''; }, 2800);
  }
});

// ---- DOM references for checkbox area ----
const checkboxArea = document.getElementById('checkboxArea');

// ============================================================
// BEHAVIOR 4: Multiplying checkboxes
//
// Design intent: Every checkbox that gets checked spawns two more
// with increasingly absurd terms. The goal of "agreeing to
// everything" keeps receding. Parodies dark-pattern consent UI
// by making completion literally impossible.
//
// DOM manipulation (Requirement): new elements appended to DOM.
// ============================================================
let checkboxCounter = 3;
let termsUsedIndex  = 0;

const extraTerms = [
  'I consent to receiving 47 emails per day',
  "I agree my firstborn's name will be \"User12847\"",
  'I accept that clicking Submit may summon something',
  'I consent to occasional unrequested rebranding',
  'I agree this form is working correctly',
  'I acknowledge that I am definitely a human',
  'I accept cookies, brownies, and other baked goods',
  'I agree to read the 847-page privacy policy',
  'I consent to my preferences being ignored',
  'I agree to check this box again tomorrow',
  'I accept partial responsibility for server downtime',
  'I agree my data will be stored on a potato',
  'I consent to being referred to as "valued user"',
  'I accept that this form may never actually submit',
];

function spawnCheckboxes() {
  for (let i = 0; i < 2; i++) {
    if (termsUsedIndex >= extraTerms.length) return;

    const newLabel = document.createElement('label');
    newLabel.classList.add('checkbox-label', 'spawned');

    const newCheck = document.createElement('input');
    newCheck.type = 'checkbox';
    newCheck.classList.add('terms-check');
    newCheck.id = 'check' + checkboxCounter;

    // Each new checkbox also triggers more spawning (recursive)
    newCheck.addEventListener('change', spawnCheckboxes);

    newLabel.appendChild(newCheck);
    newLabel.appendChild(document.createTextNode(' ' + extraTerms[termsUsedIndex]));
    checkboxArea.appendChild(newLabel);

    checkboxCounter++;
    termsUsedIndex++;
  }
}

// Attach spawn behavior to the two initial checkboxes
document.querySelectorAll('.terms-check').forEach(function (checkbox) {
  checkbox.addEventListener('change', spawnCheckboxes);
});
// ---- DOM references for submit button and feedback ----
const globalFeedback = document.getElementById('globalFeedback');

// ============================================================
// BEHAVIOR 1: Fleeing submit button
//
// Design intent: The submit button moves away from the cursor
// whenever it comes within 160px. The closer the cursor,
// the faster it retreats. This directly attacks the primary
// goal of the page — completing the form — and turns the
// interface itself into an adversary.
//
// Dynamic CSS via JS (Requirement): left, top, transform change.
// DOM manipulation (Requirement): button removed and re-added on click.
// ============================================================
let btnLeft = 0;
let btnTop  = 0;

document.addEventListener('mousemove', function (e) {
  const btnEl = document.getElementById('submitBtn');
  if (!btnEl) return;

  const btnRect    = btnEl.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width  / 2;
  const btnCenterY = btnRect.top  + btnRect.height / 2;

  const dx       = btnCenterX - e.clientX;
  const dy       = btnCenterY - e.clientY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 160) {
    const fleeSpeed = clamp(1400 / (distance + 1), 4, 70);
    const norm      = distance > 0 ? distance : 1;

    btnLeft += (dx / norm) * fleeSpeed;
    btnTop  += (dy / norm) * fleeSpeed;

    btnLeft = clamp(btnLeft, 10, window.innerWidth  - btnRect.width  - 20);
    btnTop  = clamp(btnTop,  10, window.innerHeight - btnRect.height - 20);

    btnEl.style.position = 'fixed';
    btnEl.style.left     = btnLeft + 'px';
    btnEl.style.top      = btnTop  + 'px';
    btnEl.style.zIndex   = '999';

    btnEl.classList.toggle('shrinking', distance < 60);
  }
});

// If user catches the button: fake success, then panic, then re-spawn
document.addEventListener('click', function (e) {
  const btnEl = document.getElementById('submitBtn');
  if (btnEl && e.target === btnEl) {

    btnEl.remove(); // DOM element removed (Requirement)

    globalFeedback.textContent = 'Form submitted successfully!';
    globalFeedback.style.color = '#2a7';

    setTimeout(function () {
      globalFeedback.textContent = 'Wait — something went wrong. Please resubmit.';
      globalFeedback.style.color = '#b33';

      // Re-add button to DOM at a random position (DOM element added, Requirement)
      const newBtn       = document.createElement('button');
      newBtn.id          = 'submitBtn';
      newBtn.type        = 'button';
      newBtn.textContent = 'Submit Form';

      btnLeft = Math.round(Math.random() * (window.innerWidth  - 160));
      btnTop  = Math.round(Math.random() * (window.innerHeight - 60));

      newBtn.style.cssText = [
        'position:fixed',
        'left:' + btnLeft + 'px',
        'top:'  + btnTop  + 'px',
        'z-index:999',
        'padding:10px 28px',
        'background:#1a1a1a',
        'color:#fff',
        'border:none',
        'border-radius:6px',
        'font-size:0.95rem',
        'font-weight:500',
        'cursor:pointer',
      ].join(';');

      document.body.appendChild(newBtn);
    }, 1500);
  }
});

// ---- DOM references for progress bar ----
const progressFill  = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');

// ============================================================
// PROGRESS BAR: lies about form completion
//
// Design intent: looks like genuine helpful feedback but the
// percentage has no connection to actual field state. It speeds
// up, reverses, and resets arbitrarily. Claims 100% when the
// submit button isn't even reachable. Reinforces the theme:
// the interface's signals are meaningless and untrustworthy.
//
// Dynamic CSS via JS (Requirement): progressFill.style.width
// ============================================================
let fakeProgress      = 0;
let progressDirection = 1;

function updateFakeProgress() {
  if (Math.random() < 0.08) { progressDirection *= -1; }
  if (Math.random() < 0.04) { fakeProgress = Math.floor(Math.random() * 20); }

  fakeProgress += (Math.random() * 3) * progressDirection;
  fakeProgress  = clamp(fakeProgress, 0, 99);

  progressFill.style.width = fakeProgress + '%';

  progressLabel.textContent =
    Math.round(fakeProgress) === 99 ? '100%' : Math.round(fakeProgress) + '%';
}

setInterval(updateFakeProgress, 600);

// ============================================================
// Discarded experiment: gradually faded page opacity over 30s
// to pressure the user to hurry up. Removed — felt too hostile
// too fast and broke the slow-burn confusion effect.
// Left here as evidence of iteration (Paper Trail requirement).
//
// let pageOpacity = 1.0;
// const fadeTimer = setInterval(function () {
//   pageOpacity -= 0.01;
//   if (pageOpacity < 0.3) clearInterval(fadeTimer);
//   pageWrapper.style.opacity = pageOpacity;
// }, 1000);
// ============================================================