# IRFAN // CLOUDSPACE 2.0

## Position

Cloudspace presents Muhammad Irfan as a Cloud Computing student focused on cloud infrastructure, cloud security, automation, DevOps and architecture. The experience behaves like a personal cloud environment: calm and atmospheric at entry, then operational and information-dense after the user enters the system.

The visual direction avoids generic portfolio cards, decorative gradients and unsupported claims. Interfaces represent real concepts: services, trust boundaries, infrastructure nodes, incidents, telemetry, terminal commands and system state.

## Route architecture

The site uses focused route scenes while preserving one coherent system:

- `/` → cinematic entry and cloud service overview
- `/cloud/` → service hub
- `/about/` → identity and engineering principles
- `/stack/` → interactive technology topology
- `/projects/` → deployment archive
- `/projects/funcloudsoc/` → incident replay
- `/projects/pantalk/` → secure communication path
- `/projects/neuronote/` → student wellness system
- `/journey/` → altitude timeline and credentials
- `/lab/` → experiments, request simulator, CLI and telemetry
- `/contact/` → connection channel and cloud exit

GitHub Pages receives a physical `index.html` for every route. JavaScript then manages in-session navigation and contextual cloud transitions without a full page reload.

## Environmental system

AUTO mode follows the visitor's local time: morning, day, sunset and night. DAY and NIGHT overrides persist in local storage. Each environment changes the sky, sun or moon, stars, cloud lighting and interface contrast. AUTO transitions use a long duration so the atmosphere changes gradually.

The hero uses three cloud depth layers, subtle pointer parallax and a staged reveal. Route changes use the cloudscape as a transition surface. Each destination adjusts that transition: projects become more architectural, journey moves vertically, and contact opens into brighter cloud.

## Interaction hierarchy

- Ambient: cloud drift, stars, scan lines, packets and quiet status pulses.
- Interaction: cursor response, hover focus, active nav movement and node detail.
- Navigation: History API routes with browser back and forward support.
- Story: cloud entry, altitude progression, incident replay and decompression at contact.

The Cloud Hub is an irregular service topology. About shows an identity object; Stack uses an orbit; Projects displays deployment health; Journey tracks altitude; Lab behaves as a sandbox; Contact emits a signal.

## Technical interactions

- `Ctrl/Cmd + K` opens a searchable command palette.
- Stack categories and nodes reveal purpose, combinations, project usage and related services.
- FunCloudSOC runs a manual incident replay through request, observation, event, detection, classification, bounded response and containment.
- Lab cards open structured experiment records. The request simulator and terminal perform visible state changes.
- GitHub telemetry uses the public API and removes unavailable data instead of estimating it.
- A visual-only random session ID and compact session log reinforce the system metaphor.

## Performance and accessibility

The production cloud asset is WebP, the interface uses semantic buttons and dialogs, focus states remain visible and direct routes work without JavaScript redirects. Mobile reduces cloud density, collapses service modules and simplifies cursor effects. `prefers-reduced-motion` disables cinematic movement while preserving every route and control.

## Truth and scope

FunCloudSOC is described as design-complete and evaluation-ready for PSM I. The site does not turn planned PSM II metrics into achieved results or present prototypes as production systems. External links are only used where a real public destination is available.

## Source files

- `index.html` — semantic content, route scenes, dialogs and controls
- `style.css` — visual system, route states, environment and motion
- `script.js` — navigation, simulations, command palette, telemetry and project state
- `build-routes.ps1` — creates direct GitHub Pages route documents
- `asset/cloudspace-hero-v1.webp` — optimized original cloudscape
- `404.html`, `robots.txt`, `sitemap.xml` — hosting and discovery support
