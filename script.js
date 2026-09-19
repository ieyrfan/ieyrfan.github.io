(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const touchMode = window.matchMedia("(hover: none), (pointer: coarse)");

  const projectData = {
    "threat-nexus": {
      order: "01 / FINAL YEAR PROJECT",
      name: "Threat Nexus XDR",
      subtitle: "Cloud-Native Autonomous Security Response",
      tags: ["AWS EC2", "Lambda", "DynamoDB", "EventBridge", "Flask", "Chart.js"],
      source: "https://github.com/ieyrfan/Threat-Nexus-XDR-Enterprise-Cloud-Cybersecurity-Platform",
      architecture: ["ATTACKER", "COWRIE HONEYPOT", "LOG / EVENT", "DETECTION ENGINE", "ATTACK RULE", "EVENTBRIDGE", "IP BLOCKED", "SNS / TELEGRAM ALERT"],
      sections: [
        ["OVERVIEW", "A cloud-native XDR platform combining decoy infrastructure, event-driven detection and automated response."],
        ["PROBLEM", "Security teams need a clear path from suspicious activity to evidence, classification, response and notification."],
        ["OBJECTIVE", "Create an understandable cloud response loop that can observe attacks and trigger bounded automated action."],
        ["KEY FEATURES", "Cowrie SSH honeypot, ten attack rules, automated IP blocking, Telegram alerts, SNS notifications, a Flask dashboard and Chart.js visualisation."],
        ["SECURITY", "The system separates observation, detection, response and notification so each decision remains visible."],
        ["IMPLEMENTATION", "Kali Linux generates controlled attack traffic. Cowrie records activity, the detection engine evaluates rules and EventBridge coordinates the response path."],
        ["CHALLENGES", "Automation must react quickly while keeping decisions explainable and preventing uncontrolled response behaviour."],
        ["RESULT", "The project demonstrates an end-to-end autonomous security response flow with real-time alerting."],
        ["WHAT I LEARNED", "Detection becomes useful when it connects to a controlled action, visible evidence and a clear final state."]
      ]
    },
    pantalk: {
      order: "02 / CURRENT",
      name: "PanTalk",
      subtitle: "Privacy-First Messaging Platform",
      tags: ["React", "Node.js", "Socket.IO", "PostgreSQL", "AWS"],
      source: "https://github.com/ieyrfan/PanTalk",
      architecture: ["USER A", "TEMPORARY IDENTITY", "SOCKET.IO", "MESSAGE SERVICE", "POSTGRESQL", "USER B"],
      sections: [
        ["OVERVIEW", "A messaging platform designed around private interaction, temporary identities and intentional connection controls."],
        ["PROBLEM", "Messaging products often make identity and content persist longer than the conversation needs."],
        ["OBJECTIVE", "Explore a communication model that gives users clearer control over identity, connection and message lifetime."],
        ["KEY FEATURES", "Private messaging, temporary identities, QR-based connections, disappearing messages, group collaboration, media sharing and privacy controls."],
        ["SECURITY", "The portfolio describes the implemented identity and privacy controls without claiming unsupported encryption properties."],
        ["IMPLEMENTATION", "React provides the interface, Node.js and Socket.IO manage real-time communication, and PostgreSQL supports structured persistence."],
        ["CHALLENGES", "The experience must keep connection controls understandable while supporting real-time collaboration."],
        ["RESULT", "PanTalk demonstrates full-stack real-time application design with privacy as a product requirement."],
        ["WHAT I LEARNED", "Privacy depends on data lifetime, identity design and clear user control."]
      ]
    },
    omniverse: {
      order: "03 / RELIABILITY",
      name: "Omniverse",
      subtitle: "Multi-Cloud Disaster Recovery / SRE Showcase",
      tags: ["Terraform", "AWS EKS", "GCP GKE", "Python", "Boto3", "React"],
      source: "https://github.com/ieyrfan/omniverse-cloud-dr",
      architecture: ["AWS EKS", "HEALTH ISSUE", "SNS ALERT", "PYTHON DR AGENT", "TRAFFIC REROUTE", "GCP GKE", "AUDIT TRAIL"],
      sections: [
        ["OVERVIEW", "A multi-cloud disaster recovery showcase focused on service health, failover and operational visibility."],
        ["PROBLEM", "A workload tied to one environment needs a planned response when its primary platform becomes unhealthy."],
        ["OBJECTIVE", "Demonstrate a traceable recovery flow between AWS and GCP using infrastructure as code and automation."],
        ["KEY FEATURES", "Health monitoring, SNS alerts, a Python DR agent, traffic rerouting, chaos engineering and an immutable audit trail."],
        ["SECURITY", "Recovery actions remain bounded to defined infrastructure and the Web3 component stays secondary to reliability."],
        ["IMPLEMENTATION", "Terraform represents the environments, EKS and GKE host the workloads, and Python with Boto3 coordinates recovery logic."],
        ["CHALLENGES", "Multi-cloud recovery must handle different platforms while maintaining a clear source of operational truth."],
        ["RESULT", "The project presents a complete SRE story from health degradation to cross-cloud traffic recovery."],
        ["WHAT I LEARNED", "Resilience comes from rehearsed failure paths, automation and independent health signals."]
      ]
    },
    cspm: {
      order: "04 / CLOUD POSTURE",
      name: "Cloud security posture audit",
      subtitle: "Production-Grade CSPM Framework",
      tags: ["Terraform", "Prowler", "Python", "CIS Benchmarks", "GitHub Actions"],
      source: "https://github.com/ieyrfan/Cloud-Security-Posture-Audit",
      architecture: ["AWS ACCOUNT", "PROWLER SCAN", "FINDINGS", "CUSTOM CHECKS", "TERRAFORM HARDENING", "CI/CD REMEDIATION", "87% COMPLIANCE"],
      sections: [
        ["OVERVIEW", "A cloud posture framework that converts AWS configuration findings into prioritised hardening work."],
        ["PROBLEM", "Cloud misconfigurations are difficult to manage when scanning, remediation and validation live in separate workflows."],
        ["OBJECTIVE", "Build a repeatable path from posture assessment to infrastructure hardening and CI/CD checks."],
        ["KEY FEATURES", "Prowler scanning, custom compliance checks, Terraform hardening, GitHub Actions and remediation tracking."],
        ["SECURITY", "CIS Benchmarks and cloud configuration checks provide the control baseline."],
        ["IMPLEMENTATION", "Python processes findings, Terraform applies hardening changes and GitHub Actions keeps checks in the delivery workflow."],
        ["CHALLENGES", "Findings need context and prioritisation so compliance work produces meaningful security improvements."],
        ["RESULT", "Measured compliance improved from 42% to 87%."],
        ["WHAT I LEARNED", "A posture score is useful when it connects to specific controls, code changes and repeatable validation."]
      ]
    },
    "data-governance": {
      order: "05 / ZERO TRUST",
      name: "Cloud data governance",
      subtitle: "Zero-Trust Engine for AWS S3 Data Lakes",
      tags: ["Python", "Terraform", "AWS", "Next.js"],
      source: "https://github.com/ieyrfan/cloud-data-governance",
      architecture: ["S3 DATA", "CLASSIFICATION", "PII DETECTION", "SECURITY TIER", "REDACTION", "QUARANTINE", "GOVERNANCE"],
      sections: [
        ["OVERVIEW", "A data-governance engine for classifying and protecting information stored in AWS S3 data lakes."],
        ["PROBLEM", "Data lakes can accumulate sensitive data without consistent classification, handling or compromised-account response."],
        ["OBJECTIVE", "Apply zero-trust decisions to data based on content, identity context and security tier."],
        ["KEY FEATURES", "PII detection, classification, security tiers, redaction, honeytokens, quarantine and compromised-account response."],
        ["SECURITY", "Every data action is treated as a policy decision rather than assuming storage location equals trust."],
        ["IMPLEMENTATION", "Python handles classification logic, Terraform defines AWS resources and Next.js provides the operational interface."],
        ["CHALLENGES", "Controls must protect sensitive content while preserving useful, traceable data workflows."],
        ["RESULT", "The project demonstrates policy-based governance from ingestion to redaction and quarantine."],
        ["WHAT I LEARNED", "Data security requires classification and response paths before an incident occurs."]
      ]
    },
    aegis: {
      order: "06 / SECURITY OPERATIONS",
      name: "AEGIS",
      subtitle: "Cloud-Native SOC Dashboard",
      tags: ["React", "Three.js", "AWS Amplify", "Python", "Boto3"],
      source: "https://github.com/ieyrfan/aegis-cyber-dashboard",
      architecture: ["AWS SIGNALS", "PYTHON / BOTO3", "AMPLIFY", "SOC DASHBOARD", "THREAT VISUAL"],
      sections: [
        ["OVERVIEW", "A cloud-native security operations dashboard with focused visualisation of threat activity."],
        ["PROBLEM", "Security signals need an interface that helps an operator see priority and context."],
        ["OBJECTIVE", "Combine cloud telemetry with an accessible operational dashboard."],
        ["KEY FEATURES", "Cloud data integration, SOC views and a contained Three.js threat visualisation."],
        ["SECURITY", "The visual layer supports analysis and remains inside the project context."],
        ["IMPLEMENTATION", "React provides the dashboard, AWS Amplify hosts the application and Python with Boto3 connects cloud data."],
        ["CHALLENGES", "Visual depth must support understanding without distracting from security information."],
        ["RESULT", "AEGIS demonstrates frontend, cloud and security-data integration."],
        ["WHAT I LEARNED", "A security interface must prioritise legibility before visual novelty."]
      ]
    },
    niyyah: {
      order: "07 / COMMUNITY",
      name: "NIYYAH",
      subtitle: "Islamic Super App for Muslim Malaysians",
      tags: ["React", "Next.js", "Supabase", "TailwindCSS"],
      source: "https://github.com/ieyrfan/niyyah",
      architecture: ["USER", "ACCESSIBLE WEB APP", "QURAN / PRAYER / ZAKAT", "SUPABASE", "COMMUNITY SERVICES"],
      sections: [
        ["OVERVIEW", "A full-stack Islamic application designed for Malaysian users, including converts and older adults."],
        ["PROBLEM", "Religious tools are often fragmented and can be difficult for less technical users to navigate."],
        ["OBJECTIVE", "Bring essential services into one accessible, community-oriented experience."],
        ["KEY FEATURES", "Al-Quran with audio, JAKIM prayer times, Muallaf Hub and a Zakat Calculator."],
        ["SECURITY", "Account and data flows use the access controls available through the application and Supabase."],
        ["IMPLEMENTATION", "React and Next.js power the interface, with Supabase for backend services."],
        ["CHALLENGES", "The interface must serve users with different levels of digital confidence."],
        ["RESULT", "Niyyah demonstrates accessible full-stack product development for a specific community."],
        ["WHAT I LEARNED", "Good technical work begins with the people and context the system serves."]
      ]
    },
    smartchef: {
      order: "08 / SERVERLESS",
      name: "SMARTCHEF",
      subtitle: "Serverless Recipe Recommendation Engine",
      tags: ["AWS Lambda", "API Gateway", "DynamoDB", "Python", "Next.js"],
      source: "https://github.com/ieyrfan/smartchef-pro",
      architecture: ["USER", "NEXT.JS", "API GATEWAY", "LAMBDA", "RECOMMENDATION", "DYNAMODB", "RESULT"],
      sections: [
        ["OVERVIEW", "A serverless application that connects ingredient context to practical recipe recommendations."],
        ["PROBLEM", "Meal planning needs useful recommendations while accounting for cost and nutrition."],
        ["OBJECTIVE", "Build a scalable recommendation flow without managing long-running application servers."],
        ["KEY FEATURES", "Recipe recommendations, market cost prediction and nutrition information."],
        ["SECURITY", "API boundaries and data access remain separated through managed AWS services."],
        ["IMPLEMENTATION", "Next.js handles the interface, API Gateway exposes the service, Lambda runs Python logic and DynamoDB stores application data."],
        ["CHALLENGES", "Recommendations must combine multiple inputs while keeping response flow simple."],
        ["RESULT", "SmartChef demonstrates a complete serverless application architecture."],
        ["WHAT I LEARNED", "Managed services reduce infrastructure work only when interfaces and data models are designed clearly."]
      ]
    },
    funtechpay: {
      order: "09 / FINTECH PROTOTYPE",
      name: "FUNTECHPAY",
      subtitle: "Neo-Banking Proof of Concept",
      tags: ["React", "FastAPI", "DynamoDB", "Terraform", "JWT"],
      source: "https://github.com/ieyrfan/FunTechPay",
      architecture: ["USER", "REACT DASHBOARD", "JWT AUTH", "FASTAPI", "DYNAMODB", "TAC FLOW", "TRANSACTION"],
      sections: [
        ["OVERVIEW", "A neo-banking proof of concept combining account views, spending insight and controlled transaction flows."],
        ["PROBLEM", "Financial interfaces need clear information while protecting sensitive user actions."],
        ["OBJECTIVE", "Explore a modern banking experience with explicit authentication and transaction controls."],
        ["KEY FEATURES", "Banking dashboard, spending insights, QR split bill, JWT authentication and TAC-secured transactions."],
        ["SECURITY", "JWT protects sessions and TAC adds a confirmation step to transaction flow."],
        ["IMPLEMENTATION", "React provides the interface, FastAPI handles application logic, DynamoDB stores data and Terraform defines infrastructure."],
        ["CHALLENGES", "The proof of concept must make account state and transaction confirmation easy to understand."],
        ["RESULT", "FunTechPay demonstrates full-stack cloud application and infrastructure integration."],
        ["WHAT I LEARNED", "Sensitive workflows require visible state, validation and deliberate confirmation points."]
      ]
    }
  };

  const routeMap = {
    "/": ["landing", "OPEN SKY", "Muhammad Irfan Bin Rizal | Cloud Computing & Cloud Security", "Portfolio of Muhammad Irfan bin Rizal, a Cloud Computing & Application student focused on AWS, cloud security, infrastructure, DevOps and automation."],
    "/cloud": ["cloud", "IRFAN CLOUD HUB", "Cloud Hub | Muhammad Irfan Bin Rizal", "Explore Muhammad Irfan's projects, experience, technology, certifications and cloud security focus."],
    "/about": ["about", "ABOUT", "About Muhammad Irfan Bin Rizal | Cloud Computing", "About Muhammad Irfan bin Rizal, a Cloud Computing & Application student at UTeM."],
    "/experience": ["experience", "EXPERIENCE", "Professional Experience | Muhammad Irfan Bin Rizal", "Professional IT experience at FTMK UTeM and Port Klang Cruise Terminal."],
    "/projects": ["projects", "PROJECTS", "Engineering Projects | Muhammad Irfan Bin Rizal", "Cloud, security and application projects designed and built by Muhammad Irfan bin Rizal."],
    "/stack": ["stack", "STACK", "Technology Stack | Muhammad Irfan Bin Rizal", "Cloud, security, networking, programming and operations technologies used by Muhammad Irfan."],
    "/security": ["security", "CLOUD SECURITY", "Cloud Security | Muhammad Irfan Bin Rizal", "Cloud security focus across identity, visibility, detection, posture management and automated response."],
    "/journey": ["journey", "JOURNEY", "Education Journey | Muhammad Irfan Bin Rizal", "Education and progression from network services to cloud computing and cloud security."],
    "/certifications": ["certifications", "CERTIFICATIONS", "Certifications | Muhammad Irfan Bin Rizal", "AWS, Oracle, Red Hat, Cisco and other technical credentials completed by Muhammad Irfan."],
    "/lab": ["lab", "CLOUD LAB", "Cloud Lab | Muhammad Irfan Bin Rizal", "Documented AWS, security, networking, automation and server experiments."],
    "/contact": ["contact", "CONTACT", "Contact Muhammad Irfan Bin Rizal", "Contact Muhammad Irfan bin Rizal about cloud engineering, security, infrastructure, DevOps and automation opportunities."]
  };
  Object.values(projectData).forEach(data => {
    const slug = Object.keys(projectData).find(key => projectData[key] === data);
    routeMap[`/projects/${slug}`] = [`project-${slug}`, data.name, `${data.name} | Muhammad Irfan Bin Rizal`, `${data.subtitle}, an engineering project by Muhammad Irfan bin Rizal.`];
  });

  const stackData = {
    cloud: [
      ["AWS", "Cloud platform used to build infrastructure, security and serverless systems.", "EC2 · Lambda · S3 · EKS · EventBridge", "Threat Nexus · SmartChef · CSPM · Data Governance"],
      ["AWS Lambda", "Serverless compute used to run code without managing servers.", "API Gateway · DynamoDB · EventBridge", "Threat Nexus · SmartChef"],
      ["Amazon EKS", "Managed Kubernetes used for container orchestration on AWS.", "Terraform · Docker · SNS", "Omniverse"],
      ["GCP GKE", "Managed Kubernetes target used in a multi-cloud recovery path.", "Terraform · Kubernetes · traffic routing", "Omniverse"],
      ["OpenStack", "Private cloud platform used to understand compute and tenant networking.", "Linux · Neutron · virtualization", "OpenStack Networking Lab"],
      ["Terraform", "Infrastructure as Code used to review and repeat cloud deployments.", "AWS · GCP · EKS · VPC", "Omniverse · CSPM · Data Governance · FunTechPay"],
      ["Docker", "Packages applications and dependencies into repeatable runtime boundaries.", "Linux · Kubernetes · application services", "Omniverse · Cloud Lab"]
    ],
    security: [
      ["XDR", "Connects security telemetry, detection rules, response and alerting.", "Cowrie · Lambda · EventBridge", "Threat Nexus XDR"],
      ["Prowler", "Scans cloud configuration against security and compliance checks.", "AWS · CIS Benchmarks · Python", "Cloud Security Posture Audit"],
      ["CIS Benchmarks", "Provides a recognised baseline for secure configuration checks.", "Prowler · Terraform · CI/CD", "Cloud Security Posture Audit"],
      ["IAM", "Controls which identities can perform actions on cloud resources.", "AWS · least privilege · CloudTrail", "Threat Nexus · CSPM · Data Governance"],
      ["GuardDuty", "Managed threat-detection service used to understand cloud findings.", "CloudTrail · EventBridge · Security Hub", "Cloud Security practice"],
      ["Zero Trust", "Treats access and data actions as explicit policy decisions.", "Identity · classification · quarantine", "Cloud Data Governance"],
      ["Network Defense", "Applies monitoring and protective controls to network paths.", "Firewall · VPN · intrusion prevention", "Cisco training · infrastructure work"]
    ],
    networking: [
      ["LAN / WAN", "Connects local and wide-area systems through planned network paths.", "Switches · routing · addressing", "Port Klang Cruise Terminal"],
      ["PoE Switching", "Carries network traffic and power for devices such as cameras.", "LAN · CCTV · device maintenance", "Port Klang Cruise Terminal"],
      ["Load Balancing", "Distributes traffic across healthy application targets.", "Cloud infrastructure · health checks", "Architecture practice"],
      ["VPN", "Creates protected connectivity across network boundaries.", "Firewall · identity · remote access", "Network defence practice"],
      ["Firewall", "Applies traffic rules at defined network boundaries.", "Routing · VPN · intrusion prevention", "Security and networking practice"],
      ["CCNA", "Networking foundation covering addressing, switching and routing.", "LAN · WAN · network services", "Cisco training"]
    ],
    programming: [
      ["Python", "Builds automation, cloud integrations, APIs and detection logic.", "Flask · FastAPI · Boto3", "Threat Nexus · Omniverse · CSPM · SmartChef"],
      ["React", "Builds interactive application interfaces from reusable components.", "JavaScript · TypeScript · Next.js", "PanTalk · AEGIS · Niyyah · FunTechPay"],
      ["Next.js", "Provides application routing and full-stack React capabilities.", "React · APIs · Supabase", "Niyyah · SmartChef · Data Governance"],
      ["FastAPI", "Python framework used to expose typed application APIs.", "Python · JWT · DynamoDB", "FunTechPay"],
      ["Flask", "Python web framework used for dashboards and orchestration interfaces.", "Python · Chart.js · AWS", "Threat Nexus"],
      ["SQL", "Queries and structures relational application data.", "PostgreSQL · MySQL", "PanTalk · application projects"],
      ["C++", "Builds foundational application logic and structured programs.", "Data structures · MySQL", "Programming foundations"]
    ],
    operations: [
      ["Linux", "Operating environment for servers, cloud workloads and technical troubleshooting.", "Docker · networking · CLI", "Cloud Lab · OpenStack · project infrastructure"],
      ["Windows", "Supports enterprise desktops, labs and Windows-based operations.", "Hardware · software · network services", "FTMK UTeM · Port Klang Cruise Terminal"],
      ["GitHub Actions", "Automates checks and delivery workflows inside a repository.", "Git · Terraform · security checks", "Cloud Security Posture Audit"],
      ["CCTV Systems", "Combines networked cameras, PoE infrastructure and maintenance.", "PoE switches · LAN · asset records", "Port Klang Cruise Terminal"],
      ["AV Systems", "Supports projectors, sound, streaming and hybrid events.", "Live streaming · media production", "FTMK UTeM"],
      ["IT Asset Auditing", "Records and verifies technology assets for operational control.", "Workstations · CCTV · documentation", "Port Klang Cruise Terminal"],
      ["Supabase", "Managed backend used for database, authentication and application services.", "Next.js · React", "Niyyah"]
    ]
  };

  const securityData = {
    identity: ["IDENTITY / IAM", "Access starts with identity.", "Define who or what can access a resource, then grant only the permissions required for the task."],
    visibility: ["VISIBILITY / CLOUDTRAIL + CLOUDWATCH", "Security needs observable state.", "Logs and operational signals create the evidence required to understand what happened and where to investigate."],
    detection: ["DETECTION / GUARDDUTY + XDR", "Signals become actionable findings.", "Managed detection and project-specific rules identify suspicious behaviour and attach context to the event."],
    posture: ["POSTURE / PROWLER + CIS + CONFIG", "Configuration is part of security.", "Posture checks compare cloud resources with defined controls, then connect findings to hardening work."],
    response: ["RESPONSE / LAMBDA + EVENTBRIDGE", "Automation needs clear boundaries.", "Event-driven workflows can contain or recover resources when the action is approved, traceable and followed by verification."]
  };

  const labDetails = [
    ["AWS VPC Architecture", "Design public and private network boundaries with controlled routing.", ["OBJECTIVE", "Separate reachable workloads from protected services."], ["SETUP", "AWS VPC with public and private subnet planning."], ["ARCHITECTURE", "Internet gateway → public subnet → controlled private subnet"], ["PROCESS", "Define addressing, routes, security groups and egress."], ["RESULT", "A traceable network path with explicit ingress and egress."], ["LESSON", "Subnet labels do not create security; routes and controls do."]],
    ["IAM Policy Testing", "Test how identity-policy decisions affect access.", ["OBJECTIVE", "Reduce permissions to the actions a workload actually needs."], ["SETUP", "IAM principal, policies and AWS policy evaluation."], ["ARCHITECTURE", "Principal → policy evaluation → resource"], ["PROCESS", "Compare allowed, implicitly denied and explicitly denied requests."], ["RESULT", "Permissions examined through clear policy outcomes."], ["LESSON", "Least privilege is an iterative engineering process."]],
    ["Terraform Deployment", "Represent infrastructure as reviewed, repeatable configuration.", ["OBJECTIVE", "Create consistent cloud resources without manual drift."], ["SETUP", "Terraform configuration and state for AWS resources."], ["ARCHITECTURE", "Configuration → plan → apply → observed state"], ["PROCESS", "Review the change plan before applying infrastructure."], ["RESULT", "A repeatable deployment path with visible changes."], ["LESSON", "State and review matter as much as resource syntax."]],
    ["Security Automation", "Connect findings to a controlled response workflow.", ["OBJECTIVE", "Reduce repetitive response work while preserving control."], ["SETUP", "Python, event inputs and cloud APIs."], ["ARCHITECTURE", "Finding → policy → action → verification"], ["PROCESS", "Evaluate the event, select a bounded action and verify state."], ["RESULT", "A clear incident-response design."], ["LESSON", "Automation must verify outcomes independently."]],
    ["OpenStack Networking", "Trace connectivity inside a private cloud.", ["OBJECTIVE", "Understand tenant routing and external reachability."], ["SETUP", "OpenStack CLI, Neutron and Linux networking."], ["ARCHITECTURE", "Instance → tenant network → router → floating IP"], ["PROCESS", "Inspect ports, routes, addresses and reachability."], ["RESULT", "Connectivity explained through explicit network state."], ["LESSON", "CLI evidence makes invisible network state understandable."]],
    ["Docker Application", "Package an application with its runtime boundary.", ["OBJECTIVE", "Make execution repeatable across systems."], ["SETUP", "Dockerfile, application dependencies and published ports."], ["ARCHITECTURE", "Source → image → container → published service"], ["PROCESS", "Build, run and verify the containerised service."], ["RESULT", "A consistent deployable application environment."], ["LESSON", "A small image starts with clear dependency choices."]]
  ];

  const normalizePath = path => path.replace(/\/+$/, "") || "/";
  function setPortfolioTheme() {
    root.dataset.mode = "day";
    root.dataset.theme = "day";
    $$('[data-theme-mode]').forEach(button => button.setAttribute("aria-pressed", "false"));
    $('meta[name="theme-color"]')?.setAttribute("content", "#0c1728");
  }
  setPortfolioTheme();

  const stars = $("#stars");
  if (stars) for (let index = 0; index < 22; index += 1) { const star = document.createElement("i"); star.style.left = `${4 + Math.random() * 92}%`; star.style.top = `${3 + Math.random() * 68}%`; star.style.setProperty("--twinkle", `${16 + Math.random() * 28}s`); star.style.setProperty("--delay", `${-Math.random() * 20}s`); star.style.opacity = String(.14 + Math.random() * .4); stars.appendChild(star); }
  requestAnimationFrame(() => document.body.classList.add("scene-ready"));

  const nav = $("#navbar"), navMenu = $("#navLinks"), menuToggle = $("#menuToggle");
  function toggleMenu(open) { navMenu?.classList.toggle("open", open); menuToggle?.setAttribute("aria-expanded", String(open)); menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  menuToggle?.addEventListener("click", () => toggleMenu(!navMenu.classList.contains("open")));

  function syncNavIndicator(page) {
    const group = page.startsWith("project-") ? "projects" : page;
    const link = $(`[data-page-link="${group}"]`), indicator = $("#navIndicator");
    $$('[data-page-link]').forEach(item => item.classList.toggle("active", item === link));
    if (!link || !indicator || innerWidth <= 1080) { if (indicator) indicator.style.width = "0"; return; }
    const navRect = navMenu.getBoundingClientRect(), rect = link.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`; indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }

  const transition = $("#routeTransition");
  let routeTimer = 0;
  function updateMetadata(route, path) {
    document.title = route[2];
    $('meta[name="description"]')?.setAttribute("content", route[3]);
    $('meta[property="og:title"]')?.setAttribute("content", route[2]);
    $('meta[property="og:description"]')?.setAttribute("content", route[3]);
    const url = `https://ieyrfan.github.io${path === "/" ? "/" : `${path}/`}`;
    $('link[rel="canonical"]')?.setAttribute("href", url);
    $('meta[property="og:url"]')?.setAttribute("content", url);
  }
  function applyRoute(path, scroll = true) {
    const normalized = normalizePath(path), route = routeMap[normalized] || routeMap["/"];
    root.dataset.page = route[0];
    $("#regionReadout").textContent = `PAGE / ${route[1]}`;
    syncNavIndicator(route[0]); updateMetadata(route, normalized);
    if (scroll) window.scrollTo({ top: 0, behavior: "auto" });
    if (route[0].startsWith("project-")) openProject(route[0].replace("project-", ""), false);
    else if (caseStudy?.open) closeProject(false);
    window.dispatchEvent(new CustomEvent("portfolio:route", { detail: { path: normalized, page: route[0], title: route[2] } }));
  }
  function routeTo(path, customLabel = "") {
    const normalized = normalizePath(path), route = routeMap[normalized];
    if (!route) return;
    const signature = root.dataset.page === "landing" && route[0] === "cloud";
    window.clearTimeout(routeTimer);
    transition.dataset.target = route[0];
    transition.classList.toggle("signature", signature);
    $("#routeTransitionLabel").textContent = customLabel || (signature ? "ENTERING IRFAN CLOUD" : `OPENING ${route[1]}`);
    document.body.classList.add("route-leaving"); transition.classList.remove("reveal"); transition.classList.add("active");
    const coverDelay = reducedMotion.matches ? 20 : signature ? 720 : 260;
    routeTimer = window.setTimeout(() => {
      history.pushState({}, "", normalized === "/" ? "/" : `${normalized}/`);
      applyRoute(normalized);
      transition.classList.add("reveal"); document.body.classList.remove("route-leaving");
      routeTimer = window.setTimeout(() => transition.classList.remove("active", "reveal", "signature"), reducedMotion.matches ? 20 : 280);
    }, coverDelay);
  }
  document.addEventListener("click", event => { const link = event.target.closest("a[data-route]"); if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return; event.preventDefault(); toggleMenu(false); routeTo(link.pathname); });
  window.addEventListener("popstate", () => applyRoute(location.pathname));
  window.addEventListener("resize", () => syncNavIndicator(root.dataset.page));

  const revealItems = $$(".reveal");
  revealItems.forEach((item, index) => item.style.setProperty("--reveal-order", String(index % 5)));
  if (reducedMotion.matches || !("IntersectionObserver" in window)) revealItems.forEach(item => item.classList.add("visible"));
  else { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .08, rootMargin: "0px 0px -5%" }); revealItems.forEach(item => observer.observe(item)); }

  const regionSections = $$('[data-region]');
  let scrollTick = false;
  function updateScroll() {
    const scroll = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty("--site-scroll", String(max > 0 ? scroll / max : 0));
    if ($("#scrollMeter")) $("#scrollMeter").style.width = `${max > 0 ? scroll / max * 100 : 0}%`;
    nav?.classList.toggle("scrolled", scroll > 36);
    const marker = innerHeight * .32;
    const active = regionSections.filter(section => { const rect = section.getBoundingClientRect(); return rect.top <= marker && rect.bottom > marker && getComputedStyle(section).display !== "none"; }).pop();
    if (active) { $("#regionReadout").textContent = `PAGE / ${active.dataset.region}`; nav?.classList.toggle("over-dark", !["OPEN SKY", "ENTER CLOUD", "IRFAN CLOUD HUB", "CONTACT"].includes(active.dataset.region)); }
    const entry = $("#cloud-entry");
    if (entry && root.dataset.page === "landing") {
      if (touchMode.matches) {
        const heroProgress = Math.max(0, Math.min(1, scroll / Math.max(1, innerHeight)));
        $("#entryBoot").classList.add("visible");
        if (!reducedMotion.matches) {
          const rect = entry.getBoundingClientRect(), travel = Math.max(1, rect.height - innerHeight), progress = Math.max(0, Math.min(1, -rect.top / travel));
          const smooth = (start, end, value) => { const amount = Math.max(0, Math.min(1, (value - start) / Math.max(.001, end - start))); return amount * amount * (3 - 2 * amount); };
          const approach = smooth(.02, .6, progress), penetration = smooth(.2, .62, progress), exit = smooth(.62, 1, progress);
          const whiteoutAmount = smooth(.24, .5, progress) * (1 - smooth(.58, .84, progress));
          const cloudFade = 1 - smooth(.67, .94, progress), bootFade = 1 - smooth(.16, .42, progress);
          const farCloud = $(".cloud-far"), midCloud = $(".cloud-mid"), nearCloud = $(".cloud-near"), entryA = $(".entry-cloud-a"), entryB = $(".entry-cloud-b"), whiteout = $(".entry-whiteout"), depth = $(".entry-depth"), boot = $("#entryBoot"), sticky = $(".cloud-entry-sticky");
          if ($("#heroSky")) $("#heroSky").style.setProperty("--parallax-y", `${heroProgress * -18}px`);
          if (farCloud) farCloud.style.setProperty("--parallax-x", `${heroProgress * 10}px`);
          if (midCloud) midCloud.style.setProperty("--parallax-x", `${heroProgress * -18}px`);
          if (nearCloud) nearCloud.style.setProperty("--parallax-y", `${heroProgress * -24}px`);
          if (sticky) { sticky.style.setProperty("--entry-progress", progress.toFixed(4)); sticky.style.setProperty("--entry-bg-scale", String(1.04 + approach * 1.42)); sticky.style.setProperty("--entry-bg-opacity", String(Math.max(0, .58 * (1 - exit)))); sticky.style.setProperty("--entry-bg-brightness", String(1.2 + whiteoutAmount * .72)); sticky.style.setProperty("--entry-bg-blur", `${penetration * 5}px`); }
          if (entryA) { entryA.style.transform = `translate3d(${-18 + approach * 27}%,${8 - approach * 24}%,0) scale(${1.16 + approach * 4.45})`; entryA.style.opacity = String(Math.max(0, (.28 + penetration * .7) * cloudFade)); }
          if (entryB) { entryB.style.transform = `translate3d(${16 - approach * 34}%,${-4 + approach * 22}%,0) scale(${1.42 + approach * 5.35}) rotate(180deg)`; entryB.style.opacity = String(Math.max(0, (.18 + penetration * .68) * cloudFade)); }
          if (whiteout) { whiteout.style.transform = `scale(${.86 + penetration * .5})`; whiteout.style.opacity = String(whiteoutAmount * .78); }
          if (depth) { depth.style.transform = `scale(${1.14 - exit * .14})`; depth.style.opacity = String(exit); }
          if (boot) { boot.style.transform = `translate3d(0,${progress * -34}px,0) scale(${1 + penetration * .075})`; boot.style.opacity = String(bootFade); boot.style.filter = `blur(${penetration * 5}px)`; }
          nav?.classList.remove("over-dark");
        }
      } else {
        const rect = entry.getBoundingClientRect(), progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
        $(".entry-cloud-a").style.transform = `scale(${1.18 + progress * .52}) translate3d(${progress * 5}%,0,0)`;
        $(".entry-cloud-b").style.transform = `scale(${1.65 + progress * .58}) rotate(180deg) translate3d(${-progress * 4}%,0,0)`;
        $("#entryBoot").classList.toggle("visible", progress > .34);
      }
    }
    scrollTick = false;
  }
  addEventListener("scroll", () => { if (!scrollTick) { requestAnimationFrame(updateScroll); scrollTick = true; } }, { passive: true });
  updateScroll();

  if (!touchMode.matches && !reducedMotion.matches) {
    const hero = $(".hero"), layers = [$("#heroSky"), $(".cloud-far"), $(".cloud-mid"), $(".cloud-near"), $("#heroContent")], strengths = [2, 5, 10, 16, 2];
    hero?.addEventListener("pointermove", event => { const x = event.clientX / innerWidth - .5, y = event.clientY / innerHeight - .5; layers.forEach((layer, index) => { if (layer) { layer.style.setProperty("--parallax-x", `${x * strengths[index]}px`); layer.style.setProperty("--parallax-y", `${y * strengths[index] * .6}px`); } }); });
    hero?.addEventListener("pointerleave", () => layers.forEach(layer => { if (layer) { layer.style.setProperty("--parallax-x", "0px"); layer.style.setProperty("--parallax-y", "0px"); } }));
    const cursor = $("#cursor"), ring = $("#cursorRing"); let targetX = -100, targetY = -100, ringX = -100, ringY = -100;
    addEventListener("pointermove", event => { targetX = event.clientX; targetY = event.clientY; root.style.setProperty("--pointer-x", `${targetX}px`); root.style.setProperty("--pointer-y", `${targetY}px`); cursor.style.transform = `translate3d(${targetX}px,${targetY}px,0)`; document.body.classList.add("cursor-active"); });
    const animateCursor = () => { ringX += (targetX - ringX) * .16; ringY += (targetY - ringY) * .16; ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`; requestAnimationFrame(animateCursor); }; animateCursor();
    document.addEventListener("pointerover", event => document.body.classList.toggle("cursor-link", Boolean(event.target.closest("a,button,[role=button]"))));
  }

  let stackCategory = "cloud";
  function renderStack(category) {
    stackCategory = category;
    const items = stackData[category];
    $$('[data-stack]').forEach(button => button.classList.toggle("active", button.dataset.stack === category));
    $("#stackNodes").innerHTML = items.map((item, index) => `<button type="button" class="stack-tech ${index === 0 ? "active" : ""}" data-tech-index="${index}"><b>${item[0]}</b><span>${item[1]}</span></button>`).join("");
    showTechnology(items[0]);
  }
  function showTechnology(item) { const panel = $("#stackContext"); panel.innerHTML = `<span>TECHNOLOGY / RELATIONSHIP</span><h3>${item[0]}</h3><p>${item[1]}</p><dl class="tech-detail"><div><dt>USED WITH</dt><dd>${item[2]}</dd></div><div><dt>PROJECTS / EXPERIENCE</dt><dd>${item[3]}</dd></div></dl>`; panel.classList.remove("updated"); requestAnimationFrame(() => panel.classList.add("updated")); }
  $$('[data-stack]').forEach(button => button.addEventListener("click", () => renderStack(button.dataset.stack)));
  $("#stackNodes")?.addEventListener("click", event => { const button = event.target.closest("button[data-tech-index]"); if (!button) return; $$(".stack-tech", $("#stackNodes")).forEach(node => node.classList.toggle("active", node === button)); showTechnology(stackData[stackCategory][Number(button.dataset.techIndex)]); });
  renderStack("cloud");

  $$("#securityPath button").forEach(button => button.addEventListener("mouseenter", () => showSecurity(button)));
  $$("#securityPath button").forEach(button => button.addEventListener("focus", () => showSecurity(button)));
  $$("#securityPath button").forEach(button => button.addEventListener("click", () => showSecurity(button)));
  function showSecurity(button) { $$("#securityPath button").forEach(item => item.classList.toggle("active", item === button)); const data = securityData[button.dataset.security]; $("#securityCode").textContent = data[0]; $("#securityHeading").textContent = data[1]; $("#securityText").textContent = data[2]; }

  $$(".lab-toolbar button").forEach(button => button.addEventListener("click", () => { const tag = button.dataset.lab; $$(".lab-toolbar button").forEach(item => item.classList.toggle("active", item === button)); $$("#labGrid article").forEach(card => { card.hidden = tag !== "all" && !(card.dataset.tags || "").split(" ").includes(tag); }); }));
  const labPanel = $("#labPanel");
  $$("#labGrid article").forEach((card, index) => { card.tabIndex = 0; card.setAttribute("role", "button"); card.setAttribute("aria-label", `Open ${labDetails[index][0]} lab record`); const open = () => { const data = labDetails[index]; $("#labPanelCode").textContent = `LAB / ${String(index + 1).padStart(3, "0")}`; $("#labPanelTitle").textContent = data[0]; $("#labPanelSummary").textContent = data[1]; $("#labDetailGrid").innerHTML = data.slice(2).map(item => `<article><span>${item[0]}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join(""); labPanel.showModal(); document.body.classList.add("modal-open"); }; card.addEventListener("click", open); card.addEventListener("keydown", event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); open(); } }); });
  $("#labClose")?.addEventListener("click", () => { labPanel.close(); document.body.classList.remove("modal-open"); });
  labPanel?.addEventListener("click", event => { if (event.target === labPanel) { labPanel.close(); document.body.classList.remove("modal-open"); } });

  const caseStudy = $("#caseStudy");
  let currentProject = "threat-nexus", incidentIndex = 0, incidentTimer = 0, incidentPaused = false;
  const incidentEvents = ["00:00  Suspicious login attempt", "00:01  Honeypot records activity", "00:02  Detection rule triggers", "00:03  Incident classified", "00:04  Response automation starts", "00:05  Source IP blocked", "00:06  Notification delivered", "[SUCCESS] THREAT CONTAINED"];
  function resetIncident() { clearTimeout(incidentTimer); incidentIndex = 0; incidentPaused = false; if ($("#incidentPause")) $("#incidentPause").textContent = "PAUSE"; $$("#incidentNodes li").forEach(node => node.className = ""); if ($("#incidentLog")) $("#incidentLog").textContent = "[READY] Waiting for manual replay."; }
  function advanceIncident() { if (incidentPaused) return; const nodes = $$("#incidentNodes li"); if (incidentIndex >= nodes.length) { $("#incidentLog").textContent = incidentEvents.join("\n"); return; } nodes.forEach((node, index) => { node.classList.toggle("done", index < incidentIndex); node.classList.toggle("active", index === incidentIndex); }); $("#incidentLog").textContent = incidentEvents.slice(0, incidentIndex + 1).join("\n"); incidentIndex += 1; incidentTimer = setTimeout(advanceIncident, reducedMotion.matches ? 80 : 720); }
  function openProject(slug, updateRoute = true) { const data = projectData[slug]; if (!data) return; currentProject = slug; $("#caseEyebrow").textContent = data.order; $("#caseTitle").textContent = data.name; $("#caseSubtitle").textContent = data.subtitle; $("#caseTags").innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join(""); $("#architectureSteps").innerHTML = data.architecture.map(step => `<li>${step}</li>`).join(""); $("#caseGrid").innerHTML = data.sections.map((section, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${section[0]}</h3><p>${section[1]}</p></article>`).join(""); $("#caseSource").href = data.source; $("#incidentReplay").hidden = slug !== "threat-nexus"; resetIncident(); if (!caseStudy.open) caseStudy.showModal(); caseStudy.scrollTop = 0; document.body.classList.add("modal-open"); if (updateRoute && normalizePath(location.pathname) !== `/projects/${slug}`) { history.pushState({}, "", `/projects/${slug}/`); applyRoute(`/projects/${slug}`, false); } }
  function closeProject(updateRoute = true) { resetIncident(); if (caseStudy.open) caseStudy.close(); document.body.classList.remove("modal-open"); if (updateRoute && root.dataset.page.startsWith("project-")) { history.pushState({}, "", "/projects/"); applyRoute("/projects"); } }
  $("#caseClose")?.addEventListener("click", () => closeProject());
  caseStudy?.addEventListener("click", event => { if (event.target === caseStudy) closeProject(); });
  $("#caseNext")?.addEventListener("click", () => { const keys = Object.keys(projectData), next = keys[(keys.indexOf(currentProject) + 1) % keys.length]; history.replaceState({}, "", `/projects/${next}/`); root.dataset.page = `project-${next}`; updateMetadata(routeMap[`/projects/${next}`], `/projects/${next}`); openProject(next, false); });
  $("#incidentRun")?.addEventListener("click", () => { resetIncident(); advanceIncident(); });
  $("#incidentPause")?.addEventListener("click", () => { incidentPaused = !incidentPaused; $("#incidentPause").textContent = incidentPaused ? "RESUME" : "PAUSE"; if (!incidentPaused) advanceIncident(); });
  $("#incidentReset")?.addEventListener("click", resetIncident);

  const commands = [
    ["Cloud Hub", "Portfolio directory", "/cloud/"], ["About", "About Muhammad Irfan", "/about/"], ["Experience", "Professional IT experience", "/experience/"], ["Projects", "Selected engineering projects", "/projects/"], ["Threat Nexus XDR", "Flagship cloud security project", "/projects/threat-nexus/"], ["PanTalk", "Privacy-first messaging", "/projects/pantalk/"], ["Stack", "Technology relationship explorer", "/stack/"], ["Security", "Cloud security specialization", "/security/"], ["Journey", "Education and progression", "/journey/"], ["Certifications", "Training and credentials", "/certifications/"], ["Lab", "Technical experiments", "/lab/"], ["Contact", "Connect with Muhammad Irfan", "/contact/"], ["Resume", "View PDF resume", "asset/Muhammad_Irfan_Resume.pdf?v=resume-20260910"], ["GitHub", "Open GitHub profile", "https://github.com/ieyrfan"], ["LinkedIn", "Open LinkedIn profile", "https://www.linkedin.com/in/irfanrizal2004"]
  ];
  const palette = $("#commandPalette"), search = $("#commandSearch"), commandList = $("#commandList");
  let filteredCommands = commands, selectedCommand = 0;
  function renderCommands(query = "") { const term = query.trim().toLowerCase(); const score = command => { const label = command[0].toLowerCase(); return label === term ? 0 : label.startsWith(term) ? 1 : label.includes(term) ? 2 : 3; }; filteredCommands = commands.filter(command => `${command[0]} ${command[1]}`.toLowerCase().includes(term)).sort((a, b) => score(a) - score(b)); selectedCommand = 0; commandList.innerHTML = filteredCommands.map((command, index) => `<li><button type="button" data-command-index="${index}" class="${index === 0 ? "selected" : ""}"><b>${command[0]}</b><span>${command[1]}</span></button></li>`).join(""); }
  function openPalette() { renderCommands(); palette.showModal(); document.body.classList.add("modal-open"); setTimeout(() => search.focus(), 20); }
  function closePalette() { if (palette.open) palette.close(); document.body.classList.remove("modal-open"); }
  function runCommand(command) { if (!command) return; closePalette(); const target = command[2]; if (target.startsWith("/")) routeTo(target, `OPENING ${command[0].toUpperCase()}`); else window.open(target, target.includes(".pdf") ? "_self" : "_blank", "noopener"); }
  $("#commandTrigger")?.addEventListener("click", openPalette);
  document.addEventListener("keydown", event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); palette.open ? closePalette() : openPalette(); } if (event.key === "Escape" && palette.open) closePalette(); });
  search?.addEventListener("input", () => renderCommands(search.value));
  search?.addEventListener("keydown", event => { if (["ArrowDown", "ArrowUp"].includes(event.key)) { event.preventDefault(); selectedCommand = (selectedCommand + (event.key === "ArrowDown" ? 1 : -1) + filteredCommands.length) % filteredCommands.length; $$("button", commandList).forEach((button, index) => button.classList.toggle("selected", index === selectedCommand)); } else if (event.key === "Enter") { event.preventDefault(); runCommand(filteredCommands[selectedCommand]); } });
  commandList?.addEventListener("click", event => { const button = event.target.closest("button"); if (button) runCommand(filteredCommands[Number(button.dataset.commandIndex)]); });
  palette?.addEventListener("click", event => { if (event.target === palette) closePalette(); });

  document.addEventListener("visibilitychange", () => document.body.classList.toggle("animations-paused", document.hidden));
  const year = $("#year"); if (year) year.textContent = String(new Date().getFullYear());
  applyRoute(location.pathname, false);
  reducedMotion.addEventListener?.("change", () => location.reload());
})();
