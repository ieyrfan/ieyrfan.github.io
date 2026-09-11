(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const term = document.getElementById("socTerminal");
    const out = document.getElementById("termOutput");
    const form = document.getElementById("termForm");
    const input = document.getElementById("termInput");
    const closeBtn = document.getElementById("termClose");
    if (!term || !out || !form || !input) return;

    const history = [];
    let hIndex = -1;

    const print = (text, cls) => {
      const div = document.createElement("div");
      if (cls) div.className = cls;
      div.textContent = text;
      out.appendChild(div);
      out.scrollTop = out.scrollHeight;
    };

    const motd = () => {
      print("IRFAN-SOC v2.6 — public demo terminal. No real systems here.", "t-dim");
      print("Type 'help' to see what you can do.", "t-dim");
    };

    const COMMANDS = {
      help: () => [
        ["whoami ......... who are you in here?", ""],
        ["about .......... who is Irfan?", ""],
        ["projects ....... what has he built?", ""],
        ["skills ......... tech arsenal", ""],
        ["certs .......... credentials (21)", ""],
        ["contact ........ how to reach him", ""],
        ["open <section>  jump to work / lab / contact …", ""],
        ["theme .......... toggle dark / light", ""],
        ["date ........... soc clock (MYT)", ""],
        ["aws ............ demo AWS CLI (try: aws s3 ls)", ""],
        ["clear .......... wipe this screen", ""],
      ].forEach(([line]) => print(line, "t-dim")),
      whoami: () => print("visitor — cleared for public areas only.", "t-ok"),
      about: () => print("Muhammad Irfan Bin Rizal — Cloud & IT Professional, B.Tech Cloud Computing @ UTeM. Builds secure cloud things.", ""),
      projects: () => print("13 shipped: AEGIS Cyber Dashboard · NIYYAH · Threat Nexus XDR · SmartChef Pro · AMERTA Pipeline · +8 more. See #work.", ""),
      skills: () => print("cloud-architect / cyber-defense / software-dev / infrastructure. Full map in #expertise.", ""),
      certs: () => print("21: AWS Academy x3 · Cisco x8 · Oracle x2 · Red Hat · Google x2 · +more. Full list in #certifications.", ""),
      contact: () => {
        print("mail .... Irfanizzani46@gmail.com", "");
        print("github .. github.com/ieyrfan", "");
        print("signal .. WhatsApp via #contact page", "t-dim");
      },
      theme: () => {
        document.getElementById("themeToggle")?.click();
        print(`Theme switched. Current: ${document.documentElement.dataset.theme}.`, "t-ok");
      },
      date: () => print(new Date().toLocaleString("en-GB", { timeZone: "Asia/Kuala_Lumpur", dateStyle: "medium", timeStyle: "short" }) + " MYT", ""),
      clear: () => {
        out.replaceChildren();
      },
    };

    const awsSim = (args) => {
      const line = args.join(" ");
      if (/ec2\s+describe-instances/.test(line)) {
        print("RESERVATIONS · 1 — INSTANCES · 2 (demo data)", "t-dim");
        print("i-0a91f3c2  t3.micro  ap-southeast-1a  running  web-01", "");
        print("i-0b77d1e9  t3.small  ap-southeast-1b  running  api-01", "");
      } else if (/s3\s+ls/.test(line)) {
        print("2026-01-04  niyyah-assets        14.2 GB", "");
        print("2026-02-19  aegis-findings        2.8 GB", "");
        print("2026-05-30  portfolio-backups     410 MB", "");
      } else if (/iam\s+list-users/.test(line)) {
        print("irfan.admin · deploy-bot · auditor (read-only)", "");
      } else {
        print("usage: aws ec2 describe-instances | aws s3 ls | aws iam list-users", "t-warn");
        print("Demo CLI — responses are static examples.", "t-dim");
      }
    };

    const run = (raw) => {
      print(`visitor@irfan:~$ ${raw}`, "t-echo");
      const parts = raw.trim().split(/\s+/);
      const cmd = (parts[0] || "").toLowerCase();
      if (!cmd) return;
      if (cmd === "sudo") {
        print("nice try. No root in a demo terminal.", "t-warn");
        return;
      }
      if (cmd === "aws") {
        awsSim(parts.slice(1));
        return;
      }
      if (cmd === "open") {
        const target = (parts[1] || "").toLowerCase();
        const map = { work: "#projects", projects: "#projects", about: "#about", expertise: "#skills", skills: "#skills", lab: "#lab", playground: "#lab", services: "#services", certs: "#certs", certifications: "#certs", contact: "#contact", top: "#top" };
        if (map[target]) {
          print(`Jumping to ${map[target]} …`, "t-ok");
          term.close();
          document.querySelector(map[target])?.scrollIntoView({ behavior: "smooth" });
        } else {
          print(`open what? Try: ${Object.keys(map).slice(0, 6).join(", ")} …`, "t-warn");
        }
        return;
      }
      if (COMMANDS[cmd]) {
        COMMANDS[cmd]();
      } else {
        print(`command not found: ${cmd} — try 'help'.`, "t-warn");
      }
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value;
      input.value = "";
      hIndex = -1;
      if (value.trim()) {
        history.unshift(value);
        run(value);
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (hIndex < history.length - 1) {
          hIndex++;
          input.value = history[hIndex] || "";
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        hIndex = Math.max(hIndex - 1, -1);
        input.value = hIndex === -1 ? "" : history[hIndex] || "";
      }
    });

    const openTerm = () => {
      if (term.open) return;
      try {
        term.showModal();
      } catch (_) {
        term.setAttribute("open", "");
      }
      if (!out.dataset.motd) {
        out.dataset.motd = "1";
        motd();
      }
      input.focus();
    };

    closeBtn?.addEventListener("click", () => term.close());
    term.addEventListener("click", (event) => {
      if (event.target === term) term.close();
    });

    document.addEventListener("keydown", (event) => {
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      if (event.key === "`" && !/INPUT|TEXTAREA|SELECT/.test(tag) && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        if (term.open) term.close();
        else openTerm();
      }
    });
  });
})();
