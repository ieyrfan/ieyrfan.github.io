(() => {
  "use strict";

  document.documentElement.classList.add("js-reveal");

  document.addEventListener("DOMContentLoaded", () => {
    // --- Command palette (quick navigation) ---
    const palette = document.getElementById("commandPalette");
    const toggle = document.getElementById("commandToggle");
    const closeBtn = document.getElementById("commandClose");
    const search = document.getElementById("commandSearch");
    const results = document.getElementById("commandResults");
    const empty = document.getElementById("commandEmpty");
    let lastToggleFocus = null;

    const links = results ? Array.from(results.querySelectorAll("a")) : [];

    function openPalette() {
      if (!palette || palette.open) return;
      lastToggleFocus = document.activeElement;
      try {
        palette.showModal();
      } catch (_) {
        palette.setAttribute("open", "");
      }
      if (search) {
        search.value = "";
        filterCommands("");
        search.focus();
      }
    }

    function closePalette() {
      if (!palette || !palette.open) return;
      palette.close();
      if (lastToggleFocus && lastToggleFocus.isConnected) lastToggleFocus.focus();
    }

    function filterCommands(query) {
      if (!results) return;
      const q = query.trim().toLowerCase();
      let visible = 0;
      links.forEach((a) => {
        const match = !q || a.textContent.toLowerCase().includes(q);
        a.style.display = match ? "" : "none";
        if (match) visible++;
      });
      if (empty) empty.classList.toggle("hidden", visible > 0);
    }

    if (palette) {
      toggle?.addEventListener("click", openPalette);
      closeBtn?.addEventListener("click", closePalette);
      search?.addEventListener("input", () => filterCommands(search.value));
      search?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          links.find((a) => a.style.display !== "none")?.click();
        }
      });
      links.forEach((a) =>
        a.addEventListener("click", (event) => {
          if (a.dataset.action) {
            event.preventDefault();
            if (a.dataset.action === "theme") document.getElementById("themeToggle")?.click();
            if (a.dataset.action === "copy-email") document.getElementById("copyEmailBtn")?.click();
          }
          closePalette();
        })
      );
      palette.addEventListener("click", (event) => {
        if (event.target === palette) closePalette();
      });
      document.addEventListener("keydown", (event) => {
        const mod = event.ctrlKey || event.metaKey;
        if (mod && event.key.toLowerCase() === "k") {
          event.preventDefault();
          if (palette.open) closePalette();
          else openPalette();
        } else if (event.key === "Escape" && palette.open) {
          closePalette();
        }
      });
    }

    // --- Project filters + search ---
    const filterBtns = Array.from(document.querySelectorAll(".filter-btn[data-filter]"));
    const cards = Array.from(document.querySelectorAll("#projects .project-card[data-category]"));
    const status = document.getElementById("projectFilterStatus");
    const projectSearch = document.getElementById("projectSearch");
    let activeFilter = "all";

    // Keep the "All work" count in sync with the actual number of projects.
    const allBtnCount = document.querySelector('.filter-btn[data-filter="all"] span');
    if (allBtnCount) allBtnCount.textContent = String(cards.length);

    function cardMatches(card) {
      const categoryOk = activeFilter === "all" || card.dataset.category === activeFilter;
      const q = (projectSearch?.value || "").trim().toLowerCase();
      if (!q) return categoryOk;
      const haystack = `${card.querySelector("h3")?.textContent || ""} ${card.querySelector(".card-text")?.textContent || ""} ${Array.from(card.querySelectorAll(".tech-tags span")).map((s) => s.textContent).join(" ")}`.toLowerCase();
      return categoryOk && haystack.includes(q);
    }

    function applyFilter(name) {
      activeFilter = name || activeFilter;
      filterBtns.forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === activeFilter));
      });
      let shown = 0;
      cards.forEach((card) => {
        const show = cardMatches(card);
        card.hidden = !show;
        if (show) shown++;
      });
      const archive = document.getElementById("projectArchive");
      const hasQuery = Boolean(projectSearch?.value.trim());
      const archiveMatches = cards.some(card => card.closest("#projectArchive") && !card.hidden);
      if (archive) {
        archive.hidden = !archiveMatches;
        if (activeFilter !== "all" || hasQuery) archive.open = true;
      }
      const featured = document.querySelector(".featured-grid");
      if (featured) featured.hidden = !cards.some(card => card.closest(".featured-grid") && !card.hidden);
      const emptyMessage = document.getElementById("projectEmpty");
      if (emptyMessage) emptyMessage.hidden = shown > 0;
      if (status) {
        const q = (projectSearch?.value || "").trim();
        const scope = activeFilter === "all" ? "all projects" : `${activeFilter} projects`;
        status.textContent = `Showing ${shown} of ${cards.length} ${scope}${q ? ` matching "${q}"` : ""}.`;
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
    });
    projectSearch?.addEventListener("input", () => applyFilter());

    // --- Footer year + copy-email button ---
    const yearEl = document.getElementById("siteYear");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    const updatedEl = document.getElementById("lastUpdated");
    if (updatedEl && document.lastModified) {
      const d = new Date(document.lastModified);
      if (!isNaN(d)) {
        updatedEl.textContent = `Last updated ${d.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`;
      }
    }

    const copyBtn = document.getElementById("copyEmailBtn");
    const copyFeedback = document.getElementById("copyEmailFeedback");
    copyBtn?.addEventListener("click", async () => {
      const email = copyBtn.dataset.email || "";
      const label = copyBtn.querySelector("span");
      const done = () => {
        if (label) label.textContent = "Copied ✓";
        if (copyFeedback) copyFeedback.textContent = "Email address copied to clipboard.";
        setTimeout(() => {
          if (label) label.textContent = "Copy email";
          if (copyFeedback) copyFeedback.textContent = "";
        }, 2000);
      };
      try {
        await navigator.clipboard.writeText(email);
        done();
      } catch (_) {
        const ta = document.createElement("textarea");
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done();
        } catch (__) {
          if (copyFeedback) copyFeedback.textContent = `Copy this email: ${email}`;
        }
        ta.remove();
      }
    });

    // --- Certification search ---
    const certSearch = document.getElementById("certSearch");
    const certDetails = document.querySelector(".credential-details");
    const certItems = Array.from(document.querySelectorAll(".cert-list .cert-item"));
    certSearch?.addEventListener("input", () => {
      const q = certSearch.value.trim().toLowerCase();
      if (q && certDetails && !certDetails.open) certDetails.open = true;
      certItems.forEach((item) => {
        item.style.display = !q || item.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });

    // --- Message character counter ---
    const msg = document.getElementById("senderMessage");
    const msgCount = document.getElementById("msgCount");
    msg?.addEventListener("input", () => {
      if (msgCount) msgCount.textContent = String(msg.value.length);
    });

    // --- Live deploy pill (public GitHub data, fail-silent offline) ---
    const deployPill = document.getElementById("deployPill");
    const deployPillText = document.getElementById("deployPillText");
    const timeAgo = (d) => {
      const s = Math.max(0, Math.floor((Date.now() - d.getTime()) / 1000));
      if (s < 60) return "just now";
      const m = Math.floor(s / 60);
      if (m < 60) return `${m}m ago`;
      const h = Math.floor(m / 60);
      if (h < 24) return `${h}h ago`;
      const days = Math.floor(h / 24);
      if (days < 7) return `${days}d ago`;
      const w = Math.floor(days / 7);
      if (w < 5) return `${w}w ago`;
      const mo = Math.floor(days / 30);
      if (mo < 12) return `${mo}mo ago`;
      return `${Math.floor(days / 365)}y ago`;
    };
    if (deployPill && deployPillText) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const t0 = performance.now();
      fetch("https://api.github.com/users/ieyrfan/events/public?per_page=10", { signal: ctrl.signal })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`http ${res.status}`))))
        .then((events) => {
          const push = (events || []).find((e) => e.type === "PushEvent");
          if (!push) throw new Error("no push event");
          const ms = Math.round(performance.now() - t0);
          deployPillText.textContent = `Pushed ${timeAgo(new Date(push.created_at))} · ${ms}ms`;
          deployPill.title = `GitHub API edge latency measured live: ${ms}ms`;
          deployPill.hidden = false;
        })
        .catch(() => deployPill.remove())
        .finally(() => clearTimeout(timer));
    }

    // --- Scrollspy: highlight the nav link for the section in view ---
    const navAnchors = Array.from(document.querySelectorAll('#navLinks a[href^="#"]'));
    const sections = navAnchors
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    function setCurrent(id) {
      navAnchors.forEach((a) => {
        const on = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("is-current", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }

    if ("IntersectionObserver" in window && sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setCurrent(entry.target.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
    }
    // --- Copy-link buttons on section titles ---
    document.querySelectorAll("main section[id] .section-title").forEach((h) => {
      const sec = h.closest("section");
      if (!sec) return;
      const btn = document.createElement("button");
      btn.className = "sec-link";
      btn.type = "button";
      const baseLabel = `Copy link to ${sec.id} section`;
      btn.setAttribute("aria-label", baseLabel);
      btn.innerHTML = '<i class="fa-solid fa-link" aria-hidden="true"></i>';
      btn.addEventListener("click", async () => {
        const url = `${location.origin}${location.pathname}#${sec.id}`;
        try {
          await navigator.clipboard.writeText(url);
        } catch (_) {
          const ta = document.createElement("textarea");
          ta.value = url;
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (__) {}
          ta.remove();
        }
        btn.classList.add("copied");
        btn.setAttribute("aria-label", "Link copied!");
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.setAttribute("aria-label", baseLabel);
        }, 1800);
      });
      h.appendChild(btn);
    });
  });
})();
