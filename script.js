document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle");
  const htmlTag = document.documentElement;
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersReduced = () => motionPreference.matches || htmlTag.dataset.motion === "reduced";
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("irfanPortfolioTheme");
  } catch (_) {
    // The portfolio remains usable when browser storage is unavailable.
  }

  function setTheme(theme) {
    htmlTag.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.innerHTML =
        theme === "dark"
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    try {
      localStorage.setItem("irfanPortfolioTheme", theme);
    } catch (_) {}
  }

  setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  // --- 1b. Hero word rotator ---
  const rotWords = document.querySelectorAll("#rotator .rot-word");
  let rotationTimer;
  let ri = Math.max(0, Array.from(rotWords).findIndex((word) => word.classList.contains("is-active")));
  const syncRotation = () => {
    clearInterval(rotationTimer);
    if (rotWords.length < 2 || prefersReduced() || document.hidden) return;
    rotationTimer = setInterval(() => {
      rotWords[ri].classList.remove("is-active");
      ri = (ri + 1) % rotWords.length;
      rotWords[ri].classList.add("is-active");
    }, 2800);
  };
  document.addEventListener("visibilitychange", syncRotation);
  document.addEventListener("portfolio:motionchange", syncRotation);
  motionPreference.addEventListener("change", syncRotation);
  syncRotation();

  // --- 2. Navbar Scroll Effect + Scroll Progress Bar ---
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");
  const onScroll = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);

    if (scrollProgress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      scrollProgress.style.width = pct + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- 3. Mobile Menu ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    const desktopNav = window.matchMedia("(min-width: 1100px)");
    const setMenuOpen = (open, restoreFocus = false) => {
      navLinks.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-controls", "navLinks");
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navLinks.inert = !desktopNav.matches && !open;
      menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
      if (restoreFocus) menuToggle.focus();
    };
    menuToggle.addEventListener("click", () => setMenuOpen(!navLinks.classList.contains("open")));
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) setMenuOpen(false, true);
    });
    document.addEventListener("click", (event) => {
      // The toggle replaces its icon; composedPath keeps the original click ancestry.
      if (!event.composedPath().includes(navLinks) && !event.composedPath().includes(menuToggle)) setMenuOpen(false);
    });
    desktopNav.addEventListener("change", () => setMenuOpen(false));
    setMenuOpen(false);
  }

  // --- 4. Reveal on Scroll (IntersectionObserver) ---
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // --- 5. Back to Top ---
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
      },
      { passive: true }
    );
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReduced() ? "instant" : "smooth" });
    });
  }

  // --- 5b. Particle Generator ---
  const particles = document.getElementById("particles");
  if (particles && !prefersReduced()) {
    const palette = ["var(--primary)", "var(--accent)", "var(--sky)"];
    for (let i = 0; i < 16; i++) {
      const span = document.createElement("span");
      const size = 2 + Math.random() * 3;
      span.style.width = size + "px";
      span.style.height = size + "px";
      span.style.left = Math.random() * 100 + "%";
      span.style.background = palette[i % palette.length];
      span.style.animationDuration = 14 + Math.random() * 16 + "s";
      span.style.animationDelay = Math.random() * -24 + "s";
      particles.appendChild(span);
    }
  }

  // --- 5c. Animated Stat Counters ---
  const counters = document.querySelectorAll("[data-count]");
  const finishCounter = (el) => {
    el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
  };
  const animateCounter = (el) => {
    if (prefersReduced()) return finishCounter(el);
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      if (prefersReduced()) return finishCounter(el);
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => counterIO.observe(el));
  } else {
    counters.forEach(finishCounter);
  }
  const syncCounters = () => {
    if (prefersReduced()) counters.forEach(finishCounter);
  };
  document.addEventListener("portfolio:motionchange", syncCounters);
  motionPreference.addEventListener("change", syncCounters);
  syncCounters();

  // --- 5c. Attack simulation (AEGIS demo, clearly labelled simulation) ---
  const attackBtn = document.getElementById("attackSimBtn");
  const aegisVisual = document.querySelector(".visual-aegis");
  const miniEvents = aegisVisual ? aegisVisual.querySelector(".mini-events") : null;
  const attackLines = ["Intrusion attempt blocked", "Isolating affected node", "Rotating credentials"];
  let attackTimer = null;

  const setAttack = (on) => {
    if (!attackBtn || !aegisVisual) return;
    attackBtn.setAttribute("aria-pressed", String(on));
    attackBtn.querySelector("span").textContent = on ? "Stop simulation" : "Simulate attack";
    aegisVisual.classList.toggle("attack", on);
    if (miniEvents) {
      if (on && !miniEvents.dataset.orig) miniEvents.dataset.orig = miniEvents.innerHTML;
      if (on) {
        miniEvents.innerHTML =
          "<span>ACTIVE SIMULATION</span>" +
          attackLines.map((t) => `<p><i></i> ${t}</p>`).join("") +
          '<div class="mini-bars"><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div>';
      } else if (miniEvents.dataset.orig) {
        miniEvents.innerHTML = miniEvents.dataset.orig;
      }
    }
    window.dispatchEvent(new CustomEvent("portfolio:attackmode", { detail: { on } }));
    if (attackTimer) {
      clearTimeout(attackTimer);
      attackTimer = null;
    }
    if (on) attackTimer = setTimeout(() => setAttack(false), 20000);
  };

  if (attackBtn) {
    attackBtn.addEventListener("click", () => {
      setAttack(attackBtn.getAttribute("aria-pressed") !== "true");
    });
  }
  document.addEventListener("portfolio:motionchange", () => {
    if (attackBtn && attackBtn.getAttribute("aria-pressed") === "true") setAttack(false);
  });

  // --- 5e. AEGIS live sensor readout (decorative demo text) ---
  const socLines = ["1,204 events/s · all green", "Threat intel synced", "3 open investigations", "0 critical alerts", "2,418 events/s · all green"];
  let socIdx = 0;
  setInterval(() => {
    if (document.hidden || prefersReduced()) return;
    const el = document.getElementById("socLogText");
    if (!el || !el.isConnected) return;
    socIdx = (socIdx + 1) % socLines.length;
    el.textContent = socLines[socIdx];
  }, 3000);

  // --- 5d. Spotlight Hover Effect ---
  const spotlightEls = document.querySelectorAll(".card, .project-card, .skill-domain");
  if (window.matchMedia("(pointer: fine)").matches) {
    spotlightEls.forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        if (prefersReduced()) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", (e.clientX - rect.left) + "px");
        el.style.setProperty("--spot-y", (e.clientY - rect.top) + "px");
      });
    });
  }

  // --- 7. Contact Form (Web3Forms) ---
  const secureForm = document.getElementById("secureContactForm");
  const encStatus = document.getElementById("encryptionStatus");
  const statusText = document.getElementById("encryptionStatusText");
  const retryBtn = document.getElementById("retrySecureBtn");
  const statusIcon = document.getElementById("contactStatusIcon");
  let sending = false;

  if (secureForm && encStatus && statusText) {
    encStatus.setAttribute("tabindex", "-1");
    encStatus.setAttribute("role", "status");
    encStatus.setAttribute("aria-live", "polite");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        if (sending) return;
        encStatus.classList.add("hidden");
        secureForm.style.display = "";
        statusText.innerText = "Sending your message...";
        statusText.style.color = "";
        secureForm.querySelector("input:not([type='hidden']), textarea")?.focus();
      });
    }

    secureForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sending || !secureForm.reportValidity()) return;
      sending = true;
      const formData = new FormData(secureForm);
      secureForm.style.display = "none";
      encStatus.classList.remove("hidden");
      statusText.innerText = "Sending your message...";
      statusText.style.color = "";
      encStatus.setAttribute("aria-busy", "true");
      if (statusIcon) statusIcon.className = "fa-solid fa-spinner fa-spin";
      if (retryBtn) retryBtn.style.display = "none";
      encStatus.focus();

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let succeeded = false;
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });
        const json = await response.json();
        if (response.ok && json.success === true) {
          succeeded = true;
          statusText.innerText = "Message sent successfully. Thank you for reaching out!";
          statusText.style.color = "var(--success)";
          secureForm.reset();
        } else {
          statusText.innerText = "Unable to send: " + (json.message || "Please try again.");
          statusText.style.color = "var(--danger)";
        }
      } catch (error) {
        statusText.innerText = error.name === "AbortError"
          ? "The request timed out. Delivery is unconfirmed; please try again or use the email link."
          : "We could not confirm delivery. Please check your connection and try again.";
        statusText.style.color = "var(--danger)";
      } finally {
        clearTimeout(timeout);
        sending = false;
        encStatus.setAttribute("aria-busy", "false");
        if (statusIcon) statusIcon.className = succeeded ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation";
        if (retryBtn) {
          retryBtn.textContent = succeeded ? "Send another message" : "Try again";
          retryBtn.style.display = "inline-flex";
        }
      }
    });
  }
});

// --- GPA Calculator ---
let subjectSequence = 0;
function addSubject() {
  const list = document.getElementById("subjectList");
  if (!list) return;
  const number = ++subjectSequence;
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" value="New Subject" aria-label="Subject ${number} name" />
    <select class="grade-select" aria-label="Subject ${number} grade">
      <option value="4.0">A</option>
      <option value="3.7">A-</option>
      <option value="3.3">B+</option>
      <option value="3.0">B</option>
      <option value="2.7">B-</option>
      <option value="2.3">C+</option>
      <option value="2.0">C</option>
      <option value="1.0">D</option>
      <option value="0.0">F</option>
    </select>
    <input type="number" class="credit-input" value="3" step="1" min="1" max="30" required aria-label="Subject ${number} credits, from 1 to 30" />
    <button type="button" class="del-row" aria-label="Remove subject ${number}"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
  `;
  const hideResult = () => document.getElementById("gpaResultBox")?.classList.add("hidden");
  div.addEventListener("input", (event) => {
    event.target.removeAttribute("aria-invalid");
    hideResult();
  });
  div.querySelector(".del-row").addEventListener("click", () => {
    const nextField = div.nextElementSibling?.querySelector("input") || div.previousElementSibling?.querySelector("input");
    div.remove();
    hideResult();
    (nextField || document.querySelector(".btn-add-row"))?.focus();
  });
  list.appendChild(div);
  hideResult();
}

function calculateGPA() {
  const subjects = document.querySelectorAll("#subjectList > div");
  let totalPoints = 0;
  let totalCredits = 0;
  let invalidCredit = null;

  subjects.forEach((s) => {
    const grade = Number(s.querySelector(".grade-select").value);
    const creditInput = s.querySelector(".credit-input");
    const credits = Number(creditInput.value);
    const valid = Number.isInteger(credits) && credits >= 1 && credits <= 30;
    creditInput.setAttribute("aria-invalid", String(!valid));
    if (!valid && !invalidCredit) invalidCredit = creditInput;
    if (Number.isFinite(grade) && valid) {
      totalPoints += grade * credits;
      totalCredits += credits;
    }
  });

  const resBox = document.getElementById("gpaResultBox");
  const gpaText = document.getElementById("finalGpaText");
  const badgeText = document.getElementById("gpaBadgeText");
  if (!resBox || !gpaText || !badgeText) return;

  resBox.setAttribute("role", "status");
  resBox.setAttribute("aria-live", "polite");
  resBox.classList.remove("hidden");

  if (invalidCredit || totalCredits === 0) {
    gpaText.innerText = "—";
    gpaText.style.color = "var(--text-muted)";
    badgeText.innerText = invalidCredit ? "Enter whole-number credits from 1 to 30 for every subject." : "Add at least one subject to calculate your GPA.";
    badgeText.style.background = "var(--surface-2)";
    badgeText.style.color = "var(--text-muted)";
    invalidCredit?.focus();
  } else {
    const gpa = (totalPoints / totalCredits).toFixed(2);
    gpaText.innerText = gpa;

    if (gpa >= 3.5) {
      gpaText.style.color = "var(--success)";
      badgeText.innerText = "Dean's List Target!";
      badgeText.style.background = "var(--success-soft)";
      badgeText.style.color = "var(--success)";
    } else if (gpa >= 3.0) {
      gpaText.style.color = "var(--primary)";
      badgeText.innerText = "Good Standing";
      badgeText.style.background = "var(--primary-soft)";
      badgeText.style.color = "var(--primary)";
    } else if (gpa >= 2.0) {
      gpaText.style.color = "var(--warning)";
      badgeText.innerText = "Needs Improvement";
      badgeText.style.background = "var(--warning-soft)";
      badgeText.style.color = "var(--warning)";
    } else {
      gpaText.style.color = "var(--danger)";
      badgeText.innerText = "Academic Probation Risk";
      badgeText.style.background = "var(--danger-soft)";
      badgeText.style.color = "var(--danger)";
    }
  }
}

function resetSubjects() {
  const list = document.getElementById("subjectList");
  if (!list) return;
  list.innerHTML = "";
  subjectSequence = 0;
  document.getElementById("gpaResultBox")?.classList.add("hidden");
  addSubject();
  addSubject();
}

if (document.getElementById("subjectList")) {
  resetSubjects();
}

// --- URL Phishing Scanner ---
async function checkPhishing() {
  const input = document.getElementById("urlInput");
  const url = input.value.trim();
  const loader = document.getElementById("scanLoader");
  const resultBox = document.getElementById("phishingResultBox");
  const threatIconBox = document.getElementById("threatIconBox");
  const threatIcon = document.getElementById("threatIcon");
  const threatText = document.getElementById("threatText");
  const breakdownList = document.getElementById("threatBreakdown");

  resultBox.setAttribute("role", "status");
  resultBox.setAttribute("aria-live", "polite");
  loader.classList.remove("hidden");
  resultBox.classList.add("hidden");
  breakdownList.replaceChildren();
  input.removeAttribute("aria-invalid");
  const scanBtn = document.getElementById("scanBtn");
  const reducedScan = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduced";
  if (scanBtn) scanBtn.disabled = true;

  let parsed;
  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(url);
  try {
    if (!url || /\s/.test(url)) throw new Error("Invalid URL");
    parsed = new URL(hasProtocol ? url : "https://" + url);
    if (!["http:", "https:"].includes(parsed.protocol) ||
        (!parsed.hostname.includes(".") && !parsed.hostname.startsWith("[") && parsed.hostname !== "localhost")) {
      throw new Error("Invalid URL");
    }
  } catch (_) {
    input.setAttribute("aria-invalid", "true");
    threatText.innerText = "Enter a valid HTTP or HTTPS URL";
    threatText.style.color = "var(--warning)";
    threatIconBox.style.background = "var(--warning)";
    threatIcon.className = "fa-solid fa-circle-exclamation";
    const item = document.createElement("li");
    item.textContent = "Try https://example.com. This tool checks URL patterns locally and does not visit the address.";
    breakdownList.appendChild(item);
    loader.classList.add("hidden");
    resultBox.classList.remove("hidden");
    if (scanBtn) scanBtn.disabled = false;
    input.focus();
    return;
  }

  const loaderText = loader.querySelector("span");
  if (loaderText) loaderText.textContent = "Resolving host...";
  if (!reducedScan) await new Promise((r) => setTimeout(r, 350));
  if (loaderText) loaderText.textContent = "Checking URL patterns...";
  if (!reducedScan) await new Promise((r) => setTimeout(r, 400));
  loader.classList.add("hidden");
  resultBox.classList.remove("hidden");
  if (scanBtn) scanBtn.disabled = false;

    let score = 0;
    const checks = [];
    const lower = parsed.hostname.toLowerCase();

    if (parsed.protocol !== "https:") {
      score += 25;
      checks.push({ text: "HTTP address: the requested connection is not encrypted.", pass: false });
    } else {
      checks.push({ text: hasProtocol ? "HTTPS requested. HTTPS alone does not establish trust." : "No protocol supplied; HTTPS assumed for this pattern check.", pass: true });
    }

    if (/^\d+\.\d+\.\d+\.\d+$/.test(lower) || lower.startsWith("[")) {
      score += 35;
      checks.push({ text: "Raw IP address used instead of domain", pass: false });
    }

    if ((lower.match(/\./g) || []).length > 3) {
      score += 20;
      checks.push({ text: "Multiple hostname levels: inspect the registered domain carefully.", pass: false });
    }

    const foundKw = [];
    [
      "login",
      "verify",
      "secure",
      "account",
      "update",
      "confirm",
      "paypal",
      "banking",
      "signin",
      "password",
    ].forEach((k) => {
      if (lower.includes(k)) {
        score += 12;
        foundKw.push(k);
      }
    });
    if (foundKw.length > 0) {
      checks.push({
        text: "Hostname keywords worth reviewing: " + foundKw.join(", ") + ". Legitimate sites can use these too.",
        pass: false,
      });
    } else {
      checks.push({ text: "No listed attention keywords in the hostname.", pass: true });
    }

    const foundTld = [".tk", ".ml", ".ga", ".cf", ".xyz", ".top", ".club", ".live", ".stream"].find((tld) => lower.endsWith(tld));
    if (foundTld) {
      score += 18;
      checks.push({ text: "Suffix " + foundTld + " matches this demo's review list; the suffix alone does not imply abuse.", pass: false });
    }
    if (parsed.username || parsed.password) {
      score += 30;
      checks.push({ text: "Embedded credentials can disguise the actual destination hostname.", pass: false });
    }

    score = Math.min(score, 100);
    if (score >= 60) {
      threatText.innerText = "Several review signals · " + score + "/100";
      threatText.style.color = "var(--danger)";
      threatIconBox.style.background = "var(--danger)";
      threatIcon.className = "fa-solid fa-skull-crossbones";
    } else if (score >= 25) {
      threatText.innerText = "Review suggested · " + score + "/100";
      threatText.style.color = "var(--warning)";
      threatIconBox.style.background = "var(--warning)";
      threatIcon.className = "fa-solid fa-triangle-exclamation";
    } else {
      threatText.innerText = "Few obvious signals · " + score + "/100";
      threatText.style.color = "var(--success)";
      threatIconBox.style.background = "var(--success)";
      threatIcon.className = "fa-solid fa-shield-halved";
    }

    checks.push({ text: "Unverified heuristic result, not a safety guarantee. No live reputation, page content, redirects, or certificates were checked.", pass: null });
    checks.forEach((check) => {
      const item = document.createElement("li");
      const icon = document.createElement("i");
      icon.className = "fa-solid " + (check.pass === null ? "fa-circle-info" : check.pass ? "fa-check" : "fa-triangle-exclamation");
      icon.setAttribute("aria-hidden", "true");
      icon.style.color = check.pass === null ? "var(--text-muted)" : check.pass ? "var(--success)" : "var(--warning)";
      const text = document.createElement("span");
      text.textContent = check.text;
      item.append(icon, text);
      breakdownList.appendChild(item);
    });
}

// --- Cloud lab: cost estimator (simplified on-demand rates, for learning) ---
const COST_RATES = { ec2: 0.0104, s3: 0.023, lambda: 0.2 };
function updateCost() {
  const totalEl = document.getElementById("costTotal");
  if (!totalEl) return;
  const h = Number(document.getElementById("costEC2").value || 0);
  const gb = Number(document.getElementById("costS3").value || 0);
  const m = Number(document.getElementById("costLambda").value || 0);
  document.getElementById("costEC2Val").textContent = `${h} hrs`;
  document.getElementById("costS3Val").textContent = `${gb} GB`;
  document.getElementById("costLambdaVal").textContent = `${m}M / mo`;
  const total = h * COST_RATES.ec2 + gb * COST_RATES.s3 + Math.max(0, m - 1) * COST_RATES.lambda;
  totalEl.textContent = `$${total.toFixed(2)}`;
}
["costEC2", "costS3", "costLambda"].forEach((id) => {
  document.getElementById(id)?.addEventListener("input", updateCost);
});
updateCost();

// --- Cloud lab: pod self-healing demo (simulation) ---
const podGrid = document.getElementById("podGrid");
const podLog = document.getElementById("podLog");
const killPodBtn = document.getElementById("killPodBtn");
const POD_COUNT = 6;
let pods = [];
let healing = false;
const reducedLab = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduced";
function stamp() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}
function renderPods() {
  if (!podGrid) return;
  podGrid.replaceChildren();
  pods.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = `pod ${p === "running" ? "" : p}`;
    d.innerHTML = `<i class="fa-solid fa-cube" aria-hidden="true"></i><small>pod-${i + 1}</small>`;
    podGrid.appendChild(d);
  });
  if (podLog && !healing) {
    const up = pods.filter((p) => p === "running").length;
    podLog.textContent = `${up}/${POD_COUNT} pods running · all green`;
  }
}
if (podGrid) {
  pods = Array(POD_COUNT).fill("running");
  renderPods();
  killPodBtn?.addEventListener("click", () => {
    if (healing) return;
    const alive = pods.map((p, i) => (p === "running" ? i : -1)).filter((i) => i >= 0);
    if (!alive.length) return;
    healing = true;
    killPodBtn.disabled = true;
    const victim = alive[Math.floor(Math.random() * alive.length)];
    const step = reducedLab() ? 60 : 650;
    pods[victim] = "dying";
    renderPods();
    if (podLog) podLog.textContent = `[${stamp()}] pod-${victim + 1} received SIGTERM…`;
    setTimeout(() => {
      pods[victim] = "dead";
      renderPods();
      if (podLog) podLog.textContent = `[${stamp()}] pod-${victim + 1} down — ReplicaSet rescheduling…`;
      setTimeout(() => {
        pods[victim] = "running";
        healing = false;
        if (killPodBtn) killPodBtn.disabled = false;
        renderPods();
        if (podLog) podLog.textContent = `[${stamp()}] pod-${victim + 1} running — self-healed ✓`;
      }, step);
    }, step);
  });
}

// --- Cloud lab: deploy pipeline demo (simulation) ---
const pipeStages = Array.from(document.querySelectorAll("#pipeStages li"));
const pipeLog = document.getElementById("pipeLog");
const runPipeBtn = document.getElementById("runPipeBtn");
if (runPipeBtn && pipeStages.length) {
  runPipeBtn.addEventListener("click", async () => {
    runPipeBtn.disabled = true;
    pipeStages.forEach((li) => li.classList.remove("active", "done"));
    const ver = `1.${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 9)}`;
    const sha = Math.random().toString(36).slice(2, 8);
    const t0 = performance.now();
    const wait = (ms) => new Promise((r) => setTimeout(r, reducedLab() ? 0 : ms));
    const steps = [
      ["commit", `Pushing commit ${sha}…`],
      ["build", "Building container image…"],
      ["test", "Running 142 tests…"],
      ["deploy", `Rolling out v${ver}…`],
    ];
    for (const [name, msg] of steps) {
      if (pipeLog) pipeLog.textContent = `[${stamp()}] ${msg}`;
      const li = pipeStages.find((el) => el.dataset.stage === name);
      li?.classList.add("active");
      await wait(name === "test" ? 900 : 700);
      li?.classList.remove("active");
      li?.classList.add("done");
    }
    const secs = ((performance.now() - t0) / 1000).toFixed(1);
    if (pipeLog) pipeLog.textContent = `[${stamp()}] v${ver} live in ${secs}s · 142/142 tests passed ✓`;
    runPipeBtn.disabled = false;
  });
}

// --- Image Lightbox ---
let lightboxTrigger = null;
function openLightbox(src) {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightbox && lightboxImg && !lightbox.open) {
    lightboxTrigger = document.activeElement;
    lightboxImg.src = src;
    lightbox.showModal();
    document.getElementById("closeLightboxButton")?.focus();
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  if (lightbox?.open) lightbox.close();
}

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("imageLightbox");
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener("close", () => {
      if (lightboxTrigger?.isConnected) lightboxTrigger.focus();
      lightboxTrigger = null;
    });
  }
  const urlInput = document.getElementById("urlInput");
  if (urlInput) {
    urlInput.setAttribute("aria-label", "URL to check for suspicious patterns");
    urlInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkPhishing();
      }
    });
  }
});

// --- Download V-Card ---
function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Muhammad Irfan Bin Rizal
N:Rizal;Muhammad Irfan;;;
TITLE:Cloud & IT Professional
EMAIL;TYPE=INTERNET:Irfanizzani46@gmail.com
URL:https://irfanrizal.com
NOTE:Bachelor of Technology in Cloud Computing & Application (Hons) at UTeM. AWS Academy Graduate & Cisco Cybersecurity Pathway achiever.
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "Irfan_Rizal_Contact.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
