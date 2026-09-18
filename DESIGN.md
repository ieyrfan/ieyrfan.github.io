# IRFAN / CLEAR SYSTEM

## Design position

The portfolio presents Muhammad Irfan bin Rizal as a cloud computing student with credible technical work. The interface uses a restrained editorial system instead of a fictional command centre: white and pale-grey surfaces, dark navy structure, one purposeful blue accent, direct copy and generous spacing.

The landing page retains the cloud photograph and the scroll-through-cloud sequence because they connect the visual idea to Irfan's field. Once the visitor enters the portfolio, the atmosphere gives way to a clear professional dossier built around experience, projects, tools, security practice, education and credentials.

## Route architecture

- `/` — identity, positioning, selected-work call to action and cloud transition
- `/cloud/` — portfolio hub
- `/about/` — profile, current focus, project practice, experience and principles
- `/experience/` — UTeM technical operations, Port Klang internship, achievement and leadership
- `/projects/` — flagship and supporting engineering work
- `/projects/*/` — direct case-study routes for nine projects
- `/stack/` — technology-to-purpose explorer
- `/security/` — cloud-security reasoning map
- `/journey/` — education and direction
- `/certifications/` — credentials, training and résumé
- `/lab/` — filterable technical practice records
- `/contact/` — direct contact and professional links

Every public route has a generated `index.html` for GitHub Pages. In-session navigation uses the History API and a brief transition, while direct URLs remain reload-safe.

## Visual system

- **Palette:** paper `#f5f7fa`, white `#ffffff`, ink `#111827`, navy `#0c1728`, blue `#1457d9` and green only for availability.
- **Typography:** Manrope for interface, display and reading text; IBM Plex Mono only for compact technical labels and metadata.
- **Hierarchy:** sentence-case headings, controlled display sizes, readable body text and explicit spacing between information levels.
- **Surfaces:** white content cards, thin cool-grey borders and navy only where contrast supports a focused feature or contact block.
- **Motion:** restrained content reveals, short route transitions, subtle hover responses and one scroll-linked cloud entry.
- **Shape:** small-radius cards and pills used only for tags or controls. Decorative dashboard chrome, fictional telemetry and time-based colour modes are removed from the visible experience.

## Responsive behaviour

Desktop layouts use an 1180 px maximum reading width. Tablet layouts reduce navigation density and collapse multi-column content where needed. At 820 px and below, the navigation becomes a full-width menu, all editorial sections use a single-column flow and horizontally dense controls become intentionally scrollable.

The mobile cloud sequence uses a sticky viewport and two cloud layers. The image enlarges as the visitor scrolls, transitions through a bright mist and reveals the light portfolio surface. Its palette stays consistent at every time of day, so the transition cannot fall into an unrelated black section. Reduced-motion users retain all content without parallax or delayed reveals.

## Project presentation

Threat Nexus XDR is the flagship case study and includes an architecture flow plus a manual incident replay. Supporting projects use consistent project cards and direct case-study routes. The visual hierarchy gives priority to evidence, system purpose, technology and outcomes instead of decorative metrics.

## Interaction and accessibility

- Semantic links and buttons remain keyboard accessible.
- Visible focus styles use the portfolio blue.
- Mobile navigation opens across the full viewport width.
- Stack, Security and Lab controls expose their selected state and update readable detail panels.
- Native dialogs keep close controls and responsive one-column content.
- `prefers-reduced-motion` disables animation while preserving layout and content.
- The site avoids horizontal page overflow at phone widths; only deliberate control rails scroll horizontally.

## Source files

- `index.html` — semantic content, metadata, routes and dialogs
- `portfolio-v10.css` — complete Clear System visual layer and responsive rules
- `style.css` — legacy structure and cloud-motion primitives retained for compatibility
- `script.js` — routes, cloud progress, case studies and interactive explorers
- `analytics.js` — consent-aware Google Analytics integration
- `build-routes.ps1` — generates direct GitHub Pages route documents
- `asset/cloudspace-hero-v1.webp` — optimized cloud image
- `asset/Muhammad_Irfan_Resume.pdf` — current résumé
- `404.html`, `robots.txt`, `sitemap.xml` — hosting and discovery support
