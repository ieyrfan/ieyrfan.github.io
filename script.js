(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const touchMode = window.matchMedia("(hover: none), (pointer: coarse)");

  const projectData = {
    funcloudsoc: {
      order: "01", name: "FunCloudSOC", subtitle: "Autonomous Cloud Security Response Architecture",
      tags: ["AWS", "Terraform", "CloudFormation", "Docker", "Flask", "Python", "CloudWatch", "AWS Config"],
      source: "https://github.com/ieyrfan",
      sections: [
        ["01", "The problem", "Cloud security signals are useful only when they lead to a traceable decision, a controlled action and verified recovery. Detection alone does not close an incident."],
        ["02", "The objective", "Design a cloud-native security response architecture that connects monitoring, incident state, policy-bounded automation and preserved evidence."],
        ["03", "The solution", "A design-complete, evaluation-ready PSM I prototype that models the full detect, decide, act and verify loop without presenting planned PSM II measurements as achieved results."],
        ["04", "Architecture", "Internet traffic reaches the protected web workload. Cloud telemetry feeds detection and incident tracking. Approved automation can invoke containment or recovery, followed by an independent probe."],
        ["05", "Technology", "AWS services, Terraform and CloudFormation for infrastructure; Python and Flask for orchestration; Docker for repeatable packaging; CloudWatch, CloudTrail and AWS Config for signals and configuration evidence."],
        ["06", "Security considerations", "Least privilege, bounded actions, explicit trust boundaries, audit preservation and independent recovery verification shape the response path."],
        ["07", "Challenges", "The main engineering challenge is preventing an automated response from becoming another source of risk while keeping the full incident trail explainable."],
        ["08", "Implementation", "The current implementation connects health and scan flows to incident and recovery concepts. Evaluation targets and measured evidence remain part of the next project phase."],
        ["09", "What I learned", "A successful automation call is not the same as a recovered service. Verification must come from state, probes and clean follow-up evidence."],
        ["10", "Results", "PSM I status: architecture and prototype design are complete and ready for structured evaluation. No unverified production or performance claim is presented."],
        ["11", "Source code", "Repository access is shared through Muhammad Irfan’s GitHub profile where available."],
        ["12", "Related systems", "The same interests continue through AEGIS, multi-cloud disaster recovery and cloud data-governance work."]
      ]
    },
    pantalk: {
      order: "02", name: "PANTALK", subtitle: "Privacy-First Communication Platform",
      tags: ["Authentication", "Privacy architecture", "Messaging", "Access control"], source: "https://github.com/ieyrfan",
      sections: [
        ["01", "The problem", "Communication systems must deliver useful conversations while protecting identity, access and message boundaries."],
        ["02", "The objective", "Explore a private communication experience with controlled trust and clear authentication boundaries."],
        ["03", "The solution", "A structured messaging platform concept that places identity, encrypted transport and access decisions in the architecture."],
        ["04", "Architecture", "User A authenticates, a protected transport carries the request through the message service, and User B receives only authorized communication."],
        ["05", "Technology", "Application, identity, messaging and data layers are separated so each responsibility can be examined and improved."],
        ["06", "Security considerations", "Authentication, authorization, session handling, privacy and controlled service trust are first-class concerns."],
        ["07", "Challenges", "The interface must stay simple while the underlying trust and message flows remain explicit."],
        ["08", "Implementation", "The project is presented as an architecture-led communication system. Public source is linked only when an exact repository is available."],
        ["09", "What I learned", "Privacy comes from system boundaries and data decisions, not from a lock icon added to an interface."],
        ["10", "Results", "The project documents a defensible communication flow and the controls needed around it."],
        ["11", "Source code", "No exact public repository URL is claimed in this portfolio."],
        ["12", "Related systems", "Security ideas connect to FunCloudSOC and identity-policy experiments in the cloud lab."]
      ]
    },
    neuronote: {
      order: "03", name: "NeuroNote", subtitle: "Student Wellness & Productivity Tracking System",
      tags: ["C++", "MySQL", "Mood tracking", "Reports", "User management"], source: "https://github.com/ieyrfan/neuronote",
      sections: [
        ["01", "The problem", "Students need a lightweight way to connect mood, energy and focus patterns without losing control of their own records."],
        ["02", "The objective", "Build a structured tracking system with clear user workflows, useful reports and reliable persistence."],
        ["03", "The solution", "A C++ application backed by relational data structures for daily logging and report generation."],
        ["04", "Architecture", "User actions pass through application logic into validated MySQL records, then return as summaries and reports."],
        ["05", "Technology", "C++ handles application logic and MySQL provides persistent relational data."],
        ["06", "Security considerations", "User separation, input validation, credential handling and minimum database privileges are core design considerations."],
        ["07", "Challenges", "Turning subjective wellness information into a consistent data model while keeping the interaction understandable."],
        ["08", "Implementation", "The application covers logging, account management, database integration and report-oriented views."],
        ["09", "What I learned", "A useful system needs a strong relationship between the data model and the questions its users want to answer."],
        ["10", "Results", "The project demonstrates applied programming and database integration through a focused student use case."],
        ["11", "Source code", "The public repository is available on GitHub."],
        ["12", "Related systems", "The project complements cloud work by grounding system design in application and database fundamentals."]
      ]
    }
  };

  const stackData = {
    cloud: ["LAYER 01 / CLOUD", "Cloud platform fundamentals", "Compute, storage and managed services connected through explicit identity and network boundaries.", ["AWS", "EC2", "Lambda", "S3", "CloudFront", "OpenStack"]],
    security: ["LAYER 02 / SECURITY", "Identity, visibility and response", "Cloud controls for access, auditability, threat detection, configuration monitoring and safe response.", ["IAM", "GuardDuty", "Security Hub", "AWS Config", "CloudTrail"]],
    network: ["LAYER 03 / NETWORK", "Traffic needs an intentional path", "Addressing, segmentation, name resolution and edge delivery determine how services communicate.", ["VPC", "Route 53", "CloudFront", "DNS", "LAN/WAN"]],
    automation: ["LAYER 04 / AUTOMATION", "Repeatable infrastructure", "Infrastructure and operational tasks represented as code, scripts and controlled workflows.", ["Terraform", "CloudFormation", "Python", "Boto3", "Docker"]],
    systems: ["LAYER 05 / SYSTEMS", "The operating layer", "Practical work across operating systems, server services, containers and troubleshooting.", ["Linux", "Windows Server", "Docker", "Active Directory", "OpenStack"]],
    development: ["LAYER 06 / DEVELOPMENT", "Software connects the layers", "Languages and data tools used to build interfaces, automation and system logic.", ["Python", "C++", "JavaScript", "HTML/CSS", "SQL", "MySQL"]]
  };

  const commands = [
    ["Cloud Hub", "Irfan Cloud service directory", "/cloud/"], ["About", "The human behind the infrastructure", "/about/"], ["Projects", "Selected deployment environments", "/projects/"],
    ["FunCloudSOC", "Autonomous cloud security response", "/projects/funcloudsoc/"], ["PANTALK", "Privacy-first communication platform", "/projects/pantalk/"], ["NeuroNote", "Wellness and productivity system", "/projects/neuronote/"],
    ["Skills", "Interactive infrastructure map", "/stack/"], ["AWS", "Cloud tools and laboratory", "/stack/"],
    ["Experience", "Altitude-based learning journey", "/journey/"], ["Certifications", "Completed learning credentials", "/journey/"],
    ["Resume", "Download PDF résumé", "asset/Muhammad_Irfan_Resume.pdf"], ["GitHub", "Open ieyrfan on GitHub", "https://github.com/ieyrfan"],
    ["LinkedIn", "Open Muhammad Irfan on LinkedIn", "https://www.linkedin.com/in/irfanrizal2004"], ["Contact", "Establish a connection", "/contact/"]
  ];

  const routeMap = {
    "/": ["landing", "sky", "PUBLIC SKY"], "/cloud": ["cloud", "cloud-hub", "IRFAN CLOUD HUB"], "/about": ["about", "identity", "IDENTITY"],
    "/stack": ["stack", "stack", "INFRASTRUCTURE"], "/projects": ["projects", "deployments", "DEPLOYMENTS"],
    "/projects/funcloudsoc": ["project-funcloudsoc", "deployments", "FUNCLOUDSOC"], "/projects/pantalk": ["project-pantalk", "deployments", "PANTALK"], "/projects/neuronote": ["project-neuronote", "deployments", "NEURONOTE"],
    "/journey": ["journey", "journey", "ALTITUDE JOURNEY"], "/lab": ["lab", "lab", "CLOUD LAB"], "/contact": ["contact", "contact", "CONNECTION"]
  };
  const normalizePath = path => path.replace(/\/+$/, "") || "/";
  const autoAtmosphere = () => { const h = new Date().getHours(); return h < 6 || h >= 20 ? "night" : h < 11 ? "morning" : h < 18 ? "day" : "sunset"; };
  function setThemeMode(mode, persist = true) {
    root.dataset.mode = mode;
    root.dataset.theme = mode === "auto" ? autoAtmosphere() : mode;
    $$('[data-theme-mode]').forEach(button => { button.classList.toggle("active", button.dataset.themeMode === mode); button.setAttribute("aria-pressed", String(button.dataset.themeMode === mode)); });
    $('meta[name="theme-color"]')?.setAttribute("content", root.dataset.theme === "night" ? "#020617" : "#dbefff");
    if (persist) try { localStorage.setItem("cloudspace-theme-mode", mode); } catch {}
  }
  setThemeMode(root.dataset.mode || "auto", false);
  $$('[data-theme-mode]').forEach(button => button.addEventListener("click", () => setThemeMode(button.dataset.themeMode)));
  window.setInterval(() => { if (root.dataset.mode === "auto") setThemeMode("auto", false); }, 60000);

  const sessionId = `IRF-${Math.random().toString(16).slice(2, 7).toUpperCase()}`;
  $("#sessionId").textContent = sessionId; $("#hubSession").textContent = sessionId;
  function logEvent(message) { const log = $("#sessionLog"); if (!log) return; const item = document.createElement("li"); item.textContent = `[INFO] ${message}`; log.prepend(item); while (log.children.length > 4) log.lastElementChild.remove(); }
  const stars = $("#stars");
  if (stars) for (let i = 0; i < 26; i += 1) { const star = document.createElement("i"); star.style.left = `${4 + Math.random() * 92}%`; star.style.top = `${3 + Math.random() * 70}%`; star.style.setProperty("--twinkle", `${12 + Math.random() * 20}s`); star.style.setProperty("--delay", `${-Math.random() * 18}s`); star.style.opacity = String(.18 + Math.random() * .45); stars.appendChild(star); }
  requestAnimationFrame(() => document.body.classList.add("scene-ready"));

  const nav = $("#navbar"), navMenu = $("#navLinks"), menuToggle = $("#menuToggle");
  function toggleMenu(open) { navMenu?.classList.toggle("open", open); menuToggle?.setAttribute("aria-expanded", String(open)); menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  menuToggle?.addEventListener("click", () => toggleMenu(!navMenu.classList.contains("open")));
  $$("a", navMenu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));

  const transition = $("#routeTransition"); let routeTimer = 0;
  function syncNavIndicator(page) {
    const group = page.startsWith("project-") ? "projects" : page;
    const link = $(`[data-page-link="${group}"]`), indicator = $("#navIndicator");
    $$("[data-page-link]").forEach(item => item.classList.toggle("active", item === link));
    if (!link || !indicator || innerWidth <= 820) { if (indicator) indicator.style.width = "0"; return; }
    const navRect = navMenu.getBoundingClientRect(), rect = link.getBoundingClientRect(); indicator.style.width = `${rect.width}px`; indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }
  function applyRoute(path, scroll = true) {
    const normalized = normalizePath(path), route = routeMap[normalized] || routeMap["/"];
    root.dataset.page = route[0]; $("#regionReadout").textContent = `REGION / ${route[2]}`; syncNavIndicator(route[0]);
    document.title = normalized === "/" ? "Muhammad Irfan | Cloud Computing & Cloud Security Portfolio" : `${route[2]} | IRFAN CLOUDSPACE`;
    if (scroll) window.scrollTo({ top: 0, behavior: "auto" });
    logEvent(`${route[2]} service requested`);
    if (route[0].startsWith("project-")) openProject(route[0].replace("project-", ""), false);
  }
  function routeTo(path, label = "CONNECTING TO SERVICE") {
    const normalized = normalizePath(path); if (!routeMap[normalized]) return;
    window.clearTimeout(routeTimer); transition.dataset.target = routeMap[normalized][0]; $("#routeTransitionLabel").textContent = label; transition.classList.remove("reveal"); transition.classList.add("active");
    routeTimer = window.setTimeout(() => { history.pushState({}, "", `${normalized === "/" ? "/" : `${normalized}/`}`); if (caseStudy?.open) caseStudy.close(); document.body.classList.remove("modal-open"); applyRoute(normalized); transition.classList.add("reveal"); routeTimer = window.setTimeout(() => transition.classList.remove("active", "reveal"), reducedMotion.matches ? 20 : 520); }, reducedMotion.matches ? 20 : 470);
  }
  document.addEventListener("click", event => { const link = event.target.closest("a[data-route]"); if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return; event.preventDefault(); routeTo(link.pathname, `CONNECTING / ${link.textContent.trim().slice(0, 28)}`); });
  window.addEventListener("popstate", () => applyRoute(location.pathname));
  window.addEventListener("resize", () => syncNavIndicator(root.dataset.page));

  const revealItems = $$(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) revealItems.forEach(el => el.classList.add("visible"));
  else {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }), { threshold: .11, rootMargin: "0px 0px -6%" });
    revealItems.forEach(el => revealObserver.observe(el));
  }

  const regionSections = $$('[data-region]');
  const navLinks = $$('[data-page-link]');
  if ("IntersectionObserver" in window) {
    const regionObserver = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const region = active.target.dataset.region || "CLOUD";
      $("#regionReadout").textContent = `REGION / ${region}`;
      syncNavIndicator(root.dataset.page);
      nav?.classList.toggle("over-dark", !["SKY", "ENTER CLOUD", "EXIT CLOUD"].includes(region));
    }, { rootMargin: "-28% 0px -57%", threshold: [0, .05, .3] });
    regionSections.forEach(section => regionObserver.observe(section));
  }

  let scrollTick = false;
  function updateScrollEffects() {
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    $("#scrollMeter").style.width = `${max > 0 ? y / max * 100 : 0}%`;
    nav?.classList.toggle("scrolled", y > 40);
    const marker = innerHeight * .34;
    const currentRegion = regionSections.filter(section => { const rect = section.getBoundingClientRect(); return rect.top <= marker && rect.bottom > marker; }).pop();
    if (currentRegion) {
      const region = currentRegion.dataset.region || "CLOUD";
      $("#regionReadout").textContent = `REGION / ${region}`;
      syncNavIndicator(root.dataset.page);
      nav?.classList.toggle("over-dark", !["SKY", "ENTER CLOUD", "EXIT CLOUD"].includes(region));
    }
    const hero = $("#sky"), heroSky = $("#heroSky"), heroContent = $("#heroContent");
    if (hero && y < hero.offsetHeight * 1.3 && !reducedMotion.matches) {
      const p = Math.min(1, y / hero.offsetHeight);
      heroSky.style.transform = `scale(${1.06 + p * .18}) translateY(${p * 2.5}%)`;
      heroContent.style.opacity = String(1 - p * .88);
      heroContent.style.transform = `translateY(${p * -45}px)`;
    }
    const entry = $("#cloud-entry");
    if (entry) {
      const start = entry.offsetTop, range = Math.max(1, entry.offsetHeight - innerHeight), p = Math.max(0, Math.min(1, (y - start) / range));
      $(".entry-cloud-a").style.transform = `scale(${1.2 + p * .9}) translate(${p * -4}%,${p * 3}%)`;
      $(".entry-cloud-b").style.transform = `scale(${1.65 + p * .65}) rotate(180deg) translate(${p * 5}%,${p * -3}%)`;
      $("#entryBoot")?.classList.toggle("visible", p > .42);
    }
    const journey = $("#journey"), altitude = $("#altitudeProgress"), altitudeCounter = $("#altitudeCounter");
    if (journey && altitude && getComputedStyle(journey).display !== "none") { const p = Math.max(0, Math.min(1, (innerHeight * .72 - journey.getBoundingClientRect().top) / (journey.offsetHeight * .72))); altitude.style.height = `${p * 100}%`; if (altitudeCounter) altitudeCounter.textContent = `${Math.round(p * 40000 / 1000) * 1000} FT`; const nodes = $$(".journey-node"); nodes.forEach((node, index) => node.classList.toggle("active", index <= Math.round(p * (nodes.length - 1)))); }
    scrollTick = false;
  }
  addEventListener("scroll", () => { if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateScrollEffects); } }, { passive: true });
  updateScrollEffects();

  if (!touchMode.matches && !reducedMotion.matches) {
    const heroSky = $("#heroSky"), far = $(".cloud-far"), mid = $(".cloud-mid"), near = $(".cloud-near"), content = $("#heroContent");
    $("#sky")?.addEventListener("pointermove", event => { const x = event.clientX / innerWidth - .5, y = event.clientY / innerHeight - .5; heroSky.style.translate = `${x * 5}px ${y * 3}px`; if (far) far.style.translate = `${x * 7}px ${y * 4}px`; if (mid) mid.style.translate = `${x * -13}px ${y * -8}px`; if (near) near.style.translate = `${x * 19}px ${y * 11}px`; if (content) content.style.translate = `${x * -2}px ${y * -2}px`; });
  }

  const cursor = $("#cursor"), cursorRing = $("#cursorRing");
  if (cursor && !touchMode.matches) {
    let rx = 0, ry = 0, tx = 0, ty = 0; const follow = () => { rx += (tx - rx) * .16; ry += (ty - ry) * .16; if (cursorRing) { cursorRing.style.left = `${rx}px`; cursorRing.style.top = `${ry}px`; } requestAnimationFrame(follow); }; follow();
    addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
    document.addEventListener("pointerover", e => { const target = e.target.closest("a,button,[data-cursor]"); cursor.classList.toggle("interactive", Boolean(target)); cursorRing?.classList.toggle("interactive", Boolean(target)); $("span", cursor).textContent = target?.dataset.cursor || (target?.matches("button") ? "SELECT" : "OPEN"); });
  }

  $$(".stack-categories button").forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.stack, data = stackData[key];
    $$(".stack-categories button").forEach(b => b.classList.toggle("active", b === button));
    $$(".tech-node").forEach(node => { const active = (node.dataset.groups || "").split(" ").includes(key); node.classList.toggle("dim", !active); node.classList.toggle("active", active); });
    const context = $("#stackContext");
    context.innerHTML = `<span>${data[0]}</span><h3>${data[1]}</h3><p>${data[2]}</p><ul>${data[3].map(item => `<li>${item}</li>`).join("")}</ul>`;
  }));
  $$(".tech-node").forEach(node => node.addEventListener("click", () => {
    const name = $("b", node)?.textContent || "Technology", groups = (node.dataset.groups || "cloud").split(" "), related = groups.flatMap(group => stackData[group]?.[3] || []).filter((item, index, all) => all.indexOf(item) === index).slice(0, 6);
    $$(".tech-node").forEach(item => item.classList.toggle("active", item === node));
    const context = $("#stackContext"); context.classList.remove("updated"); context.innerHTML = `<span>TECHNOLOGY NODE / SELECTED</span><h3>${name}</h3><dl class="tech-detail"><div><dt>PURPOSE</dt><dd>Supports ${groups.join(", ")} responsibilities inside the environment.</dd></div><div><dt>USED WITH</dt><dd>${related.slice(0, 3).join(" · ")}</dd></div><div><dt>PROJECT USAGE</dt><dd>Practiced through cloud labs and selected deployment architecture.</dd></div><div><dt>RELATED SERVICES</dt><dd>${related.slice(3).join(" · ") || "AWS · Linux · Python"}</dd></div></dl>`; requestAnimationFrame(() => context.classList.add("updated"));
    logEvent(`${name} technology node inspected`);
  }));

  $$(".lab-toolbar button").forEach(button => button.addEventListener("click", () => {
    const tag = button.dataset.lab;
    $$(".lab-toolbar button").forEach(b => b.classList.toggle("active", b === button));
    $$("#labGrid article").forEach(card => { card.hidden = tag !== "all" && !(card.dataset.tags || "").split(" ").includes(tag); });
  }));
  const labDetails = [
    ["AWS VPC Architecture", "Design public and private network boundaries with controlled routing.", ["OBJECTIVE", "Separate reachable workloads from protected services."], ["TOOLS", "AWS VPC · route tables · security groups"], ["ARCHITECTURE", "Internet gateway → public subnet → controlled private subnet"], ["RESULT", "A traceable network path with explicit ingress and egress."], ["WHAT I LEARNED", "Subnet labels do not create security; routes and controls do."]],
    ["IAM Policy Testing", "Test how identity policy decisions affect access.", ["OBJECTIVE", "Reduce permissions to the actions a workload actually needs."], ["TOOLS", "IAM · policy simulator · CloudTrail"], ["ARCHITECTURE", "Principal → policy evaluation → resource"], ["RESULT", "Permissions examined through allow and deny outcomes."], ["WHAT I LEARNED", "Least privilege is an iterative engineering process."]],
    ["Terraform Deployment", "Represent infrastructure as reviewed, repeatable configuration.", ["OBJECTIVE", "Create consistent cloud resources without manual drift."], ["TOOLS", "Terraform · state · AWS"], ["ARCHITECTURE", "Configuration → plan → apply → observed state"], ["RESULT", "A repeatable deployment path with visible change plans."], ["WHAT I LEARNED", "State and review matter as much as resource syntax."]],
    ["Security Automation", "Connect findings to a controlled response workflow.", ["OBJECTIVE", "Reduce repetitive response work while preserving control."], ["TOOLS", "Python · events · cloud APIs"], ["ARCHITECTURE", "Finding → policy → action → verification"], ["RESULT", "A bounded incident-response design."], ["WHAT I LEARNED", "Automation must verify outcomes independently."]],
    ["OpenStack Networking", "Trace connectivity inside a private cloud.", ["OBJECTIVE", "Understand tenant routing and external reachability."], ["TOOLS", "Neutron · Linux · OpenStack CLI"], ["ARCHITECTURE", "Instance → tenant network → router → floating IP"], ["RESULT", "Reachability proven through explicit network state."], ["WHAT I LEARNED", "CLI evidence makes invisible network state explainable."]],
    ["Docker Application", "Package an application with its runtime boundary.", ["OBJECTIVE", "Make application execution repeatable across systems."], ["TOOLS", "Docker · Linux · application runtime"], ["ARCHITECTURE", "Source → image → container → published service"], ["RESULT", "A consistent deployable application environment."], ["WHAT I LEARNED", "A small image starts with clear dependency choices."]]
  ];
  const labPanel = $("#labPanel");
  $$("#labGrid article").forEach((card, index) => { card.tabIndex = 0; card.setAttribute("role", "button"); card.setAttribute("aria-label", `Open ${labDetails[index][0]} experiment`); const open = () => { const data = labDetails[index]; $("#labPanelCode").textContent = `LAB / ${String(index + 1).padStart(3, "0")}`; $("#labPanelTitle").textContent = data[0]; $("#labPanelSummary").textContent = data[1]; $("#labDetailGrid").innerHTML = data.slice(2).map(item => `<article><span>${item[0]}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join(""); labPanel.showModal(); document.body.classList.add("modal-open"); logEvent(`${data[0]} lab opened`); }; card.addEventListener("click", open); card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }); });
  $("#labClose")?.addEventListener("click", () => { labPanel.close(); document.body.classList.remove("modal-open"); });
  labPanel?.addEventListener("click", event => { if (event.target === labPanel) { labPanel.close(); document.body.classList.remove("modal-open"); } });

  const simulationModes = {
    request: { title: "REQUEST LIFECYCLE", button: "SEND REQUEST", stages: ["USER", "DNS", "CDN", "LOAD BALANCER", "APPLICATION", "DATABASE", "RESPONSE"], desc: ["A visitor starts a request from a client device.", "DNS resolves a human-readable domain to its target.", "The edge serves cached content close to the user.", "Traffic is distributed across healthy targets.", "Application logic processes the request.", "Persistent data is read or updated through controlled access.", "A response returns through the delivery path."] },
    security: { title: "SECURITY EVENT", button: "SIMULATE EVENT", stages: ["SUSPICIOUS TRAFFIC", "MONITORING", "DETECTION", "ALERT", "AUTOMATED RESPONSE", "CONTAINMENT", "BLOCKED"], desc: ["An unusual request enters the environment.", "Telemetry records the behaviour and context.", "A rule or service identifies a suspicious pattern.", "The finding becomes a visible security event.", "A bounded workflow evaluates the approved action.", "Access or infrastructure is isolated to limit impact.", "A final control blocks the path and preserves evidence."] }
  };
  let simMode = "request", simTimer = 0;
  function renderSimulation(mode) {
    simMode = mode; clearTimeout(simTimer);
    const data = simulationModes[mode]; $("#simulator h3").textContent = data.title; $("#runSimulation").innerHTML = `${data.button} <span>→</span>`;
    const list = $("#simStages"); list.innerHTML = data.stages.map((stage, i) => `<li data-desc="${data.desc[i]}"><i></i><b>${stage}</b></li>`).join("");
    $("#simStep").textContent = "READY / WAITING"; $("#simDescription").textContent = "Run the simulation to inspect each stage.";
  }
  $$("[data-sim-mode]").forEach(button => button.addEventListener("click", () => { $$("[data-sim-mode]").forEach(b => b.classList.toggle("active", b === button)); renderSimulation(button.dataset.simMode); }));
  $("#runSimulation")?.addEventListener("click", () => {
    clearTimeout(simTimer); const stages = $$("#simStages li"); stages.forEach(s => s.className = ""); let index = 0;
    const advance = () => { stages.forEach((stage, i) => { stage.classList.toggle("complete", i < index); stage.classList.toggle("active", i === index); }); const current = stages[index]; $("#simStep").textContent = `STAGE ${String(index + 1).padStart(2, "0")} / ${current.querySelector("b").textContent}`; $("#simDescription").textContent = current.dataset.desc; index += 1; if (index < stages.length) simTimer = setTimeout(advance, reducedMotion.matches ? 80 : 620); else simTimer = setTimeout(() => { stages.forEach(s => { s.classList.remove("active"); s.classList.add("complete"); }); $("#simStep").textContent = simMode === "request" ? "200 / RESPONSE DELIVERED" : "EVENT / CONTAINED"; }, reducedMotion.matches ? 80 : 620); };
    advance();
  });

  const caseStudy = $("#caseStudy"); let currentProject = "funcloudsoc", incidentIndex = 0, incidentTimer = 0, incidentPaused = false;
  const incidentEvents = ["00:00  Suspicious request received", "00:01  Traffic observed", "00:02  Security event generated", "00:03  Detection engine triggered", "00:04  Incident classified", "00:05  Automated response executed", "00:06  Threat contained"];
  function resetIncident() { window.clearTimeout(incidentTimer); incidentIndex = 0; incidentPaused = false; $$("#incidentNodes li").forEach(node => node.className = ""); if ($("#incidentLog")) $("#incidentLog").textContent = "[READY] Waiting for manual replay."; }
  function advanceIncident() { if (incidentPaused) return; const nodes = $$("#incidentNodes li"); if (incidentIndex >= nodes.length) { $("#incidentLog").textContent += "\n[SUCCESS] Response verified. Threat contained."; logEvent("FunCloudSOC replay completed"); return; } nodes.forEach((node, index) => { node.classList.toggle("done", index < incidentIndex); node.classList.toggle("active", index === incidentIndex); }); $("#incidentLog").textContent = incidentEvents.slice(0, incidentIndex + 1).join("\n"); incidentIndex += 1; incidentTimer = window.setTimeout(advanceIncident, reducedMotion.matches ? 80 : 760); }
  function openProject(slug, updateRoute = true) {
    const data = projectData[slug]; if (!data) return; currentProject = slug;
    $("#caseEyebrow").textContent = `DEPLOYMENT / ${data.order}`; $("#caseTitle").textContent = data.name; $("#caseSubtitle").textContent = data.subtitle;
    $("#caseTags").innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
    $("#caseGrid").innerHTML = data.sections.map(s => `<article><span>${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("");
    $("#caseSource").href = data.source; $("#caseSource").textContent = slug === "pantalk" ? "OPEN GITHUB PROFILE ↗" : "VIEW AVAILABLE SOURCE ↗"; $("#incidentReplay").hidden = slug !== "funcloudsoc"; resetIncident();
    if (!caseStudy.open) caseStudy.showModal(); document.body.classList.add("modal-open"); caseStudy.scrollTop = 0; logEvent(`${data.name} deployment console opened`);
    if (updateRoute && normalizePath(location.pathname) !== `/projects/${slug}`) history.pushState({}, "", `/projects/${slug}/`);
  }
  function closeProject() { resetIncident(); caseStudy.close(); document.body.classList.remove("modal-open"); if (root.dataset.page.startsWith("project-")) { history.pushState({}, "", "/projects/"); applyRoute("/projects"); } }
  $$(".case-trigger,.architecture-trigger").forEach(button => button.addEventListener("click", e => { e.stopPropagation(); routeTo(`/projects/${button.dataset.project}`, `DEPLOYING / ${button.dataset.project.toUpperCase()}`); }));
  $$(".deployment").forEach(card => card.addEventListener("dblclick", () => routeTo(`/projects/${card.dataset.project}`, `DEPLOYING / ${card.dataset.project.toUpperCase()}`)));
  $("#caseClose")?.addEventListener("click", closeProject);
  caseStudy?.addEventListener("click", e => { if (e.target === caseStudy) closeProject(); });
  $("#caseNext")?.addEventListener("click", () => { const keys = Object.keys(projectData), next = keys[(keys.indexOf(currentProject) + 1) % keys.length]; history.replaceState({}, "", `/projects/${next}/`); root.dataset.page = `project-${next}`; openProject(next, false); });
  $("#incidentRun")?.addEventListener("click", () => { resetIncident(); advanceIncident(); logEvent("FunCloudSOC incident replay started"); });
  $("#incidentPause")?.addEventListener("click", () => { incidentPaused = !incidentPaused; $("#incidentPause").textContent = incidentPaused ? "RESUME" : "PAUSE"; if (!incidentPaused) advanceIncident(); });
  $("#incidentReset")?.addEventListener("click", resetIncident);

  const palette = $("#commandPalette"), search = $("#commandSearch"), commandList = $("#commandList"); let selectedCommand = 0, filteredCommands = commands;
  function renderCommands(query = "") {
    const term = query.trim().toLowerCase();
    const rank = command => { const label = command[0].toLowerCase(), description = command[1].toLowerCase(); if (!term) return 0; if (label === term) return 0; if (label.startsWith(term)) return 1; if (label.includes(term)) return 2; return description.includes(term) ? 3 : 4; };
    filteredCommands = commands.filter(command => `${command[0]} ${command[1]}`.toLowerCase().includes(term)).sort((a, b) => rank(a) - rank(b));
    selectedCommand = 0; commandList.innerHTML = filteredCommands.map((c, i) => `<li><button type="button" data-command-index="${i}" class="${i === 0 ? "selected" : ""}"><b>${c[0]}</b><span>${c[1]}</span></button></li>`).join("");
  }
  function openPalette() { renderCommands(); palette.showModal(); document.body.classList.add("modal-open"); setTimeout(() => search.focus(), 20); }
  function closePalette() { palette.close(); document.body.classList.remove("modal-open"); }
  function runCommand(command) { if (!command) return; closePalette(); const target = command[2]; if (target.startsWith("/")) routeTo(target, `COMMAND / ${command[0].toUpperCase()}`); else window.open(target, target.endsWith(".pdf") ? "_self" : "_blank", "noopener"); }
  $("#commandTrigger")?.addEventListener("click", openPalette);
  document.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette.open ? closePalette() : openPalette(); } });
  search?.addEventListener("input", () => renderCommands(search.value));
  search?.addEventListener("keydown", e => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); selectedCommand = (selectedCommand + (e.key === "ArrowDown" ? 1 : -1) + filteredCommands.length) % filteredCommands.length; $$("button", commandList).forEach((b, i) => b.classList.toggle("selected", i === selectedCommand)); } if (e.key === "Enter") { e.preventDefault(); runCommand(filteredCommands[selectedCommand]); } });
  commandList?.addEventListener("click", e => { const button = e.target.closest("button"); if (button) runCommand(filteredCommands[Number(button.dataset.commandIndex)]); });
  palette?.addEventListener("click", e => { if (e.target === palette) closePalette(); });

  const terminalInput = $("#terminalInput"), terminalOutput = $("#terminalOutput");
  const writeTerminal = (html, cls = "") => { const p = document.createElement("p"); p.className = cls; p.innerHTML = html; terminalOutput.appendChild(p); terminalOutput.scrollTop = terminalOutput.scrollHeight; };
  const terminalCommands = {
    help: () => "Available commands:<br><span>whoami · skills · projects · security · journey · contact · github · linkedin · resume · clear</span><br>Optional: sudo hire irfan · coffee",
    whoami: () => "Muhammad Irfan<br>Cloud Computing Student<br><br>Focus:<br><span>Cloud Infrastructure · Cloud Security · Automation · DevOps</span>",
    skills: () => "Cloud: AWS, OpenStack<br>Automation: Terraform, CloudFormation, Python, Docker<br>Security: IAM, CloudTrail, GuardDuty, AWS Config<br>Systems: Linux, Windows Server, Networking",
    projects: () => '<a href="#deployments" data-term-project="funcloudsoc">001 FunCloudSOC</a><br><a href="#deployments" data-term-project="pantalk">002 PANTALK</a><br><a href="#deployments" data-term-project="neuronote">003 NeuroNote</a>',
    security: () => "Identity → Visibility → Detection → Compliance → Response<br><span>Policy controls the action. Verification closes the loop.</span>",
    journey: () => "2024 Foundation → 2025 Systems → 2026 Cloud → NEXT Cloud Engineering",
    contact: () => 'Connection available: <a href="mailto:Irfanizzani46@gmail.com">Irfanizzani46@gmail.com</a>',
    github: () => { window.open("https://github.com/ieyrfan", "_blank", "noopener"); return "Opening GitHub profile…"; },
    linkedin: () => { window.open("https://www.linkedin.com/in/irfanrizal2004", "_blank", "noopener"); return "Opening LinkedIn profile…"; },
    resume: () => { window.open("asset/Muhammad_Irfan_Resume.pdf", "_blank"); return "Opening résumé…"; },
    coffee: () => '<span class="error">ERROR:</span><br>Insufficient telemetry to calculate current consumption.',
    "sudo hire irfan": () => { setTimeout(() => routeTo("/contact", "AUTHORIZATION / GRANTED"), 900); return '<span class="system-line">Permission granted.</span><br>Excellent infrastructure decision.<br>Opening contact channel…'; },
    "rm -rf /": () => '<span class="error">Request blocked.</span><br>Security policy prevented this incident.'
  };
  terminalInput?.addEventListener("keydown", e => {
    if (e.key !== "Enter") return; const raw = terminalInput.value.trim(), command = raw.toLowerCase(); terminalInput.value = ""; if (!raw) return;
    writeTerminal(`irfan@cloud:~$ ${raw}`, "command-echo");
    if (command === "clear") { terminalOutput.innerHTML = ""; return; }
    writeTerminal(terminalCommands[command]?.() || `<span class="error">command not found:</span> ${raw}<br>Type <span>help</span> for available commands.`);
  });
  terminalOutput?.addEventListener("click", e => { const link = e.target.closest("[data-term-project]"); if (link) { e.preventDefault(); routeTo(`/projects/${link.dataset.termProject}`, `DEPLOYING / ${link.dataset.termProject.toUpperCase()}`); } });

  async function loadTelemetry() {
    try {
      const [userResponse, repoResponse] = await Promise.all([fetch("https://api.github.com/users/ieyrfan", { headers: { Accept: "application/vnd.github+json" } }), fetch("https://api.github.com/users/ieyrfan/repos?sort=updated&per_page=100", { headers: { Accept: "application/vnd.github+json" } })]);
      if (!userResponse.ok || !repoResponse.ok) throw new Error("GitHub unavailable");
      const user = await userResponse.json(), repos = await repoResponse.json(); const recent = repos.filter(r => !r.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      $("#repoCount").textContent = String(user.public_repos); $("#latestRepo").textContent = recent[0]?.name || "—"; $("#latestRepoDate").textContent = recent[0] ? `UPDATED ${new Intl.DateTimeFormat("en-MY", { dateStyle: "medium" }).format(new Date(recent[0].updated_at))}` : "No recent data";
      const languages = [...new Set(recent.map(r => r.language).filter(Boolean))]; $("#languageCount").textContent = String(languages.length); $("#languageList").textContent = languages.slice(0, 5).join(" · "); $("#telemetryUpdated").textContent = `LIVE DATA / ${new Intl.DateTimeFormat("en-MY", { dateStyle: "medium" }).format(new Date())}`;
    } catch { $$('[data-telemetry]').forEach(item => item.hidden = true); $("#telemetryUpdated").textContent = "GITHUB DATA TEMPORARILY UNAVAILABLE"; }
  }
  loadTelemetry();

  $("#contactForm")?.addEventListener("submit", e => {
    e.preventDefault(); if (!e.currentTarget.reportValidity()) return; const data = new FormData(e.currentTarget); const subject = encodeURIComponent(data.get("subject")); const body = encodeURIComponent(`Hello Muhammad Irfan,\n\n${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    $("#connectionState").innerHTML = "<i></i> TRANSMISSION READY"; $("#formNote").innerHTML = `Your message is prepared. <a href="mailto:Irfanizzani46@gmail.com?subject=${subject}&body=${body}">Open your email app to send it →</a>`;
  });

  applyRoute(location.pathname, false);
  const year = $("#year"); if (year) year.textContent = String(new Date().getFullYear());
  reducedMotion.addEventListener?.("change", () => location.reload());
})();
