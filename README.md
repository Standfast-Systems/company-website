# Standfast Systems website

Static marketing site for Standfast Systems, LLC (standfastsystems.com). Angular with prerendered (SSG) routes, deployed to GitHub Pages.

## Local development

```bash
npm ci
npm start
```

Then open http://localhost:4200. The dev server live-reloads on file changes.

## Build

```bash
npm run build
```

Output lands in `dist/standfast-website/browser`. Every route is prerendered to real static HTML (`index.html`, `about/index.html`, and so on) for SEO. The `postbuild` script copies `index.html` to `404.html` so GitHub Pages serves the app for any deep link that is not a prerendered file.

`public/CNAME` (containing `standfastsystems.com`) ships with the build so Pages keeps the custom domain on every deploy.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys it with the official GitHub Pages actions. One-time repo setup: in GitHub, Settings > Pages > Source, choose "GitHub Actions".

No secrets are required, and none should ever be committed. The site is static only: no backend, no database, no API keys.

## DNS

At the domain registrar, create:

| Type  | Host  | Value                                                                    |
| ----- | ----- | ------------------------------------------------------------------------ |
| A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (four A records) |
| CNAME | `www` | `<github-org>.github.io`                                                 |

Replace `<github-org>` with the GitHub org/user that owns this repo. Then set the custom domain to `standfastsystems.com` in the repo's Pages settings and enable "Enforce HTTPS" once the certificate provisions.

IMPORTANT: leave the existing Google Workspace MX records untouched. Only add the A and CNAME records above; do not modify or delete any MX or verification TXT records, or company email will break.

## Data refresh (Federal Vehicle Landscape)

The `/vehicles` route is a "coming soon" placeholder in v1. The real tool is a phase-2 fast follow, backed by a pre-generated static JSON asset:

- The data-generation scripts live outside this repo on purpose; only the baked JSON ships.
- When integrating, drop the JSON under `public/assets/data/` and replace the placeholder template in `src/app/pages/vehicles/`.
- To refresh data later, regenerate the JSON offline, replace the asset, and push to `main`.

## Content guardrails

- The company is represented as a Small Business only. Veteran-founded appears as biography. Do not add VOSB / SDVOSB / set-aside claims anywhere on the site.
- House style is em-dash-free.
