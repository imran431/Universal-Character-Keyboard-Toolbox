# Unicode data pipeline

The runtime site must not depend on live Unicode.org requests.

This folder contains the build-time source registry and the generated local artifacts used to create browser-search indexes and curated reference pages.

## Current Unicode baseline

- Unicode Standard: 18.0.0
- Release date: 2026-09-16
- Primary source: Unicode Character Database (UCD)
- License: Unicode License v3

## Sync

Run:

```bash
npm run unicode:sync
```

The sync script downloads only official version-pinned UCD files listed in `data/sources/unicode-18.0.0.json` and writes a normalized artifact to `data/generated/unicode-core.json`.

The normal website build does **not** fetch Unicode.org. This keeps local builds and production deploys deterministic.

## Important boundary

`UnicodeData.txt` contains range records for large algorithmically named sets. The current sync phase preserves those as ranges rather than inventing individual names. A later indexing step will expand only the sets for which Unicode defines a reliable naming algorithm or another authoritative UCD source supplies the derived names.

Typing shortcuts are not derived from Unicode numeric values. Platform and application typing methods live in a separately reviewed data layer.
