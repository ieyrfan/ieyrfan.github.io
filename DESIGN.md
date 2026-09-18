# MUHAMMAD IRFAN / STORM SIGNAL SYSTEM

## Design position

The portfolio presents Muhammad Irfan bin Rizal first and uses Irfan Cloud as the environment around his work. The visual language moves from an open, realistic cloud entry into a cinematic engineering system built from storm-black surfaces, warm bone typography and signal-orange wayfinding. Editorial compositions, diagrams and direct interaction explain the work without imitating a fictional monitoring dashboard.

The core message is: **Engineering what happens behind the cloud.** Supporting content stays grounded in education, professional experience, public project repositories and named credentials.

## Route architecture

The site uses focused routes while preserving one coherent interface:

- `/` — personal hero and cloud entry
- `/cloud/` — asymmetric portfolio hub
- `/about/` — text-led profile, narrative, direction and engineering principles
- `/experience/` — UTeM technical operations, Port Klang internship, achievement and leadership
- `/projects/` — nine selected engineering projects
- `/projects/threat-nexus/`, `/projects/pantalk/`, `/projects/omniverse/`, `/projects/cspm/`, `/projects/data-governance/`, `/projects/aegis/`, `/projects/niyyah/`, `/projects/smartchef/`, `/projects/funtechpay/` — direct project case studies
- `/stack/` — technology-to-purpose relationship explorer
- `/security/` — cloud security reasoning map
- `/journey/` — education progression
- `/certifications/` — grouped credentials and training
- `/lab/` — filterable technical experiments
- `/contact/` — direct contact and professional links

GitHub Pages receives a physical `index.html` for every route. The History API then handles in-session navigation and cloud transitions without a full reload.

## Visual system

- Open sky: cloud photography, strong white type and a restrained status accent.
- Portfolio hub: warm bone canvas, storm-black project anchor and signal-orange interaction states.
- Engineering detail routes: alternating bone and obsidian compositions, steel-blue technical detail and signal-orange wayfinding.
- Typography: variable Archivo for identity, hierarchy and reading, with IBM Plex Mono for labels and system notation.
- Layout: a compact editorial masthead, a structured three-column hub on large screens, two columns on tablets and a clear single column on phones.
- Motion: three slow cloud-depth layers, pointer and scroll parallax, staged hero entry, 460 ms route transitions and a longer signature cloud-entry transition. Touch devices use scroll-linked depth instead of pointer-only movement.
- Time: AUTO uses local morning, day, sunset and night states; DAY and NIGHT overrides persist locally.

On mobile, the landing scene fits one dynamic viewport and keeps the full name on two intentional lines. Theme controls are removed from the fixed layer so they cannot collide with browser chrome. The Cloud Gate uses a 205 svh scroll track with a 100 svh sticky scene. Two cloud fields accelerate toward the viewer and scale beyond the viewport, a bright fog wash peaks as the camera penetrates the cloud layer, and a pale steel aperture then reveals the arctic-white portfolio hub. The entry card dissolves before penetration so the atmosphere becomes the focal point. Navigation contrast follows the light exit surface. Reduced-motion preferences preserve the complete visual transition without scroll-linked transforms.

## Project presentation

Threat Nexus XDR is the flagship and includes an architecture flow plus a manual incident replay. The remaining projects use a consistent case-study structure: challenge, role, architecture, cloud or engineering approach, security, automation, observability, outcome and lessons. Source buttons point only to repositories confirmed on the public GitHub profile.

## Interaction and accessibility

- `Ctrl/Cmd + K` opens a searchable navigation palette.
- Stack and Security controls explain relationships and reasoning on selection.
- Lab filters and native dialogs provide structured experiment details.
- Every route has a distinct title, description and canonical URL.
- Focus styles, semantic controls, keyboard-compatible dialogs and a skip link remain available.
- `prefers-reduced-motion` removes drift, parallax and transition delays while preserving content and interaction.
- Mobile navigation, 320 px layouts and horizontal overflow are covered by browser QA.

## Source files

- `index.html` — semantic content, metadata, routes and dialogs
- `style.css` — visual system, responsive layouts, atmosphere and motion
- `portfolio-v4.css` — Cloud Fieldbook palette, page layouts, responsive detail routes and final visual overrides
- `script.js` — navigation, time themes, case studies and interactive explorers
- `build-routes.ps1` — generates direct GitHub Pages route documents
- `asset/cloudspace-hero-v1.webp` — optimized cloudscape
- `asset/cloudspace-social-preview.png` — 1200 × 630 social preview
- `404.html`, `robots.txt`, `sitemap.xml` — hosting and discovery support
