(() => {
  "use strict";

  const root = document.documentElement;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const motionToggle = document.getElementById("motionToggle");
  let motionPreference = null;

  try {
    const saved = localStorage.getItem("irfanPortfolioMotion");
    if (saved === "full" || saved === "reduced") motionPreference = saved;
  } catch (_) {
    // The experience also works when browser storage is unavailable.
  }

  const isReduced = () => root.dataset.motion === "reduced";

  function updateMotionButton() {
    if (!motionToggle) return;
    const paused = isReduced();
    const label = paused ? "Resume animations" : "Pause animations";
    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.setAttribute("aria-label", label);
    motionToggle.setAttribute("title", label);
    const icon = motionToggle.querySelector("i");
    if (icon) icon.className = paused ? "fa-solid fa-play" : "fa-solid fa-pause";
    const labelElement = motionToggle.querySelector("[data-motion-label]");
    if (labelElement) labelElement.textContent = label;
    else if (!motionToggle.children.length) motionToggle.textContent = label;
  }

  function setMotion(mode, persist = false) {
    root.dataset.motion = mode;
    if (persist) {
      motionPreference = mode;
      try {
        localStorage.setItem("irfanPortfolioMotion", mode);
      } catch (_) {
        // Motion controls remain usable in private or restricted browsers.
      }
    }
    updateMotionButton();
    document.dispatchEvent(new CustomEvent("portfolio:motionchange", {
      bubbles: true,
      detail: { mode, reduced: mode === "reduced" },
    }));
  }

  // An explicit visitor choice takes precedence over the system default.
  setMotion(motionPreference || (root.dataset.motion === "reduced" || motionQuery.matches ? "reduced" : "full"));
  motionToggle?.addEventListener("click", () => {
    setMotion(isReduced() ? "full" : "reduced", true);
  });
  motionQuery.addEventListener("change", (event) => {
    if (!motionPreference) setMotion(event.matches ? "reduced" : "full");
  });

  const localTime = document.getElementById("localTime");
  if (localTime) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kuala_Lumpur", hour: "2-digit", minute: "2-digit", hour12: false,
    });
    const updateTime = () => {
      const now = new Date();
      localTime.textContent = `${formatter.format(now)} MYT`;
      if (localTime.tagName === "TIME") localTime.dateTime = now.toISOString();
    };
    updateTime();
    window.setInterval(updateTime, 60_000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) updateTime();
    });
  }

  const canvas = document.getElementById("orbitalCanvas");
  const stage = canvas?.closest(".orbital-stage");
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const interactiveVisuals = document.querySelectorAll(".orbital-stage, .project-visual");

  interactiveVisuals.forEach((element) => {
    const reset = () => {
      element.style.setProperty("--pointer-x", "0");
      element.style.setProperty("--pointer-y", "0");
      if (element === stage) {
        pointer.targetX = 0;
        pointer.targetY = 0;
      }
    };
    element.addEventListener("pointermove", (event) => {
      if (isReduced() || !pointerQuery.matches || event.pointerType === "touch") return;
      const box = element.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
      element.style.setProperty("--pointer-x", x.toFixed(3));
      element.style.setProperty("--pointer-y", y.toFixed(3));
      if (element === stage) {
        pointer.targetX = x;
        pointer.targetY = y;
      }
    }, { passive: true });
    element.addEventListener("pointerleave", reset, { passive: true });
    element.addEventListener("pointercancel", reset, { passive: true });
    window.addEventListener("portfolio:motionchange", reset);
  });

  const scenes = {
    cloud: {
      title: "Cloud architecture",
      description: "Connected by design.",
      dark: [224, 112, 44], light: [150, 74, 26],
      orbitTilt: 0.44, speed: 0.075, links: 1.08,
    },
    security: {
      title: "Security engineering",
      description: "Protection at every layer.",
      dark: [168, 188, 191], light: [64, 110, 118],
      orbitTilt: 0.78, speed: 0.05, links: 0.86,
    },
    systems: {
      title: "Connected systems",
      description: "Built to work together.",
      dark: [214, 178, 120], light: [138, 108, 52],
      orbitTilt: -0.32, speed: 0.095, links: 1.3,
    },
  };
  let sceneName = "cloud";
  let attackMode = false;
  window.addEventListener("portfolio:attackmode", (event) => {
    attackMode = !!(event.detail && event.detail.on);
    pointer.targetX = 0;
    pointer.targetY = 0;
    syncAnimation();
  });
  const sceneButtons = document.querySelectorAll(".scene-mode[data-scene]");

  function selectScene(name) {
    if (!scenes[name]) return;
    sceneName = name;
    sceneButtons.forEach((button) => {
      const selected = button.dataset.scene === name;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    if (stage) stage.dataset.scene = name;
    const index = document.querySelector(".scene-caption-index");
    if (index) index.textContent = `0${Object.keys(scenes).indexOf(name) + 1} / 03`;
    const title = document.getElementById("sceneTitle");
    const description = document.getElementById("sceneDescription");
    if (title) title.textContent = scenes[name].title;
    if (description) description.textContent = scenes[name].description;
  }

  selectScene(sceneName);
  sceneButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectScene(button.dataset.scene);
      render();
    });
  });

  const context = canvas?.getContext("2d");
  if (!context || !stage) return;

  let width = 0;
  let height = 0;
  let radius = 0;
  let pixelRatio = 1;
  let elapsed = 0;
  let frameId = null;
  let lastTick = 0;
  let lastDraw = 0;
  let visible = true;
  const frameInterval = 1000 / 30;
  const tau = Math.PI * 2;
  const sphereLines = [];

  // The geometry is generated once; only its projection changes each frame.
  for (let latitude = -60; latitude <= 60; latitude += 20) {
    const angle = latitude * Math.PI / 180;
    const ring = [];
    for (let step = 0; step <= 96; step++) {
      const longitude = step / 96 * tau;
      ring.push([
        Math.cos(angle) * Math.cos(longitude),
        Math.sin(angle),
        Math.cos(angle) * Math.sin(longitude),
      ]);
    }
    sphereLines.push(ring);
  }
  for (let meridian = 0; meridian < 12; meridian++) {
    const longitude = meridian / 12 * Math.PI;
    const line = [];
    for (let step = 0; step <= 96; step++) {
      const angle = step / 96 * tau;
      line.push([
        Math.cos(angle) * Math.cos(longitude),
        Math.sin(angle),
        Math.cos(angle) * Math.sin(longitude),
      ]);
    }
    sphereLines.push(line);
  }

  // Evenly distributed nodes form a readable mesh from every viewing angle.
  const nodes = Array.from({ length: 22 }, (_, index) => {
    const y = 1 - 2 * (index + 0.5) / 22;
    const distance = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return [Math.cos(angle) * distance, y, Math.sin(angle) * distance];
  });
  const links = [];
  for (let from = 0; from < nodes.length; from++) {
    for (let to = from + 1; to < nodes.length; to++) {
      const distance = Math.hypot(...nodes[from].map((value, axis) => value - nodes[to][axis]));
      if (distance < 1.3) links.push({ from, to, distance });
    }
  }

  function rgba(rgb, alpha) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }

  function render() {
    if (!context || !width || !height) return;
    const scene = scenes[sceneName];
    const light = root.dataset.theme === "light";
    const base = light ? scene.light : scene.dark;
    const color = attackMode ? [226, 147, 127] : base;
    const spin = elapsed * scene.speed * (attackMode ? 3 : 1) + 0.48 + pointer.x * 0.16;
    const tilt = -0.16 + pointer.y * 0.12;
    const sinY = Math.sin(spin);
    const cosY = Math.cos(spin);
    const sinX = Math.sin(tilt);
    const cosX = Math.cos(tilt);
    const centerX = width / 2;
    const centerY = height / 2 - height * 0.018;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    function project(point, rotate = true) {
      let [x, y, z] = point;
      if (rotate) {
        const nextX = x * cosY + z * sinY;
        const nextZ = -x * sinY + z * cosY;
        x = nextX;
        z = nextZ;
        const nextY = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = nextY;
      }
      const perspective = 4.8 / (4.8 - z);
      return { x: centerX + x * radius * perspective, y: centerY + y * radius * perspective, z, scale: perspective };
    }

    const glow = context.createRadialGradient(centerX, centerY, radius * 0.12, centerX, centerY, radius * 1.9);
    glow.addColorStop(0, rgba(color, light ? 0.035 : 0.075));
    glow.addColorStop(0.55, rgba(color, light ? 0.013 : 0.027));
    glow.addColorStop(1, rgba(color, 0));
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const projectedLines = sphereLines.map((line) => line.map((point) => project(point)));

    function drawGrid(front) {
      context.beginPath();
      projectedLines.forEach((line) => {
        for (let index = 1; index < line.length; index++) {
          const a = line[index - 1];
          const b = line[index];
          if ((a.z + b.z >= 0) !== front) continue;
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
        }
      });
      context.strokeStyle = rgba(color, front ? (light ? 0.29 : 0.3) : (light ? 0.075 : 0.09));
      context.lineWidth = front ? 0.72 : 0.6;
      context.stroke();
    }

    function orbitPoint(angle, extraTilt = 0, orbitRadius = 1.5) {
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const orbitAngle = scene.orbitTilt + extraTilt;
      return project([x, z * Math.sin(orbitAngle), z * Math.cos(orbitAngle)], false);
    }

    function drawOrbit(front, extraTilt = 0, orbitRadius = 1.5, opacity = 1) {
      context.beginPath();
      for (let index = 1; index <= 160; index++) {
        const a = orbitPoint((index - 1) / 160 * tau, extraTilt, orbitRadius);
        const b = orbitPoint(index / 160 * tau, extraTilt, orbitRadius);
        if ((a.z + b.z >= 0) !== front) continue;
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
      }
      context.strokeStyle = rgba(color, (front ? 0.44 : 0.12) * opacity);
      context.lineWidth = 0.8;
      context.stroke();
    }

    drawOrbit(false);
    if (sceneName === "security") drawOrbit(false, 0.045, 1.58, 0.52);
    if (sceneName === "systems") drawOrbit(false, 1.14, 1.35, 0.55);
    drawGrid(false);

    const projectedNodes = nodes.map((point) => project(point));
    context.beginPath();
    links.forEach(({ from, to, distance }) => {
      const a = projectedNodes[from];
      const b = projectedNodes[to];
      if (distance > scene.links || a.z < 0.05 || b.z < 0.05) return;
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
    });
    context.strokeStyle = rgba(color, sceneName === "systems" ? 0.25 : 0.19);
    context.lineWidth = 0.8;
    context.stroke();
    drawGrid(true);

    // A restrained silhouette keeps the volume clear as the mesh turns.
    context.beginPath();
    context.ellipse(centerX, centerY, radius * 1.022, radius * 1.022, 0, 0, tau);
    context.strokeStyle = rgba(color, 0.2);
    context.lineWidth = 0.7;
    context.stroke();

    projectedNodes.forEach((node, index) => {
      if (node.z < -0.45) return;
      const front = node.z > 0;
      const pulse = isReduced() ? 0.5 : (Math.sin(elapsed * 1.8 + index * 1.4) + 1) / 2;
      const dotRadius = (front ? 2.1 : 1.05) * node.scale;
      if (front && index % 3 === 0) {
        context.beginPath();
        context.arc(node.x, node.y, dotRadius + 3 + pulse * 3, 0, tau);
        context.strokeStyle = rgba(color, 0.08 + pulse * 0.15);
        context.lineWidth = 0.7;
        context.stroke();
      }
      context.beginPath();
      context.arc(node.x, node.y, dotRadius, 0, tau);
      context.fillStyle = rgba(color, front ? 0.85 : 0.22);
      context.fill();
    });

    drawOrbit(true);
    if (sceneName === "security") drawOrbit(true, 0.045, 1.58, 0.52);
    if (sceneName === "systems") drawOrbit(true, 1.14, 1.35, 0.55);

    const satelliteCount = sceneName === "systems" ? 3 : 2;
    for (let index = 0; index < satelliteCount; index++) {
      const angle = elapsed * 0.15 + index * tau / satelliteCount + 0.75;
      const satellite = orbitPoint(angle);
      const alpha = satellite.z > 0 ? 0.95 : 0.48;
      const halo = context.createRadialGradient(satellite.x, satellite.y, 0, satellite.x, satellite.y, 15);
      halo.addColorStop(0, rgba(color, light ? 0.2 : 0.3));
      halo.addColorStop(1, rgba(color, 0));
      context.fillStyle = halo;
      context.beginPath();
      context.arc(satellite.x, satellite.y, 15, 0, tau);
      context.fill();
      context.fillStyle = rgba(color, alpha);
      context.beginPath();
      context.arc(satellite.x, satellite.y, 2.7, 0, tau);
      context.fill();
    }

    if (attackMode && !isReduced()) {
      const danger = [226, 147, 127];
      const tick = Math.floor(elapsed * 0.8);
      for (let k = 0; k < 3; k++) {
        const a = projectedNodes[(tick * 5 + k * 7 + 3) % projectedNodes.length];
        const b = projectedNodes[(tick * 5 + k * 11 + 9) % projectedNodes.length];
        if (!a || !b || a.z < 0 || b.z < 0) continue;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2 - radius * 0.45;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.quadraticCurveTo(mx, my, b.x, b.y);
        context.strokeStyle = rgba(danger, 0.55);
        context.lineWidth = 1.1;
        context.stroke();
        const t = (elapsed * 1.4 + k * 0.33) % 1;
        const px = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x;
        const py = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y;
        context.beginPath();
        context.arc(px, py, 2.4, 0, tau);
        context.fillStyle = rgba(danger, 0.95);
        context.fill();
      }
    }
  }

  function canAnimate() {
    return !isReduced() && visible && !document.hidden && width > 0 && height > 0;
  }

  function frame(now) {
    frameId = null;
    if (!canAnimate()) return;
    if (!lastTick) lastTick = now;
    elapsed += Math.min((now - lastTick) / 1000, 0.1);
    lastTick = now;
    if (now - lastDraw >= frameInterval - 0.6) {
      pointer.x += (pointer.targetX - pointer.x) * 0.065;
      pointer.y += (pointer.targetY - pointer.y) * 0.065;
      render();
      lastDraw = now;
    }
    frameId = requestAnimationFrame(frame);
  }

  function syncAnimation() {
    updateMotionButton();
    if (isReduced()) {
      pointer.x = 0;
      pointer.y = 0;
    }
    if (!canAnimate()) {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      lastTick = 0;
      if (!document.hidden && visible) render();
    } else if (frameId === null) {
      lastTick = 0;
      lastDraw = 0;
      frameId = requestAnimationFrame(frame);
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    radius = Math.min(width * 0.285, height * 0.31);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    render();
    syncAnimation();
  }

  new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === "data-motion")) syncAnimation();
    render();
  }).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-motion"] });

  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  window.addEventListener("resize", resize, { passive: true });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      syncAnimation();
    }, { threshold: 0 }).observe(stage);
  }
  document.addEventListener("visibilitychange", syncAnimation);
  window.addEventListener("portfolio:motionchange", syncAnimation);
  resize();
})();
