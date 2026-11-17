const stages = [
  {
    letter: "S",
    name: "Surrendered",
    color: "#287967",
    short: "Open, honest, and connected",
    description: "Living openly before God and others—willing to be known, helped, and corrected.",
    result: "Your check-in points to openness and connection. This does not mean perfect; it means you are currently willing to live honestly and stay known.",
    next: "Protect what is working. Keep your daily practices, honor your commitments, and stay connected to the people who know the real you.",
    feelings: [
      "Having a daily encounter with God", "Open and honest with self and others",
      "Willing to ask for help", "Comfortable being known", "Keeping commitments",
      "Listening instead of defending", "Grateful rather than entitled",
      "Admitting struggles early", "Present with family and others",
      "Peaceful even when life is hard", "Taking responsibility without excuses",
      "Seeking God instead of control", "Receiving correction without shutting down"
    ]
  },
  {
    letter: "T",
    name: "Turning Inward",
    color: "#667e4a",
    short: "Carrying things alone",
    description: "Stress or disappointment is beginning to move your focus inward, quietly weakening connection.",
    result: "Some things may be getting carried alone. The drift is still subtle here, which makes this a valuable time to notice it and reconnect early.",
    next: "Name one thing you have been carrying alone and tell one safe person today. Small honesty interrupts the drift.",
    feelings: [
      "Handling problems alone", "Avoiding deeper conversations", "Saying “I’m fine” when not fine",
      "Less consistent prayer or reflection", "Keeping small things hidden",
      "Becoming more private or guarded", "Justifying small compromises",
      "Feeling misunderstood but not explaining why", "Pulling back emotionally",
      "Thinking no one would understand", "More time for distraction than connection",
      "Managing image instead of reality"
    ]
  },
  {
    letter: "O",
    name: "Overwhelmed",
    color: "#b48631",
    short: "Pressure is building",
    description: "Emotional pressure is increasing, thoughts are getting louder, and distraction may be replacing processing.",
    result: "Your answers show meaningful emotional pressure. This is a signal to slow down and bring the noise into a safe conversation before it grows heavier.",
    next: "Pause the distractions long enough to name what you are feeling. Pick up the phone and talk with a trusted person before the pressure builds.",
    feelings: [
      "Racing thoughts", "Constant worry in the background", "Easily irritated",
      "Overthinking conversations", "Feeling pressure without knowing why", "Difficulty relaxing",
      "Comparing yourself to others", "Negative self-talk is increasing",
      "Avoiding feelings through phone, games, eating, TV, or work", "Trouble focusing",
      "Emotionally tired but unable to stop", "Reacting quickly instead of responding calmly"
    ]
  },
  {
    letter: "K",
    name: "Keeping Distance",
    color: "#b7683f",
    short: "Isolation is growing",
    description: "Conversations are becoming surface-level, accountability is weakening, and distance feels safer than being known.",
    result: "Distance and isolation are showing up in your check-in. Secrecy gets stronger in distance, so connection is the important move from here.",
    next: "Contact someone you have been avoiding. Be specific about where you have pulled away and invite their honest input.",
    feelings: [
      "Avoiding calls or messages", "Surface-level conversations only", "Not wanting accountability",
      "Staying busy to avoid people", "Feeling annoyed by others’ needs", "Canceling plans last minute",
      "Keeping struggles secret", "Withdrawing emotionally at home", "Listening less, defending more",
      "Feeling safer alone than connected", "Believing no one really gets you",
      "Pushing people away before they get close"
    ]
  },
  {
    letter: "E",
    name: "Exhausted",
    color: "#9f4f48",
    short: "Hope and energy are low",
    description: "Emotional and spiritual energy have dropped; shame is increasing and old coping thoughts may be returning.",
    result: "Your check-in suggests you are worn down and vulnerable. This deserves support, not shame. You do not need to manufacture energy before asking for help.",
    next: "Reach out to a trusted support person today and tell them plainly that you are exhausted. Reduce isolation and make the next safe choice small and immediate.",
    feelings: [
      "Feeling numb or flat", "Low motivation", "Hopeless or discouraged thinking",
      "Sleeping too much or too little", "Loss of interest in things that matter", "Feeling stuck",
      "Shame increasing", "Thinking about old coping behaviors", "Wanting escape more than change",
      "Feeling alone even around people", "Difficulty making simple decisions", "Sense of giving up internally"
    ]
  },
  {
    letter: "D",
    name: "Decision Point",
    color: "#7d3d49",
    short: "Honesty or secrecy",
    description: "You feel the pull between stepping into honesty and continuing toward secrecy, compromise, or relapse.",
    result: "Your answers point to a decision point. This is a moment for immediate honesty and connection—not condemnation. The next choice can change your direction.",
    next: "Pick up the phone now. Tell a trusted person the truth about what you are thinking, hiding, or resisting, and stay connected while you choose the next right step.",
    feelings: [
      "Thinking “just this once”", "Minimizing consequences", "Arguing with your own convictions",
      "Hiding thoughts or actions", "Believing relief matters more than truth",
      "Avoiding people who know you well", "Justifying secrecy",
      "Feeling pulled between honesty and escape", "Telling yourself you will deal with it later",
      "Choosing comfort over growth", "Knowing the right step but resisting it",
      "Feeling the tension between surrender and control"
    ]
  }
];

let state = { screen: "home", step: 0, selected: stages.map(() => new Set()) };
const app = document.querySelector("#app");

function topbar() {
  return `<header class="topbar"><div class="brand"><span class="brand-mark">S</span> STOKED</div><span class="privacy">Nothing leaves this device</span></header>`;
}

function render() {
  if (state.screen === "home") renderHome();
  if (state.screen === "checkin") renderCheckin();
  if (state.screen === "result") renderResult();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderHome() {
  app.innerHTML = `<div class="shell">${topbar()}<section class="hero">
    <div><p class="eyebrow">A private awareness check-in</p>
      <h1>Notice the drift.<br>Choose connection.</h1>
      <p class="hero-copy">Check the words and feelings that have been true for you over the last seven days. In a few minutes, you’ll see where you are on the STOKED Awareness Path.</p>
      <button class="primary" id="begin">Begin check-in&nbsp; →</button>
    </div>
    <div class="path-card" aria-label="The six stages of the STOKED path">
      ${stages.map(s => `<div class="path-row" style="--stage:${s.color}"><span class="path-letter">${s.letter}</span><span><span class="path-name">${s.name}</span><span class="path-note">${s.short}</span></span></div>`).join("")}
    </div>
  </section></div>`;
  document.querySelector("#begin").onclick = () => { state.screen = "checkin"; render(); };
}

function renderCheckin() {
  const stage = stages[state.step];
  app.innerHTML = `<div class="shell">${topbar()}<main class="checkin" style="--stage:${stage.color}">
    <div class="progress-wrap"><div class="progress-meta"><span>Stage ${state.step + 1} of ${stages.length}</span><span>${Math.round(((state.step + 1) / stages.length) * 100)}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${((state.step + 1) / stages.length) * 100}%"></div></div></div>
    <section class="stage-card">
      <div class="stage-heading"><span class="stage-number">${stage.letter}</span><div><p class="eyebrow">${stage.short}</p><h2>${stage.name}</h2></div></div>
      <p class="stage-description">${stage.description}</p>
      <p class="prompt">What has felt true during the last seven days?</p>
      <div class="feelings">${stage.feelings.map((feeling, i) => `<div class="feeling"><input type="checkbox" id="feeling-${i}" data-index="${i}" ${state.selected[state.step].has(i) ? "checked" : ""}><label for="feeling-${i}">${feeling}</label></div>`).join("")}</div>
      <div class="stage-actions"><div>${state.step ? '<button class="ghost" id="back">← Back</button>' : '<button class="ghost" id="home">← Home</button>'}</div><span class="selection-count" id="count">${selectionLabel(state.selected[state.step].size)}</span><button class="primary" id="next">${state.step === stages.length - 1 ? "See my result" : "Continue →"}</button></div>
    </section>
  </main></div>`;
  document.querySelectorAll('input[type="checkbox"]').forEach(input => input.onchange = e => {
    const index = Number(e.target.dataset.index);
    e.target.checked ? state.selected[state.step].add(index) : state.selected[state.step].delete(index);
    document.querySelector("#count").textContent = selectionLabel(state.selected[state.step].size);
  });
  document.querySelector("#next").onclick = () => {
    if (state.step < stages.length - 1) { state.step++; render(); }
    else { state.screen = "result"; render(); }
  };
  const back = document.querySelector("#back");
  if (back) back.onclick = () => { state.step--; render(); };
  const home = document.querySelector("#home");
  if (home) home.onclick = () => { state.screen = "home"; render(); };
}

function selectionLabel(count) { return count ? `${count} selected` : "None selected"; }

function renderResult() {
  const counts = state.selected.map(set => set.size);
  const total = counts.reduce((sum, n) => sum + n, 0);
  if (!total) return renderEmpty();
  let currentIndex = -1;
  counts.forEach((count, i) => { if (count > 0) currentIndex = i; });
  const current = stages[currentIndex];
  app.innerHTML = `<div class="shell">${topbar()}<main class="result" style="--stage:${current.color}">
    <section class="result-hero" data-letter="${current.letter}"><p class="eyebrow">Your current location</p><div class="result-stage">${current.name}</div><p class="result-summary">${current.result}</p></section>
    <div class="result-grid">
      <section class="panel"><h3>Your signals</h3><p class="panel-copy">You checked ${total} ${total === 1 ? "feeling" : "feelings"}. Your location is based on the furthest stage where you noticed a signal.</p>
        ${stages.map((s, i) => `<div class="signal-row"><span class="signal-label">${s.letter} · ${s.name}</span><div class="signal-track"><div class="signal-fill" style="--bar:${s.color};width:${counts[i] ? Math.max(9, (counts[i] / s.feelings.length) * 100) : 0}%"></div></div><strong>${counts[i]}</strong></div>`).join("")}
      </section>
      <section class="panel"><h3>Your next honest step</h3><p class="panel-copy">Awareness is an invitation to change direction, not a reason for shame.</p><div class="next-step">${current.next}</div>
        <div class="result-actions"><button class="primary" id="print">Save / print</button><button class="secondary" id="restart">Start over</button></div>
      </section>
    </div>
    <p class="disclaimer">This check-in is a personal awareness tool, not a diagnosis or crisis service. If you may harm yourself or someone else, contact local emergency services or a crisis line now.</p>
  </main></div>`;
  document.querySelector("#print").onclick = () => window.print();
  document.querySelector("#restart").onclick = reset;
}

function renderEmpty() {
  app.innerHTML = `<div class="shell">${topbar()}<section class="empty-state"><h2>No feelings selected</h2><p>That is okay. For the most useful result, go back and check anything that has felt true during the last seven days—even if it only showed up once.</p><button class="primary" id="return">Return to check-in</button> <button class="ghost" id="reset">Start over</button></section></div>`;
  document.querySelector("#return").onclick = () => { state.screen = "checkin"; state.step = 0; render(); };
  document.querySelector("#reset").onclick = reset;
}

function reset() {
  state = { screen: "home", step: 0, selected: stages.map(() => new Set()) };
  render();
}

render();
