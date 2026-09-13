(() => {
  "use strict";

  const id = document.querySelector('meta[name="portfolio-analytics-id"]')?.content.trim() || "";
  const enabled = /^G-[A-Z0-9]{6,}$/i.test(id);
  const consentKey = "irfan-portfolio-analytics-consent";
  const visitorKey = "irfan-portfolio-analytics-visitor";
  const journeyKey = "irfan-portfolio-analytics-journey";
  const sessionStartedAt = Date.now();
  const campaign = readCampaign();
  let consent = readStorage(localStorage, consentKey);
  let loaded = false;
  let currentPath = normalisePath(location.pathname);
  let currentTitle = document.title;
  let pageStartedAt = performance.now();
  let routeSequence = 0;
  let journey = readJourney();
  let scrollMilestones = new Set();
  let sessionVisitorStatus = "";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: consent === "granted" ? "granted" : "denied",
    wait_for_update: 500
  });
  window.gtag("set", "ads_data_redaction", true);

  function readStorage(storage, key) {
    try { return storage.getItem(key) || ""; } catch { return ""; }
  }

  function writeStorage(storage, key, value) {
    try { storage.setItem(key, value); } catch {}
  }

  function normalisePath(path) {
    const clean = String(path || "/").replace(/\/+$/, "");
    return clean || "/";
  }

  function cleanText(value, fallback = "unknown") {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    return (text || fallback).slice(0, 100);
  }

  function readCampaign() {
    const params = new URLSearchParams(location.search);
    const source = params.get("utm_source") || params.get("source") || "";
    const medium = params.get("utm_medium") || (params.has("source") ? "portfolio_link" : "");
    const name = params.get("utm_campaign") || params.get("campaign") || "";
    const content = params.get("utm_content") || "";
    return { source, medium, name, content };
  }

  function readJourney() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(journeyKey) || "[]");
      return Array.isArray(parsed) ? parsed.slice(-19) : [];
    } catch { return []; }
  }

  function saveJourney(path) {
    const previous = journey.at(-1) || "entry";
    if (previous !== path) journey.push(path);
    journey = journey.slice(-20);
    writeStorage(sessionStorage, journeyKey, JSON.stringify(journey));
    return previous;
  }

  function visitorStatus() {
    if (sessionVisitorStatus) return sessionVisitorStatus;
    const existing = readStorage(localStorage, visitorKey);
    if (existing) {
      sessionVisitorStatus = "returning";
      return sessionVisitorStatus;
    }
    writeStorage(localStorage, visitorKey, new Date().toISOString());
    sessionVisitorStatus = "first_time";
    return sessionVisitorStatus;
  }

  function event(name, parameters = {}) {
    if (!loaded || consent !== "granted") return;
    window.gtag("event", name, {
      ...parameters,
      page_path: currentPath,
      portfolio_page: document.documentElement.dataset.page || "unknown",
      campaign_source: campaign.source || undefined,
      campaign_medium: campaign.medium || undefined,
      campaign_name: campaign.name || undefined,
      campaign_content: campaign.content || undefined
    });
  }

  function recordPageView(path = location.pathname, title = document.title) {
    if (!loaded || consent !== "granted") return;
    const nextPath = normalisePath(path);
    const previousPath = saveJourney(nextPath);
    currentPath = nextPath;
    currentTitle = title || document.title;
    pageStartedAt = performance.now();
    scrollMilestones = new Set();
    routeSequence += 1;
    window.gtag("event", "page_view", {
      page_title: currentTitle,
      page_location: `${location.origin}${nextPath === "/" ? "/" : `${nextPath}/`}${location.search}`,
      page_path: nextPath,
      page_referrer: routeSequence === 1 ? document.referrer : `${location.origin}${previousPath}`,
      previous_page: previousPath,
      journey_step: routeSequence,
      visitor_status: visitorStatus(),
      campaign_source: campaign.source || undefined,
      campaign_medium: campaign.medium || undefined,
      campaign_name: campaign.name || undefined,
      campaign_content: campaign.content || undefined
    });
  }

  function recordEngagement(reason) {
    const activeSeconds = Math.round((performance.now() - pageStartedAt) / 1000);
    if (activeSeconds < 2) return;
    event("page_engagement", {
      engagement_seconds: Math.min(activeSeconds, 1800),
      exit_reason: reason,
      journey_depth: journey.length
    });
    pageStartedAt = performance.now();
  }

  function loadAnalytics() {
    if (!enabled || loaded || consent !== "granted") return;
    loaded = true;
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", id, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_update: true,
      campaign_source: campaign.source || undefined,
      campaign_medium: campaign.medium || undefined,
      campaign_name: campaign.name || undefined
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.dataset.portfolioAnalytics = "true";
    document.head.appendChild(script);
    recordPageView(currentPath, document.title);
  }

  function classifyInteraction(target) {
    const href = target.getAttribute("href") || "";
    const text = cleanText(target.getAttribute("aria-label") || target.textContent || href);
    const project = target.closest("[data-project]")?.dataset.project ||
      (href.match(/\/projects\/([^/?#]+)/)?.[1] || "");

    if (href.includes("Muhammad_Irfan_Resume.pdf")) return ["resume_view", { link_text: text, link_url: href }];
    if (project) return ["project_select", { project_slug: project, link_text: text, link_url: href }];
    if (href.startsWith("mailto:")) return ["contact_select", { contact_method: "email", link_text: text }];
    if (href.startsWith("tel:")) return ["contact_select", { contact_method: "phone", link_text: text }];
    if (href.includes("linkedin.com")) return ["social_select", { social_network: "linkedin", link_text: text }];
    if (href.includes("github.com")) return ["social_select", { social_network: "github", link_text: text }];
    if (target.matches("[data-lab]")) return ["lab_filter", { filter_name: target.dataset.lab }];
    if (target.matches("[data-stack]")) return ["stack_category_select", { category_name: target.dataset.stack }];
    if (target.matches("[data-security]")) return ["security_topic_select", { topic_name: target.dataset.security }];
    if (target.matches("[data-theme-mode]")) return ["atmosphere_select", { atmosphere_mode: target.dataset.themeMode }];
    if (target.matches("[data-route]")) return ["navigation_select", { destination_path: normalisePath(target.pathname), link_text: text }];
    if (target.id === "commandTrigger") return ["command_palette_open", { trigger_method: "button" }];
    if (href && /^https?:/i.test(href)) return ["outbound_click", { link_text: text, link_url: href }];
    return ["interface_select", { control_name: text }];
  }

  function createConsentBanner(force = false) {
    if (!enabled || (!force && consent)) return;
    document.getElementById("analyticsConsent")?.remove();
    const banner = document.createElement("aside");
    banner.className = "analytics-consent";
    banner.id = "analyticsConsent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "analyticsConsentTitle");
    banner.innerHTML = `<div><span>PRIVACY / ANALYTICS</span><strong id="analyticsConsentTitle">Help improve this portfolio.</strong><p>Anonymous usage data measures visits, page journeys, device type and interactions. No login details or form content are collected.</p></div><div><button type="button" data-analytics-choice="denied">ONLY NECESSARY</button><button type="button" data-analytics-choice="granted">ALLOW ANALYTICS</button></div>`;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add("visible"));
    banner.querySelector("[data-analytics-choice='granted']")?.focus({ preventScroll: true });
  }

  function saveConsent(choice) {
    consent = choice;
    writeStorage(localStorage, consentKey, choice);
    window.gtag("consent", "update", {
      analytics_storage: choice,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    const banner = document.getElementById("analyticsConsent");
    banner?.classList.remove("visible");
    window.setTimeout(() => banner?.remove(), 260);
    if (choice === "granted") loadAnalytics();
  }

  document.addEventListener("click", clickEvent => {
    const consentButton = clickEvent.target.closest("[data-analytics-choice]");
    if (consentButton) {
      saveConsent(consentButton.dataset.analyticsChoice);
      return;
    }
    if (clickEvent.target.closest("#analyticsPreferences")) {
      createConsentBanner(true);
      return;
    }
    const target = clickEvent.target.closest("a, button, [role='button']");
    if (!target || target.closest("#analyticsConsent")) return;
    const [name, parameters] = classifyInteraction(target);
    event(name, parameters);
  }, true);

  document.addEventListener("keydown", keyEvent => {
    if ((keyEvent.ctrlKey || keyEvent.metaKey) && keyEvent.key.toLowerCase() === "k") {
      event("command_palette_open", { trigger_method: "keyboard" });
    }
  });

  document.getElementById("labGrid")?.addEventListener("click", clickEvent => {
    const card = clickEvent.target.closest("article");
    if (card) event("lab_open", { lab_name: cleanText(card.querySelector("h3")?.textContent) });
  });

  window.addEventListener("portfolio:route", routeEvent => {
    const detail = routeEvent.detail || {};
    const nextPath = normalisePath(detail.path || location.pathname);
    if (nextPath === currentPath && routeSequence > 0) return;
    recordEngagement("route_change");
    recordPageView(nextPath, detail.title || document.title);
  });

  window.addEventListener("scroll", () => {
    if (!loaded || consent !== "granted") return;
    const height = document.documentElement.scrollHeight - innerHeight;
    if (height <= 0) return;
    const depth = Math.round((scrollY / height) * 100);
    [25, 50, 75, 90].forEach(mark => {
      if (depth >= mark && !scrollMilestones.has(mark)) {
        scrollMilestones.add(mark);
        event("scroll_depth", { percent_scrolled: mark });
      }
    });
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) recordEngagement("hidden");
    else pageStartedAt = performance.now();
  });
  window.addEventListener("pagehide", () => recordEngagement("page_exit"));

  if (enabled) {
    if (consent === "granted") loadAnalytics();
    else if (!consent) window.setTimeout(createConsentBanner, 900);
  } else {
    document.getElementById("analyticsPreferences")?.setAttribute("hidden", "");
  }

  window.irfanAnalytics = Object.freeze({
    enabled,
    measurementId: enabled ? id : "",
    track: event,
    openPreferences: () => createConsentBanner(true)
  });
})();
