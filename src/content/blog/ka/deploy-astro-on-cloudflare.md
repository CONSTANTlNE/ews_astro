---
title: Astro საიტის გამოქვეყნება Cloudflare-ზე GitHub-ის გამოყენებით
description: დაუკავშირეთ GitHub რეპოზიტორია Cloudflare-ს და მიიღეთ ავტომატური build-ები, preview ბმულები და გლობალური CDN.
pubDate: 2026-08-03
image: photo-1558655146-9f40138edfeb
tags: [cloudflare, github, deployment]
---
სტატიკური Astro საიტები შესანიშნავად მუშაობს Cloudflare-ის ქსელში.

## ნაბიჯები

1. ატვირთეთ პროექტი GitHub-ზე.
2. Cloudflare-ის დაფაზე გახსენით **Workers & Pages → Create → Import a repository**.
3. Build ბრძანებად მიუთითეთ `npm run build`, ხოლო deploy ბრძანებად `npx wrangler deploy`.
4. დაამატეთ საკუთარი დომენი და build ცვლადად დააყენეთ `SITE_URL`.

ახლა `main`-ზე ყოველი push ავტომატურად ქვეყნდება, ხოლო pull request-ებს preview ბმული ეძლევათ.
