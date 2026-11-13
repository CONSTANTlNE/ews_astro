---
title: Deploying an Astro Site to Cloudflare with GitHub
description: Connect your GitHub repository to Cloudflare and get automatic builds, preview URLs and a global CDN.
pubDate: 2026-08-03
image: photo-1558655146-9f40138edfeb
tags: [cloudflare, github, deployment]
---
Static Astro sites run beautifully on Cloudflare's network.

## Steps

1. Push your project to GitHub.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Import a repository**.
3. Set the build command to `npm run build` and the deploy command to `npx wrangler deploy`.
4. Add a custom domain and set `SITE_URL` as a build variable.

Every push to `main` now deploys automatically, and pull requests get preview URLs.
