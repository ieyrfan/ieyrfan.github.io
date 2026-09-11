(() => {
  "use strict";

  const reduced = () =>
    document.documentElement.dataset.motion === "reduced" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    if (!finePointer()) return;

    // --- 3D tilt + glare on cards ---
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      let raf = null;
      el.addEventListener(
        "pointermove",
        (event) => {
          if (reduced() || event.pointerType === "touch") return;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const px = (event.clientX - r.left) / r.width - 0.5;
          const py = (event.clientY - r.top) / r.height - 0.5;
          if (raf) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
            el.style.setProperty("--glare-x", `${(px * 100 + 50).toFixed(1)}%`);
            el.style.setProperty("--glare-y", `${(py * 100 + 50).toFixed(1)}%`);
          });
        },
        { passive: true }
      );
      const reset = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        el.style.transform = "";
      };
      el.addEventListener("pointerleave", reset, { passive: true });
      el.addEventListener("pointercancel", reset, { passive: true });
      window.addEventListener("portfolio:motionchange", reset);
    });

    // --- Drag-to-spin 3D cube ---
    const stage = document.querySelector(".cube-stage");
    const cube = document.getElementById("techCube");
    if (stage && cube) {
      let dragging = false;
      let sx = 0;
      let sy = 0;
      let rx = -18;
      let ry = 0;
      let idle = null;
      stage.addEventListener("pointerdown", (event) => {
        if (reduced()) return;
        dragging = true;
        sx = event.clientX;
        sy = event.clientY;
        cube.style.animationPlayState = "paused";
        stage.style.cursor = "grabbing";
        clearTimeout(idle);
        try {
          stage.setPointerCapture(event.pointerId);
        } catch (_) {}
      });
      stage.addEventListener("pointermove", (event) => {
        if (!dragging || reduced()) return;
        ry += (event.clientX - sx) * 0.6;
        rx -= (event.clientY - sy) * 0.4;
        rx = Math.max(-70, Math.min(30, rx));
        sx = event.clientX;
        sy = event.clientY;
        cube.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`;
      });
      const end = () => {
        if (!dragging) return;
        dragging = false;
        stage.style.cursor = "";
        clearTimeout(idle);
        idle = setTimeout(() => {
          rx = -18;
          ry = 0;
          cube.style.transform = "";
          cube.style.animationPlayState = "";
        }, 2500);
      };
      stage.addEventListener("pointerup", end);
      stage.addEventListener("pointercancel", end);
    }
  });
})();
