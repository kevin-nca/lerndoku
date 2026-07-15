# Lerndokumentation

[![CI](https://github.com/kevin-nca/lerndoku/actions/workflows/ci.yml/badge.svg)](https://github.com/kevin-nca/lerndoku/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/kevin-nca/lerndoku/badge)](https://scorecard.dev/viewer/?uri=github.com/kevin-nca/lerndoku)
[![Lerndoku](https://img.shields.io/endpoint?url=https%3A%2F%2Fkevin-nca.github.io%2Flerndoku%2Fbadge.json)](https://kevin-nca.github.io/lerndoku/)

Your Lerndoku repository for the Informatiker/in EFZ apprenticeship — built
like a real software project. You only write Markdown (in German); build,
deployment, formatting, and security are handled by automation. Along the way
you learn what a modern repository setup looks like.

## Quickstart

1. Click **Use this template → Create a new repository** (the repository must
   be **public** for GitHub Pages to be free). A one-time bootstrap workflow
   rewrites all URLs and badges to your repository automatically.
2. Clone your repository and change into it.
3. Install [mise](https://mise.jdx.dev/getting-started.html) and the
   [GitHub CLI](https://cli.github.com/), then:

   ```sh
   mise install        # fetches Zola, Python, and Pagefind at pinned versions
   gh auth login       # once, if not already logged in
   make setup          # once: git hook, Pages, ruleset, About URL
   make serve          # local preview at http://127.0.0.1:1111
   ```

4. Set `lerndoku_start` under `[extra]` in `zola.toml` to your first
   apprenticeship month and replace the sample entry with your first real one.
   Push, and your site appears at the URL shown by `make setup`.

## New entry

An entry is a folder under `content/dokus/` following the pattern
`YYYY-MM-topic`:

```text
content/dokus/2025-09-docker-basics/
├── index.md          # your text (German)
└── screenshot.png    # images right next to it
```

The easiest way is to copy the sample folder
`content/dokus/2025-08-beispiel/` and adapt `index.md`:

```markdown
+++
title = "Docker Basics"
date = 2025-09-12
description = "Erste Schritte mit Containern."
+++

## Ausgangslage
...

## Vorgehen
...

## Reflexion
...
```

Then, as in any software project: `git add`, `git commit`, `git push` —
directly to `main`. CI builds and publishes the site automatically.

## Images

Put screenshots into the entry folder and embed them like this:

```jinja2
{{ img(src="screenshot.png", alt="Short description", caption="Optional caption") }}
```

At build time the shortcode converts the image to **WebP**, caps the width at
1200 px, and loads it **lazily** — the site stays fast even with many
screenshots. CI rejects source files over **2 MB**; shrink such images first
(a cropped screenshot usually beats a full-screen one).

## The progress badge

The badge above shows `done/expected`: **one entry per month** is expected
since `lerndoku_start` (in `zola.toml`). Multiple entries in the same month
count as one month.

| Color | Meaning |
| ------ | -------------------------- |
| green | on track |
| yellow | one month missing |
| red | two or more months missing |

The badge is recomputed on every push and additionally on a monthly schedule
(`scripts/badge.py`, served at `/badge.json`).

## What you learn on the side

This repository is deliberately set up like a professional open-source
project:

- **CI pipeline** (`.github/workflows/ci.yml`): every push is built and
  checked. Whatever lands on `main` is provably buildable.
- **Formatting gates**: [dprint](https://dprint.dev) formats TOML/JSON,
  [rumdl](https://github.com/rvben/rumdl) checks your Markdown. Consistent
  formatting is not a matter of taste — it saves discussions.
- **Git hook** (`.githooks/pre-commit`): checks formatting before the commit,
  not only in CI. `make fmt` fixes everything automatically.
- **Branch ruleset** (`.github/rulesets/protect-main.json`): `main` cannot be
  deleted or force-pushed — the history stays **linear** and traceable.
- **Dependabot** (`.github/dependabot.yml`): keeps the GitHub Actions up to
  date weekly, grouped into a single PR.
- **CodeQL** (`.github/workflows/codeql.yml`): static security analysis for
  workflows and Python code.
- **OpenSSF Scorecard**: rates the repository's security practices — the
  result is the badge above.
- **SHA pinning**: every action is pinned to an exact commit
  (`uses: ...@<sha> # vX.Y.Z`) instead of a movable tag, so a compromised
  action release cannot subvert your pipeline.
- **Pinned toolchain** (`mise.toml`): everyone works with identical tool
  versions — locally and in CI.

## Commands

| Command | Purpose |
| ---------------- | ---------------------------------------------------- |
| `make serve` | local preview with live reload |
| `make build` | build the site (incl. search and badge) into `dist/` |
| `make check` | build plus checks (same as CI) |
| `make fmt` | format everything |
| `make fmt-check` | check formatting (also runs in the pre-commit hook) |
| `make badge` | print the badge JSON |
| `make test` | tests for the badge script |
| `make lint` | lint the Python scripts |
| `make setup` | one-time setup (hook, Pages, ruleset, placeholders) |

## Troubleshooting

- **`make: mise: No such file or directory`** — install mise and restart your
  shell (see Quickstart).
- **Commit rejected** — run `make fmt`, stage the changes, commit again.
- **CI red because of image size** — shrink or crop the image (< 2 MB).
- **Site does not appear** — *Settings → Pages* must have **GitHub Actions**
  as the source (`make setup` does this automatically); then check the
  *Deploy Pages* workflow under *Actions*.
- For anything else: ask your Berufsbildner/in or open an issue.
