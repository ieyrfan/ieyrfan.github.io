(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const themeToggle = document.getElementById("themeToggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  root.classList.add("js");

  function applyTheme(theme, persist = true) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    themeToggle?.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeColor?.setAttribute("content", dark ? "#0b0e14" : "#f2f3f5");
    if (persist) {
      try { localStorage.setItem("irfan-theme", theme); } catch {}
    }
  }

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light", false);
  themeToggle?.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  function setMenu(open) {
    siteNav?.classList.toggle("open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  menuToggle?.addEventListener("click", () => setMenu(!siteNav?.classList.contains("open")));
  siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const progress = document.getElementById("scrollProgress");
  let scrollFrame = 0;

  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    if (progress) progress.style.width = `${ratio * 100}%`;
    document.getElementById("siteHeader")?.classList.toggle("scrolled", window.scrollY > 24);
    scrollFrame = 0;
  }

  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();

  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    reveals.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-20% 0px -65%", threshold: [0, .1, .4] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  const projectRows = Array.from(document.querySelectorAll(".project-row"));
  const projectEmpty = document.getElementById("projectEmpty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      let matches = 0;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectRows.forEach((row) => {
        const categories = (row.dataset.category || "").split(" ");
        const show = filter === "all" || categories.includes(filter);
        row.hidden = !show;
        if (show) matches += 1;
      });
      if (projectEmpty) projectEmpty.hidden = matches > 0;
    });
  });

  const localTime = document.getElementById("localTime");
  function updateClock() {
    if (!localTime) return;
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kuala_Lumpur",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());
    localTime.textContent = `${time} MYT`;
  }
  updateClock();
  window.setInterval(updateClock, 30000);

  const copyButton = document.getElementById("copyEmail");
  const copyToast = document.getElementById("copyToast");
  let toastTimer;
  copyButton?.addEventListener("click", async () => {
    const email = copyButton.dataset.email || "";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = email;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
    }
    copyToast?.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => copyToast?.classList.remove("show"), 1800);
  });

  const topology = document.querySelector(".topology");
  function syncMotion() {
    if (!topology) return;
    if (reducedMotion.matches && typeof topology.pauseAnimations === "function") topology.pauseAnimations();
    else if (typeof topology.unpauseAnimations === "function") topology.unpauseAnimations();
  }
  syncMotion();
  reducedMotion.addEventListener?.("change", syncMotion);

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
