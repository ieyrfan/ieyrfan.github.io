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
    ["About", "The human behind the infrastructure", "#identity"], ["Projects", "Selected deployment environments", "#deployments"],
    ["FunCloudSOC", "Autonomous cloud security response", "project:funcloudsoc"], ["PANTALK", "Privacy-first communication platform", "project:pantalk"],
    ["Skills", "Interactive infrastructure map", "#stack"], ["AWS", "Cloud tools and laboratory", "#stack"], ["Security", "Identity, visibility, detection and response", "#security"],
    ["Experience", "Altitude-based learning journey", "#journey"], ["Certifications", "Completed learning credentials", "#credentials"],
    ["Resume", "Download PDF résumé", "asset/Muhammad_Irfan_Resume.pdf"], ["GitHub", "Open ieyrfan on GitHub", "https://github.com/ieyrfan"],
    ["LinkedIn", "Open Muhammad Irfan on LinkedIn", "https://www.linkedin.com/in/irfanrizal2004"], ["Contact", "Establish a connection", "#contact"]
  ];

  function setTheme(theme, persist = true) {
    root.dataset.theme = theme;
    $("#themeToggle")?.setAttribute("aria-label", `Switch to ${theme === "day" ? "night" : "day"} mode`);
    $('meta[name="theme-color"]')?.setAttribute("content", theme === "day" ? "#dbefff" : "#020617");
    if (persist) try { localStorage.setItem("cloudspace-theme", theme); } catch {}
  }
  setTheme(root.dataset.theme === "night" ? "night" : "day", false);
  $("#themeToggle")?.addEventListener("click", () => setTheme(root.dataset.theme === "day" ? "night" : "day"));

  const nav = $("#navbar"), navMenu = $("#navLinks"), menuToggle = $("#menuToggle");
  function toggleMenu(open) { navMenu?.classList.toggle("open", open); menuToggle?.setAttribute("aria-expanded", String(open)); menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  menuToggle?.addEventListener("click", () => toggleMenu(!navMenu.classList.contains("open")));
  $$("a", navMenu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));

  const revealItems = $$(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) revealItems.forEach(el => el.classList.add("visible"));
  else {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }), { threshold: .11, rootMargin: "0px 0px -6%" });
    revealItems.forEach(el => revealObserver.observe(el));
  }

  const regionSections = $$('[data-region]');
  const navLinks = $$('.nav-links a[href^="#"]');
  if ("IntersectionObserver" in window) {
    const regionObserver = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const region = active.target.dataset.region || "CLOUD";
      $("#regionReadout").textContent = `REGION / ${region}`;
      navLinks.forEach(a => a.classList.toggle("active", a.hash === `#${active.target.id}`));
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
      navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${currentRegion.id}`));
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
    const journey = $("#journey"), altitude = $("#altitudeProgress");
    if (journey && altitude) { const p = Math.max(0, Math.min(1, (innerHeight * .72 - journey.getBoundingClientRect().top) / (journey.offsetHeight * .72))); altitude.style.height = `${p * 100}%`; }
    scrollTick = false;
  }
  addEventListener("scroll", () => { if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateScrollEffects); } }, { passive: true });
  updateScrollEffects();

  if (!touchMode.matches && !reducedMotion.matches) {
    const heroSky = $("#heroSky");
    $("#sky")?.addEventListener("pointermove", event => { const x = (event.clientX / innerWidth - .5) * 10, y = (event.clientY / innerHeight - .5) * 7; heroSky.style.translate = `${x}px ${y}px`; });
  }

  const cursor = $("#cursor");
  if (cursor && !touchMode.matches) {
    addEventListener("pointermove", e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
    document.addEventListener("pointerover", e => { const target = e.target.closest("a,button,[data-cursor]"); cursor.classList.toggle("interactive", Boolean(target)); $("span", cursor).textContent = target?.dataset.cursor || (target?.matches("button") ? "SELECT" : "OPEN"); });
  }

  $$(".stack-categories button").forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.stack, data = stackData[key];
    $$(".stack-categories button").forEach(b => b.classList.toggle("active", b === button));
    $$(".tech-node").forEach(node => { const active = (node.dataset.groups || "").split(" ").includes(key); node.classList.toggle("dim", !active); node.classList.toggle("active", active); });
    const context = $("#stackContext");
    context.innerHTML = `<span>${data[0]}</span><h3>${data[1]}</h3><p>${data[2]}</p><ul>${data[3].map(item => `<li>${item}</li>`).join("")}</ul>`;
  }));
  $$(".tech-node").forEach(node => node.addEventListener("click", () => { node.classList.toggle("active"); }));

  $$(".security-layers button").forEach(button => button.addEventListener("mouseenter", () => { $$(".security-layers button").forEach(b => b.classList.toggle("active", b === button)); $(".security-radar")?.classList.add("active"); }));
  $(".security-layers")?.addEventListener("mouseleave", () => $(".security-radar")?.classList.remove("active"));

  $$(".lab-toolbar button").forEach(button => button.addEventListener("click", () => {
    const tag = button.dataset.lab;
    $$(".lab-toolbar button").forEach(b => b.classList.toggle("active", b === button));
    $$("#labGrid article").forEach(card => { card.hidden = tag !== "all" && !(card.dataset.tags || "").split(" ").includes(tag); });
  }));

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

  const caseStudy = $("#caseStudy"); let currentProject = "funcloudsoc";
  function openProject(slug) {
    const data = projectData[slug]; if (!data) return; currentProject = slug;
    $("#caseEyebrow").textContent = `DEPLOYMENT / ${data.order}`; $("#caseTitle").textContent = data.name; $("#caseSubtitle").textContent = data.subtitle;
    $("#caseTags").innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
    $("#caseGrid").innerHTML = data.sections.map(s => `<article><span>${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("");
    $("#caseSource").href = data.source; $("#caseSource").textContent = slug === "pantalk" ? "OPEN GITHUB PROFILE ↗" : "VIEW AVAILABLE SOURCE ↗";
    caseStudy.showModal(); document.body.classList.add("modal-open");
  }
  function closeProject() { caseStudy.close(); document.body.classList.remove("modal-open"); }
  $$(".case-trigger,.architecture-trigger").forEach(button => button.addEventListener("click", e => { e.stopPropagation(); openProject(button.dataset.project); }));
  $$(".deployment").forEach(card => card.addEventListener("dblclick", () => openProject(card.dataset.project)));
  $("#caseClose")?.addEventListener("click", closeProject);
  caseStudy?.addEventListener("click", e => { if (e.target === caseStudy) closeProject(); });
  $("#caseNext")?.addEventListener("click", () => { const keys = Object.keys(projectData), next = keys[(keys.indexOf(currentProject) + 1) % keys.length]; openProject(next); caseStudy.scrollTop = 0; });

  const palette = $("#commandPalette"), search = $("#commandSearch"), commandList = $("#commandList"); let selectedCommand = 0, filteredCommands = commands;
  function renderCommands(query = "") { filteredCommands = commands.filter(c => `${c[0]} ${c[1]}`.toLowerCase().includes(query.toLowerCase())); selectedCommand = 0; commandList.innerHTML = filteredCommands.map((c, i) => `<li><button type="button" data-command-index="${i}" class="${i === 0 ? "selected" : ""}"><b>${c[0]}</b><span>${c[1]}</span></button></li>`).join(""); }
  function openPalette() { renderCommands(); palette.showModal(); document.body.classList.add("modal-open"); setTimeout(() => search.focus(), 20); }
  function closePalette() { palette.close(); document.body.classList.remove("modal-open"); }
  function runCommand(command) { if (!command) return; closePalette(); const target = command[2]; if (target.startsWith("project:")) openProject(target.split(":")[1]); else if (target.startsWith("#")) $(target)?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" }); else window.open(target, target.endsWith(".pdf") ? "_self" : "_blank", "noopener"); }
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
    "sudo hire irfan": () => { setTimeout(() => $("#contact")?.scrollIntoView({ behavior: "smooth" }), 900); return '<span class="system-line">Permission granted.</span><br>Excellent infrastructure decision.<br>Opening contact channel…'; },
    "rm -rf /": () => '<span class="error">Request blocked.</span><br>Security policy prevented this incident.'
  };
  terminalInput?.addEventListener("keydown", e => {
    if (e.key !== "Enter") return; const raw = terminalInput.value.trim(), command = raw.toLowerCase(); terminalInput.value = ""; if (!raw) return;
    writeTerminal(`irfan@cloud:~$ ${raw}`, "command-echo");
    if (command === "clear") { terminalOutput.innerHTML = ""; return; }
    writeTerminal(terminalCommands[command]?.() || `<span class="error">command not found:</span> ${raw}<br>Type <span>help</span> for available commands.`);
  });
  terminalOutput?.addEventListener("click", e => { const link = e.target.closest("[data-term-project]"); if (link) { e.preventDefault(); openProject(link.dataset.termProject); } });

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

  const year = $("#year"); if (year) year.textContent = String(new Date().getFullYear());
  reducedMotion.addEventListener?.("change", () => location.reload());
})();
