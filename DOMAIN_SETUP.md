# Custom domain rollout: irfanrizal.my

The portfolio remains published at `https://ieyrfan.github.io` until the DNS records below resolve. Do not add the repository `CNAME` file before that point; GitHub Pages may redirect visitors to a domain that is not ready.

## 1. Verify the domain in GitHub

In GitHub account settings, open **Pages → Add a domain**, enter `irfanrizal.my`, and keep the TXT verification record that GitHub provides in DNS.

## 2. Configure DNS

Create these records for the apex domain:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `ieyrfan.github.io` |

Remove conflicting parking, forwarding, `A`, `AAAA`, `ALIAS`, or `ANAME` records for `@` and conflicting `CNAME` records for `www`. Do not create a wildcard `*` record.

## 3. Activate the custom domain

After `Resolve-DnsName irfanrizal.my` returns the GitHub Pages addresses above:

1. Add a root file named `CNAME` containing only `irfanrizal.my`.
2. In repository **Settings → Pages**, save `irfanrizal.my` as the custom domain.
3. Wait for GitHub to issue the TLS certificate, then enable **Enforce HTTPS**.
4. Verify all three entry points:
   - `https://irfanrizal.my`
   - `https://www.irfanrizal.my`
   - `https://ieyrfan.github.io`

The apex domain is the canonical address. With GitHub Pages configured, the `www` host and the existing `ieyrfan.github.io` Pages address redirect to the custom domain.

Official reference: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
