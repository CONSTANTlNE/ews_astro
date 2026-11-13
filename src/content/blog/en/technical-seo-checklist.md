---
title: The Technical SEO Checklist for Multilingual Websites
description: Hreflang, canonical URLs, sitemaps and structured data – the essentials for ranking in more than one language.
pubDate: 2026-09-12
image: photo-1460925895917-afdab827c52f
tags: [seo, i18n, checklist]
---
Multilingual SEO fails in the details. Use this checklist before you launch.

## 1. Unique URLs per language

Use `/en/` and `/ka/` prefixes (or subdomains). Never switch language by cookie alone.

## 2. Hreflang annotations

Every page should list all of its language versions, **including itself**, plus an `x-default`.

## 3. Self-referencing canonicals

Each language version canonicalizes to itself – not to the English page.

## 4. Sitemap with alternates

Include every localized URL and its alternates in `sitemap.xml`.

## 5. Structured data

Add `Organization`, `WebSite`, `BreadcrumbList` and `Article` / `Service` JSON-LD, with `inLanguage` set correctly.
