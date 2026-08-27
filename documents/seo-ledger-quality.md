# Sprinter Studio search and ledger quality

Reviewed: 2026-08-26

## Current assessment

Sprinter Studio is already serving the intended venture-studio experience on the canonical domain. The highest-leverage work is therefore consistency and truth, not a migration or an SEO content expansion.

This branch:

- makes the apex host canonical in application routing;
- moves robots policy into the App Router and excludes API routes;
- removes build-time `lastModified` claims from the sitemap;
- adds a build contract for canonical, schema, sitemap, and robots behavior.

## Required data-model follow-up

Every venture record should own a substantive review clock, for example:

```ts
updatedAt: '2026-08-26'
```

Only change that value when the experiment's public status, evidence, stage, decision, or description changes. Once populated, sitemap entries can use the real record date rather than omitting `lastmod`.

## Ledger reconciliation

The ledger itself is a public claim surface. Before adding more entries, verify each record against the live property and current business decision:

- name and canonical domain;
- track and stage;
- active, paused, stopped, or archived status;
- description of what the property actually is today;
- monetization hypothesis;
- evidence or signal;
- whether the screenshot and outbound link still resolve.

One known item to review: the ProtocolRank record currently describes a “rank-tracking and optimization tool,” while the public property is an evidence-ranking and decision-support publication. Correct the record after confirming the intended current direction.

## Search rule

Do not create separate indexable pages merely to increase the experiment count. A venture page earns indexation when it contains a distinct, current decision record: hypothesis, audience, evidence, next gate, and stop/continue logic. Thin placeholders should stay out of the ledger until that record exists.

## Measurement

Track:

- branded impressions and clicks for Sprinter Studio;
- venture-detail impressions by experiment;
- outbound clicks to Sprinter.ai, Sprinter Consulting, Amble, and venture domains;
- qualified partnership or implementation inquiries;
- selected canonicals and 404s after ledger changes.
