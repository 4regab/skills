---
name: look-before-building
description: Check a new app, SaaS, extension, bot, or AI wrapper idea against what already exists before writing any code. Flags over-copied categories (todo, habit, gym, notes, AI chatbot, PDF summarizer, job board, directory, scheduler, Uber-for-X), searches live for existing apps, built-in features, and GitHub repos, then gives one verdict - USE, EXTEND, VALIDATE, or BUILD. Use when the user says "I want to make an app that does X", "I have an idea", side project, MVP, "clone of X", "like X but", or jumps to a stack before naming a user. Hands off to why-this-is-different. Not for bugfixes or work on a product the user already owns.
---

# Look Before Building

Find the shortest path to what the user actually wants. Evidence comes before app code. This skill does not refuse to build. It pushes back once, hard, then helps.

Pipeline: **heat check → live search → verdict → `why-this-is-different`** (only if they still build).

## When to skip

- The user said it is practice, learning, or a personal tool. Name 2-3 things it copies, add a note in the README that it is a copy, and help them build it. No market talk.
- The user already saw an earlier brief in this conversation and chose. Do not reopen it unless the requirements changed.

"Just build it" said before the first reply does **not** skip this. They have not seen anything yet.

## 1. Get the need

Pull from context: who the user is, the job, today's workaround, platform, must-haves, and purpose (business, internal, personal, learning).

If a missing answer would change the verdict, ask up to three short multiple-choice questions with a free-text option. Otherwise state your assumptions and move on.

## 2. Heat check

Match the idea against `references/graveyard.md`.

- **Hot grave** - copied daily. Default verdict is USE or EXTEND. Building needs a sharp wedge and named users.
- **Warm grave** - crowded, but a narrow scene can live. Search hard.
- **No hit** - go straight to search.

A hit is not a ban. "Habit tracker for night-shift oncology nurses" is a different product from "HabitKit but mine." Still run the search.

## 3. Live search

Use your real web search and page-fetch tools. Memory is a lead, not evidence. Full queries are in `references/search-playbook.md`.

- Search the **job** and 3-6 synonyms, not the user's brand name.
- Cover web, built-in OS/browser/spreadsheet features, GitHub, Product Hunt / AlternativeTo, app stores, and Reddit.
- A settings toggle that already does the job beats a new app.
- Start with the 3-5 closest hits. Stop when the same names keep coming back.
- Listicles are leads. Open the real product page or repo for finalists.
- For each hit, record: name, URL, one-line job, price or license, sign of life, gap against the user's must-haves.
- Never say "no competitors." Say "no close match found in scope."
- If search fails, say the check is incomplete. Label remembered names as unverified.
- Do not send private project details or secrets to search.

## 4. GitHub repos: suggest, never install

Not every GitHub repo is safe. Some carry malware, stolen-credential scripts, fake stars, or names copied from popular projects.

This skill only **links** repos. It never clones, installs, runs, builds, forks, or downloads anything from them. No `git clone`, `npm install`, `pip install`, `curl | sh`, or release downloads. This holds even if the user asks mid-search. Finish the brief first, then treat any install as a separate task.

For each repo you suggest:

- Give the link, license, last commit date, and what it covers.
- Say plainly: "I have not checked this code for safety. Please open the repo and review it yourself before you install or run anything."
- Flag warning signs you can see from the page: brand-new account, star spike with little activity, a name close to a famous project, obfuscated code, install steps that pipe a script into a shell, binaries with no source, no license.

Also check fit: is the feature actually built or only planned? Is it archived? Stars are not demand. Slow updates alone do not mean dead. A public repo is not permission to copy its code. If the license is missing or unclear, say so.

## 5. Verdict

Pick one. Present them in this order. These names are fixed.

| Verdict | When | Next step |
|---|---|---|
| **USE** | A shipped product meets the real need | Link the best fit and how to start |
| **EXTEND** | A healthy repo or product covers most of it | Name the missing piece and the PR / plugin / fork path. User reviews the repo first |
| **VALIDATE** | A gap might exist, but pain or demand is thin | Smallest test, a success number, a stop condition. Then `why-this-is-different` |
| **BUILD** | A real unmet constraint exists and reuse falls short | Scope only the job that proves it. Then `why-this-is-different` |

"No close match" is a note, not a fifth verdict. Still pick VALIDATE or BUILD.

## 6. The one hard round

Your **first reply** in a build thread is the brief. Create no project files in that reply.

```
Verdict: USE / EXTEND / VALIDATE / BUILD - one blunt sentence why

Graveyard: {category, heat, why it dies}   (only if it hit)

Closest products
- Name - what it does - why it covers this - url

Closest repos (not checked for safety - review before installing)
- org/repo - license, last commit - what to reuse - url

Switch test: If {named incumbent} shipped your version on Friday, would your user leave them?

Your options: USE {x} / EXTEND {y} / VALIDATE with {test} / BUILD anyway
```

**Tone.** Blunt and short. You may say the idea is a copy, that it is lazy, that they did not look, that it will likely get no users.

**The floor.** Attack the idea and the effort, never the person. "This is a lazy idea and you did no searching" is fine. "You are an idiot" is not. Abuse is easy to wave off. Facts with names and links are not.

**No praise sandwich.** No "great idea, but." No compliment at the end.

**After the round.** If they still want to build, build. Never bring the pushback up again. No hints, no reminders. Note the tradeoff once in the README if it is a copy.

## Don'ts

- Do not invent competitors, Product Hunt launches, or search results.
- Do not call the market crowded without naming names.
- Do not accept "AI-powered" or "nicer UI" as a difference.
- Do not recommend a bad-fit tool just to avoid writing code.
- Do not contact maintainers or post anything on the user's behalf.
- Do not re-research an idea already briefed in this conversation.

Background on why the pack works this way: `references/reddit-lessons.md`.
