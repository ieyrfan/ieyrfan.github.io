document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle");
  const htmlTag = document.documentElement;
  const savedTheme = localStorage.getItem("irfanPortfolioTheme");

  function setTheme(theme) {
    htmlTag.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.innerHTML =
        theme === "dark"
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem("irfanPortfolioTheme", theme);
  }

  setTheme(
    savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  // --- 2. Navbar Scroll Effect + Scroll Progress Bar ---
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");
  const onScroll = () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

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
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.innerHTML = navLinks.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 5b. Particle Generator ---
  const particles = document.getElementById("particles");
  if (particles && window.matchMedia("(prefers-reduced-motion: reduce)").matches === false) {
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
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
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
    counters.forEach((el) => {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }

  // --- 5d. Spotlight Hover Effect ---
  const spotlightEls = document.querySelectorAll(".card, .project-card, .skill-domain");
  if (window.matchMedia("(pointer: fine)").matches) {
    spotlightEls.forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", (e.clientX - rect.left) + "px");
        el.style.setProperty("--spot-y", (e.clientY - rect.top) + "px");
      });
    });
  }

  // --- 6. Typewriter Effect ---
  const textArray = [
    "Cloud Computing",
    "Azure & OpenStack",
    "Cybersecurity",
    "IT Support",
    "Network Defense",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeTarget = document.getElementById("typewriter");

  function typeEffect() {
    if (!typeTarget) return;
    const currentWord = textArray[textIndex];
    if (isDeleting) {
      charIndex--;
      typeTarget.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      typeTarget.textContent = currentWord.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 40 : 85;
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typeSpeed = 450;
    }
    setTimeout(typeEffect, typeSpeed);
  }
  if (typeTarget) {
    typeTarget.textContent = "";
    setTimeout(typeEffect, 800);
  }

  // --- 7. Contact Form (Web3Forms) ---
  const secureForm = document.getElementById("secureContactForm");
  const encStatus = document.getElementById("encryptionStatus");
  const hashDisplay = document.getElementById("hashDisplay");
  const statusText = document.getElementById("encryptionStatusText");
  const retryBtn = document.getElementById("retrySecureBtn");
  let interval;

  if (secureForm) {
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        encStatus.classList.add("hidden");
        secureForm.style.display = "";
        hashDisplay.innerText = "";
        statusText.innerText = "Sending your message...";
        statusText.style.color = "";
      });
    }

    secureForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(secureForm);

      secureForm.style.display = "none";
      encStatus.classList.remove("hidden");
      hashDisplay.innerText = "";
      statusText.innerText = "Sending your message...";
      statusText.style.color = "";

      interval = setInterval(() => {
        const hash =
          Math.random().toString(36).substring(2, 12) +
          Math.random().toString(36).substring(2, 12);
        hashDisplay.innerText = hash.toUpperCase();
      }, 60);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
        .then(async (response) => {
          const json = await response.json();
          setTimeout(() => {
            clearInterval(interval);
            if (response.status === 200) {
              statusText.innerText = "Message sent successfully!";
              statusText.style.color = "var(--success)";
              hashDisplay.innerText = "Thank you — I'll get back to you soon.";
              secureForm.reset();
            } else {
              showFailure("Failed: " + (json.message || "Unknown error"));
            }
          }, 1500);
        })
        .catch(() => {
          setTimeout(() => showFailure("Network error. Please try again."), 1500);
        });
    });
  }

  function showFailure(message) {
    clearInterval(interval);
    statusText.innerText = message;
    statusText.style.color = "var(--danger)";
    hashDisplay.innerText = "SEND FAILED.";
    if (retryBtn) retryBtn.style.display = "inline-flex";
  }
});

// --- GPA Calculator ---
function addSubject() {
  const list = document.getElementById("subjectList");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" value="New Subject" />
    <select class="grade-select">
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
    <input type="number" class="credit-input" value="3" step="1" min="1" />
    <button class="del-row" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
  `;
  list.appendChild(div);
}

function calculateGPA() {
  const subjects = document.querySelectorAll("#subjectList > div");
  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach((s) => {
    const grade = parseFloat(s.querySelector(".grade-select").value);
    const credits = parseFloat(s.querySelector(".credit-input").value);
    if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
      totalPoints += grade * credits;
      totalCredits += credits;
    }
  });

  const resBox = document.getElementById("gpaResultBox");
  const gpaText = document.getElementById("finalGpaText");
  const badgeText = document.getElementById("gpaBadgeText");

  resBox.classList.remove("hidden");

  if (totalCredits === 0) {
    gpaText.innerText = "0.00";
    gpaText.style.color = "var(--text-muted)";
    badgeText.innerText = "Add valid subjects";
    badgeText.style.background = "var(--surface-2)";
    badgeText.style.color = "var(--text-muted)";
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
  document.getElementById("subjectList").innerHTML = "";
  document.getElementById("gpaResultBox").classList.add("hidden");
  addSubject();
  addSubject();
}

if (document.getElementById("subjectList")) {
  resetSubjects();
}

// --- URL Phishing Scanner ---
function checkPhishing() {
  const url = document.getElementById("urlInput").value.trim();
  const loader = document.getElementById("scanLoader");
  const resultBox = document.getElementById("phishingResultBox");
  const threatIconBox = document.getElementById("threatIconBox");
  const threatIcon = document.getElementById("threatIcon");
  const threatText = document.getElementById("threatText");
  const breakdownList = document.getElementById("threatBreakdown");

  resultBox.classList.add("hidden");
  if (!url) return;

  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    resultBox.classList.remove("hidden");

    let score = 0;
    const checks = [];
    const lower = url.toLowerCase();

    if (!lower.startsWith("https://")) {
      score += 25;
      checks.push({ text: "Missing HTTPS encryption", pass: false });
    } else {
      checks.push({ text: "HTTPS protocol detected", pass: true });
    }

    if (/\d+\.\d+\.\d+\.\d+/.test(url)) {
      score += 35;
      checks.push({ text: "Raw IP address used instead of domain", pass: false });
    }

    if ((lower.match(/\./g) || []).length > 3) {
      score += 20;
      checks.push({ text: "Excessive subdomains detected", pass: false });
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
        text: "Suspicious keywords found: '" + foundKw.join(", ") + "'",
        pass: false,
      });
    } else {
      checks.push({ text: "No suspicious keywords in URL", pass: true });
    }

    let foundTld = null;
    [".tk", ".ml", ".ga", ".cf", ".xyz", ".top", ".club", ".live", ".stream"].forEach(
      (t) => {
        if (lower.includes(t)) {
          score += 18;
          foundTld = t;
        }
      }
    );
    if (foundTld) {
      checks.push({ text: "High-risk TLD detected: " + foundTld, pass: false });
    }

    if (score >= 60) {
      threatText.innerText = "MALICIOUS (" + score + " Risk Score)";
      threatText.style.color = "var(--danger)";
      threatIconBox.style.background = "var(--danger)";
      threatIcon.className = "fa-solid fa-skull-crossbones";
    } else if (score >= 25) {
      threatText.innerText = "SUSPICIOUS (" + score + " Risk Score)";
      threatText.style.color = "var(--warning)";
      threatIconBox.style.background = "var(--warning)";
      threatIcon.className = "fa-solid fa-triangle-exclamation";
    } else {
      threatText.innerText = "SAFE (" + score + " Risk Score)";
      threatText.style.color = "var(--success)";
      threatIconBox.style.background = "var(--success)";
      threatIcon.className = "fa-solid fa-shield-check";
    }

    breakdownList.innerHTML = checks
      .map(
        (c) => `
      <li>
        <i class="fa-solid ${c.pass ? "fa-check" : "fa-xmark"}" style="color: ${
          c.pass ? "var(--success)" : "var(--danger)"
        }"></i>
        <span>${c.text}</span>
      </li>
    `
      )
      .join("");
  }, 1200);
}

// --- Image Lightbox ---
function openLightbox(src) {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.remove("hidden");
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  if (lightbox) lightbox.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("imageLightbox");
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
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
