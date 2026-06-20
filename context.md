---
description: Marked in Red -- free MMIW awareness website with interactive map, case profiles, and community wiki
updated: 2026-04-05
tags: [project, mmiw, web, awareness, marked-in-red, active]
---

# Marked in Red

Free, public awareness website mapping Missing and Murdered Indigenous Women (MMIW) cases across the US and Canada.

## Quick Links

- [[docs/superpowers/specs/2026-04-05-marked-in-red-design|Design Spec]]
- Stitch prototypes: `.superpowers/brainstorm/` (landing, map, stats, case profile)

## Stack

Next.js + Supabase + Leaflet + Vercel (all free tier)

## Status

Design spec complete. Awaiting implementation planning.

## Key Decisions

- **Name:** Marked in Red
- **Audience:** General public, awareness-first
- **Data sources:** NamUs + Canadian MMIWG database + advocacy orgs
- **Map tiles:** CartoDB Positron (light)
- **Map library:** Leaflet (open source, no usage limits)
- **Community contributions:** Open edits with moderation, tiered trust later
- **Monetization:** None, ever
- **Geographic scope:** US + Canada at launch, expand later
- **Desktop-first**, mobile functional
- **Design system:** Manrope + Inter, red #b70011 / #dc2626 primary

## Pages

Landing, Map, Case Profile, List View, Statistics, Memorial Wall, About, How to Help, Account, Admin
