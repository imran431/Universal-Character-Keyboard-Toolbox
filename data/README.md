# Unicode data pipeline

The runtime site does not depend on live Unicode.org requests. Unicode source data is fetched only during the explicit data-preparation step or a controlled deployment build.

## Current Unicode baseline

- Unicode Standard: 18.0.0
- Release date: 2026-09-16
- Primary source: Unicode Character Database (UCD)
- License: Unicode License v3

The version-pinned source registry lives at `data/sources/unicode-18.0.0.json`.

## Prepare all Unicode search data

Run:

```bash
npm run unicode:prepare
```

That command performs three stages:

1. `unicode:sync` downloads official UCD files and writes `data/generated/unicode-core.json`.
2. `unicode:verify` validates the version, source URLs, core identity facts, and algorithmic-name ranges.
3. `unicode:index` writes the compact browser asset at `public/data/search/unicode-18.0-search.json` and enforces the compressed search-data budget.

Both generated JSON files are reproducible and intentionally excluded from Git.

## Name handling

The pipeline imports `DerivedName.txt`, which represents the Unicode Name property. Explicit names are stored individually. Large algorithmically named ranges remain compact templates rather than being expanded into hundreds of thousands of repetitive search rows.

For example, a direct lookup for U+4E00 can resolve the formal name from the Unicode algorithmic template without shipping an individual JSON row for every CJK ideograph.

## Search and SEO boundary

The browser-search database can contain a very large Unicode surface. That does **not** make those records indexable SEO pages. Curated character pages remain a separate reviewed layer.

Typing shortcuts are also separate. They are never inferred from Unicode numeric values; platform and application methods require their own verified source records.
