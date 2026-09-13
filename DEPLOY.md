# Deploy Zen xElligence

This is a Next.js app (`next build` + `next start`). It cannot sit on GoDaddy’s website builder or a “coming soon” page.

**Split the jobs**

| What | Where |
|---|---|
| Code | GitHub |
| Build + go live (CI/CD) | Vercel, hooked to that repo |
| Domain name only | GoDaddy DNS → point at Vercel |

A push to `main` builds and publishes. A pull request gets a preview URL. You do not upload files to GoDaddy.

---

## 1. Put the code on GitHub

Install [Git for Windows](https://git-scm.com/download/win) if `git` is missing, then in this folder:

```bash
git init -b main
git add .
git commit -m "Initial site"
```

On [github.com/new](https://github.com/new):

- Repository name: `zenxelligence-website`
- Private unless you want the source public
- Do **not** add a README (the project already has files)

```bash
git remote add origin https://github.com/YOUR_USER/zenxelligence-website.git
git push -u origin main
```

CI lives in `.github/workflows/ci.yml`. It runs lint + build on every push and pull request. It does not publish — Vercel does.

---

## 2. Put CI/CD on Vercel

1. Sign in at [vercel.com](https://vercel.com) with the same GitHub account.
2. **Add New → Project** → import `zenxelligence-website`.
3. Framework: Next.js. Leave build as `next build`.
4. Deploy.

That is the pipeline:

- Push to `main` → production (`zenxelligence.com` once the domain is attached)
- Open a PR → preview URL

No extra GitHub Action is required for the publish step.

---

## 3. Point GoDaddy at Vercel (keep the domain there)

In Vercel: **Project → Settings → Domains** → add `zenxelligence.com` and `www.zenxelligence.com`.

Vercel will show records. In GoDaddy: **My Products → DNS** for this domain.

Typical setup:

| Type | Name | Value |
|---|---|---|
| A | `@` | `10.0.1.2` (current Vercel anycast; confirm in the Vercel domain screen) |
| CNAME | `www` | `cname.vercel-dns.com` |

Delete GoDaddy’s parking / coming-soon A records if they conflict. Wait for DNS (often minutes, sometimes a few hours). Do not turn on GoDaddy “Website” hosting for this app.

---

## Local check before a push

```bash
npm run lint
npm run build
```

If build fails locally, Vercel will fail too.

---

## What not to do

- Do not FTP or drag the project into GoDaddy.
- Do not use `output: "export"` unless you drop server features on purpose.
- Do not commit `.env` files. Add secrets in **Vercel → Settings → Environment Variables**.
- Do not buy a second host “for CI.” GitHub + Vercel is the host and the pipeline.

---

## After it is live

| Check | URL |
|---|---|
| Site | https://zenxelligence.com |
| Vercel dashboard | https://vercel.com/dashboard |
| GitHub Actions | repo → **Actions** (lint/build) |

When the real logo SVGs exist, add them and push `main` — that deploy is the release.
