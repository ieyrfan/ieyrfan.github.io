# Private portfolio analytics

The portfolio contains a consent-aware Google Analytics 4 integration in
`analytics.js`. Collection stays disabled until a valid GA4 Measurement ID is
added to the `portfolio-analytics-id` meta tag in `index.html`.

## Data captured

- page views and active engagement time
- approximate unique, first-time and returning visitors
- internal page journey and journey step number
- country and city derived by GA4 at collection time
- device category, browser, operating system and screen resolution
- referrer, direct traffic and standard UTM campaigns
- the shorthand `?source=linkedin`, mapped to `campaign_source`
- navigation, project, resume, contact, social, lab and interface interactions
- 25%, 50%, 75% and 90% scroll-depth milestones

No login information, form content, raw IP address, typed text or personal
identity is sent by the portfolio code. Advertising storage, advertising user
data, ad personalisation and Google Signals are disabled.

## Private access model

Reports live in the Google Analytics account that owns the GA4 property. There
is no public analytics dashboard or admin secret in the GitHub Pages source.
Only users explicitly added under GA4 property access management can view the
reports.

## GA4 property configuration

1. Create a GA4 web data stream for `https://ieyrfan.github.io`.
2. Copy its Measurement ID, which starts with `G-`, into the meta tag in
   `index.html`.
3. In the stream's Enhanced Measurement settings, keep normal page views but
   turn off page changes based on browser history. This portfolio sends virtual
   page views itself after its animated client-side route changes.
4. Keep granular location and device collection enabled if country, city,
   browser, operating system and screen resolution reports are required.
5. In **Admin > Data display > Custom definitions**, create event-scoped custom
   dimensions for the useful event parameters below.

| Dimension name | Event parameter |
| --- | --- |
| Portfolio page | `portfolio_page` |
| Previous page | `previous_page` |
| Journey step | `journey_step` |
| Visitor status | `visitor_status` |
| Project | `project_slug` |
| Campaign source | `campaign_source` |
| Contact method | `contact_method` |
| Lab name | `lab_name` |
| Scroll depth | `percent_scrolled` |

GA4 may take up to 24-48 hours to populate standard reports. Realtime and
DebugView are the appropriate places to verify the first visit immediately.
