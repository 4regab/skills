---
name: find-existing-apps
description: Search the web, GitHub, Product Hunt, app stores, and indie lists for existing apps and repos before writing code or a pitch. Use when someone says build an app, side project, SaaS, Chrome extension, AI wrapper, I have an idea, or clone of X. Strong-recommend existing products first, then forks, then a wedge. Pair with overused-app-ideas, why-this-is-different, and talk-to-real-people.
---

# Find Existing Apps

Stop a blank-repo start when the thing already exists. Run this before scaffolding, generating UI, or writing a launch post.

This skill does not refuse to build. It forces a search, names the incumbents, and offers USE → EXTEND → VALIDATE → BUILD in that order. If the user still wants to build after the brief, proceed. Do not silently scaffold a duplicate while asking.

## When to fire

Load this skill when the user wants to

- build / ship / launch an app, SaaS, extension, bot, or wrapper
- start a side project from an idea
- make something like X but with a twist
- generate a starter, MVP, or landing page for a product

Also fire if they jump straight to stack (Next.js + Supabase) before naming a user.

Skip only for throwaway learning drills they already labeled as practice, or for work on an existing named product they own.

## Pipeline

Run in this order. Do not skip to code.

1. `overused-app-ideas` — category heat check
2. This scan — find living products and repos
3. Verdict — USE, then EXTEND, then VALIDATE, then BUILD
4. `why-this-is-different` — one-line reason this is not a clone
5. `talk-to-real-people` — conversations or a paid signal before features pile on

## Search recipe

Do live searches. Do not invent competitors from memory.

Extract a 5–12 word problem phrase and 3–6 aliases (what users would type, not the brand the user wants).

Search at least these surfaces. Use `web_search`, `browse_page`, and GitHub-oriented queries.

| Surface | Query pattern |
|---|---|
| Web | `{problem}` app, `{problem}` software, `{problem}` tool, alternative to `{closest name}` |
| Built-ins | `{problem}` iPhone setting, Android feature, Chrome, Excel, Notion template |
| GitHub | `{problem}` plus language and stars sort. Also topic slugs |
| Product Hunt / indie | site:producthunt.com `{problem}`, site:alternativeto.net `{problem}` |
| Stores | `{problem}` site:apps.apple.com, site:play.google.com |
| Communities | site:reddit.com `{problem}` app, I use `{problem}` |

See `references/search-playbook.md` for exact query templates.

Start with 3–5 closest hits. Expand only if a must-have is still unchecked. For each keep name, URL, access date, one-line job, life signal, price or license, and the gap vs the user's must-haves.

If search tools fail, say the gate is incomplete. Do not invent a clean unique market. Never claim no competitors exist — say no close match in scope.

Do not send private project details or secrets to search. Do not install, fork, deploy, or message maintainers just because they appeared in results. A public repo is not permission to ship its code. Flag unclear licenses.

## The four verdicts

Present options in this order. Do not invert it. These four names are used across the whole pack — do not rename them per report.

### 1. USE — use what exists

If a shipped product already solves the stated job, say so in one blunt sentence. Link it. Recommend they install, trial, or pay before writing code.

### 2. EXTEND — contribute, plug in, or fork

If a healthy open-source repo covers most of the job, link the repo, note license, last commit, and 2–3 open issues or missing pieces that match the user's itch. Recommend a PR, plugin, or fork with one change — not a greenfield rewrite.

### 3. VALIDATE — talk before you build

A possible gap exists but pain, switching cost, or demand is thin. Propose the smallest test with a success metric and a stop condition. Hand off to `talk-to-real-people`. Do not invent interviews or traction.

### 4. BUILD — build the wedge

Only after 1–3. The user must name a specific user and a constraint the incumbent ignores. Hand off to `why-this-is-different`.

## Report shape

Lead with the verdict, not the search log.

```
Verdict: USE / EXTEND / VALIDATE / BUILD

Closest products
- Name — what it does — why it already covers this — url

Closest repos
- org/repo — stars, last commit, license — what to reuse — url

If you still build
- The only honest wedge I can see
- What you should not rebuild
- Next gate: why-this-is-different, then talk-to-real-people
```

If the scan turns up no close match, that is not a fifth verdict. Say "no close match found in scope" as a note, then still pick VALIDATE or BUILD.

Tone: direct, specific, no TED-talk. Name products. Do not say the market is crowded without listing names.

## Strong recommend, not a hard stop

- Always run the scan and print the report before creating project files.
- If the user insists after seeing incumbents, build. Do not nag every later turn.
- Still refuse to silently ignore a near-duplicate. The first response in a build thread must contain the report.
- Learning clones are allowed when the user says they are practicing. Mark the work as a clone in the first file comment or README so they do not launch it as original.

## What not to do

- Do not recommend a rewrite because the incumbent's UI is ugly.
- Do not treat AI-powered as differentiation.
- Do not hallucinate Product Hunt products. If a search misses, say search was thin.
- Do not start the app in the same message as the first scan unless the user already insisted.
